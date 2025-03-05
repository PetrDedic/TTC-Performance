// components/admin/PromotionalBanners.jsx
import { useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient";

import {
  Table,
  Button,
  Modal,
  TextInput,
  Textarea,
  Group,
  ActionIcon,
  Text,
  Title,
  ScrollArea,
  Flex,
  Image,
  FileInput,
  Switch,
  Stack,
  Badge,
  Tooltip,
  Grid,
  AspectRatio,
  NumberInput,
  DateTimePicker,
} from "@mantine/core";
import {
  IconEdit,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
  IconDeviceMobile,
  IconDeviceDesktop,
  IconLink,
  IconCalendarTime,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import "dayjs/locale/cs";
import "@mantine/dates/styles.css";

const PromotionalBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  // State for Form Data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link_url: "",
    is_active: true,
    start_date: null,
    end_date: null,
    display_order: 0,
  });

  // State for Image Upload
  const [desktopImageFile, setDesktopImageFile] = useState(null);
  const [mobileImageFile, setMobileImageFile] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Preview states
  const [desktopPreview, setDesktopPreview] = useState(null);
  const [mobilePreview, setMobilePreview] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  // Fetch banners from the database
  const fetchBanners = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("promotional_banners")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      notifications.show({
        title: "Chyba",
        message: "Nepodařilo se načíst bannery.",
        color: "red",
      });
      console.error("Error fetching banners:", error);
    } else {
      setBanners(data);
    }
    setLoading(false);
  };

  // Open Modal for Adding or Editing
  const openModal = (banner = null) => {
    if (banner) {
      // Editing
      setEditingBanner(banner);
      setFormData({
        title: banner.title,
        description: banner.description || "",
        link_url: banner.link_url || "",
        is_active: banner.is_active,
        start_date: banner.start_date ? new Date(banner.start_date) : null,
        end_date: banner.end_date ? new Date(banner.end_date) : null,
        display_order: banner.display_order || 0,
      });
      setDesktopPreview(banner.desktop_image_url);
      setMobilePreview(banner.mobile_image_url);
    } else {
      // Adding
      setEditingBanner(null);
      setFormData({
        title: "",
        description: "",
        link_url: "",
        is_active: true,
        start_date: null,
        end_date: null,
        display_order:
          banners.length > 0
            ? Math.max(...banners.map((b) => b.display_order)) + 1
            : 0,
      });
      setDesktopPreview(null);
      setMobilePreview(null);
    }

    setDesktopImageFile(null);
    setMobileImageFile(null);
    setIsModalOpen(true);
  };

  // Handle moving banner up in order
  const handleMoveUp = async (bannerId, currentOrder) => {
    // Find the banner above this one
    const bannerAbove = banners.find((b) => b.display_order < currentOrder);

    if (!bannerAbove) return; // Already at the top

    // Update both banners
    const { error: error1 } = await supabase
      .from("promotional_banners")
      .update({ display_order: bannerAbove.display_order })
      .eq("id", bannerId);

    const { error: error2 } = await supabase
      .from("promotional_banners")
      .update({ display_order: currentOrder })
      .eq("id", bannerAbove.id);

    if (error1 || error2) {
      notifications.show({
        title: "Chyba",
        message: "Nepodařilo se změnit pořadí banneru.",
        color: "red",
      });
      console.error("Error updating banner order:", error1 || error2);
    } else {
      await fetchBanners();
      notifications.show({
        title: "Úspěch",
        message: "Pořadí banneru bylo změněno.",
        color: "green",
      });
    }
  };

  // Handle moving banner down in order
  const handleMoveDown = async (bannerId, currentOrder) => {
    // Find the banner below this one
    const bannerBelow = banners.find((b) => b.display_order > currentOrder);

    if (!bannerBelow) return; // Already at the bottom

    // Update both banners
    const { error: error1 } = await supabase
      .from("promotional_banners")
      .update({ display_order: bannerBelow.display_order })
      .eq("id", bannerId);

    const { error: error2 } = await supabase
      .from("promotional_banners")
      .update({ display_order: currentOrder })
      .eq("id", bannerBelow.id);

    if (error1 || error2) {
      notifications.show({
        title: "Chyba",
        message: "Nepodařilo se změnit pořadí banneru.",
        color: "red",
      });
      console.error("Error updating banner order:", error1 || error2);
    } else {
      await fetchBanners();
      notifications.show({
        title: "Úspěch",
        message: "Pořadí banneru bylo změněno.",
        color: "green",
      });
    }
  };

  // Toggle banner active status
  const toggleActive = async (bannerId, currentStatus) => {
    const { error } = await supabase
      .from("promotional_banners")
      .update({ is_active: !currentStatus })
      .eq("id", bannerId);

    if (error) {
      notifications.show({
        title: "Chyba",
        message: "Nepodařilo se změnit stav banneru.",
        color: "red",
      });
      console.error("Error toggling banner status:", error);
    } else {
      await fetchBanners();
      notifications.show({
        title: "Úspěch",
        message: `Banner byl ${!currentStatus ? "aktivován" : "deaktivován"}.`,
        color: "green",
      });
    }
  };

  // Upload image to storage
  const uploadImage = async (file, path) => {
    if (!file) return null;

    // Generate a unique file name
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()
      .toString(36)
      .substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("banners")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL
    const { data: publicURLData } = supabase.storage
      .from("banners")
      .getPublicUrl(filePath);

    return publicURLData.publicUrl;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadingImages(true);

    try {
      let desktopImageUrl = editingBanner?.desktop_image_url || null;
      let mobileImageUrl = editingBanner?.mobile_image_url || null;

      // Upload desktop image if provided
      if (desktopImageFile) {
        desktopImageUrl = await uploadImage(desktopImageFile, "desktop");
      }

      // Upload mobile image if provided
      if (mobileImageFile) {
        mobileImageUrl = await uploadImage(mobileImageFile, "mobile");
      }

      // Check if we have both images
      if (!desktopImageUrl || !mobileImageUrl) {
        throw new Error(
          "Obě verze obrázku (desktop i mobilní) jsou vyžadovány."
        );
      }

      const bannerData = {
        title: formData.title,
        description: formData.description,
        desktop_image_url: desktopImageUrl,
        mobile_image_url: mobileImageUrl,
        link_url: formData.link_url,
        is_active: formData.is_active,
        start_date: formData.start_date,
        end_date: formData.end_date,
        display_order: formData.display_order,
        updated_at: new Date(),
      };

      if (editingBanner) {
        // Update existing banner
        const { error } = await supabase
          .from("promotional_banners")
          .update(bannerData)
          .eq("id", editingBanner.id);

        if (error) {
          throw error;
        }

        notifications.show({
          title: "Úspěch",
          message: "Banner byl úspěšně upraven.",
          color: "green",
        });
      } else {
        // Create new banner
        const { error } = await supabase
          .from("promotional_banners")
          .insert(bannerData);

        if (error) {
          throw error;
        }

        notifications.show({
          title: "Úspěch",
          message: "Banner byl úspěšně vytvořen.",
          color: "green",
        });
      }

      // Refresh banners and close modal
      await fetchBanners();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving banner:", error);
      notifications.show({
        title: "Chyba",
        message: error.message || "Nepodařilo se uložit banner.",
        color: "red",
      });
    } finally {
      setUploadingImages(false);
    }
  };

  // Delete a banner
  const handleDelete = (bannerId) => {
    modals.openConfirmModal({
      title: "Potvrdit smazání",
      centered: true,
      children: (
        <Text size="sm">
          Opravdu chcete smazat tento banner? Tato akce je nevratná.
        </Text>
      ),
      labels: { confirm: "Smazat", cancel: "Zrušit" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        // First get the banner to get the image URLs
        const { data: bannerData } = await supabase
          .from("promotional_banners")
          .select("desktop_image_url, mobile_image_url")
          .eq("id", bannerId)
          .single();

        if (bannerData) {
          // Extract the paths from the URLs
          if (bannerData.desktop_image_url) {
            const desktopUrl = new URL(bannerData.desktop_image_url);
            const desktopPathParts = desktopUrl.pathname.split("/");
            const desktopPath = desktopPathParts
              .slice(desktopPathParts.indexOf("banners") + 1)
              .join("/");

            // Delete from storage
            await supabase.storage.from("banners").remove([desktopPath]);
          }

          if (bannerData.mobile_image_url) {
            const mobileUrl = new URL(bannerData.mobile_image_url);
            const mobilePathParts = mobileUrl.pathname.split("/");
            const mobilePath = mobilePathParts
              .slice(mobilePathParts.indexOf("banners") + 1)
              .join("/");

            // Delete from storage
            await supabase.storage.from("banners").remove([mobilePath]);
          }
        }

        // Delete from database
        const { error } = await supabase
          .from("promotional_banners")
          .delete()
          .eq("id", bannerId);

        if (error) {
          notifications.show({
            title: "Chyba",
            message: "Nepodařilo se smazat banner.",
            color: "red",
          });
          console.error("Error deleting banner:", error);
        } else {
          await fetchBanners();
          notifications.show({
            title: "Úspěch",
            message: "Banner byl úspěšně smazán.",
            color: "green",
          });
        }
      },
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Neurčeno";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("cs-CZ") +
      " " +
      date.toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" })
    );
  };

  // Handle desktop image file change
  const handleDesktopImageChange = (file) => {
    setDesktopImageFile(file);

    if (file) {
      // Create a preview URL
      const url = URL.createObjectURL(file);
      setDesktopPreview(url);
    }
  };

  // Handle mobile image file change
  const handleMobileImageChange = (file) => {
    setMobileImageFile(file);

    if (file) {
      // Create a preview URL
      const url = URL.createObjectURL(file);
      setMobilePreview(url);
    }
  };

  return (
    <div>
      <Group position="apart" mb="md">
        <Title order={2}>Propagační bannery</Title>
        <Button onClick={() => openModal()} size="compact-sm" color="green">
          Přidat banner
        </Button>
      </Group>

      <ScrollArea h={500}>
        <Table striped bg="#cfcfcf" stickyHeader>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Název</Table.Th>
              <Table.Th>Obrázky</Table.Th>
              <Table.Th>Odkaz</Table.Th>
              <Table.Th>Časové rozmezí</Table.Th>
              <Table.Th>Stav</Table.Th>
              <Table.Th>Pořadí</Table.Th>
              <Table.Th>Akce</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {banners.map((banner) => (
              <Table.Tr
                key={banner.id}
                style={!banner.is_active ? { opacity: 0.6 } : {}}
              >
                <Table.Td>
                  <Text weight={600}>{banner.title}</Text>
                  {banner.description && (
                    <Text size="sm" color="dimmed" lineClamp={2}>
                      {banner.description}
                    </Text>
                  )}
                </Table.Td>
                <Table.Td>
                  <Flex gap={8} align="center">
                    <Tooltip label="Desktop verze">
                      <Flex direction="column" align="center" gap={4}>
                        <IconDeviceDesktop size={16} />
                        <Image
                          width={60}
                          height={30}
                          src={banner.desktop_image_url}
                          style={{ aspectRatio: 2 / 1, objectFit: "cover" }}
                          alt={`${banner.title} - desktop`}
                          radius="sm"
                        />
                      </Flex>
                    </Tooltip>
                    <Tooltip label="Mobilní verze">
                      <Flex direction="column" align="center" gap={4}>
                        <IconDeviceMobile size={16} />
                        <Image
                          width={30}
                          height={40}
                          src={banner.mobile_image_url}
                          style={{ aspectRatio: 3 / 4, objectFit: "cover" }}
                          alt={`${banner.title} - mobile`}
                          radius="sm"
                        />
                      </Flex>
                    </Tooltip>
                  </Flex>
                </Table.Td>
                <Table.Td>
                  {banner.link_url ? (
                    <Tooltip label={banner.link_url}>
                      <Text
                        lineClamp={1}
                        style={{
                          maxWidth: "120px",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => window.open(banner.link_url, "_blank")}
                      >
                        <IconLink size={16} style={{ marginRight: "4px" }} />
                        {new URL(banner.link_url).hostname}
                      </Text>
                    </Tooltip>
                  ) : (
                    <Text color="dimmed" size="sm">
                      Bez odkazu
                    </Text>
                  )}
                </Table.Td>
                <Table.Td>
                  {banner.start_date || banner.end_date ? (
                    <Flex direction="column" gap={4}>
                      {banner.start_date && (
                        <Text size="xs">
                          Od: {formatDate(banner.start_date)}
                        </Text>
                      )}
                      {banner.end_date && (
                        <Text size="xs">Do: {formatDate(banner.end_date)}</Text>
                      )}
                    </Flex>
                  ) : (
                    <Text color="dimmed" size="sm">
                      Neomezeno
                    </Text>
                  )}
                </Table.Td>
                <Table.Td>
                  <Badge color={banner.is_active ? "green" : "gray"}>
                    {banner.is_active ? "Aktivní" : "Neaktivní"}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Text>{banner.display_order}</Text>
                </Table.Td>
                <Table.Td>
                  <Flex gap="xs">
                    <ActionIcon
                      color={banner.is_active ? "red" : "green"}
                      onClick={() => toggleActive(banner.id, banner.is_active)}
                      title={banner.is_active ? "Deaktivovat" : "Aktivovat"}
                    >
                      {banner.is_active ? (
                        <IconEyeOff size={16} />
                      ) : (
                        <IconEye size={16} />
                      )}
                    </ActionIcon>
                    <ActionIcon
                      color="blue"
                      onClick={() =>
                        handleMoveUp(banner.id, banner.display_order)
                      }
                      title="Posunout nahoru"
                      disabled={banners.indexOf(banner) === 0}
                    >
                      <IconArrowUp size={16} />
                    </ActionIcon>
                    <ActionIcon
                      color="blue"
                      onClick={() =>
                        handleMoveDown(banner.id, banner.display_order)
                      }
                      title="Posunout dolů"
                      disabled={banners.indexOf(banner) === banners.length - 1}
                    >
                      <IconArrowDown size={16} />
                    </ActionIcon>
                    <ActionIcon
                      color="blue"
                      onClick={() => openModal(banner)}
                      title="Upravit banner"
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      onClick={() => handleDelete(banner.id)}
                      title="Smazat banner"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Flex>
                </Table.Td>
              </Table.Tr>
            ))}
            {banners.length === 0 && !loading && (
              <Table.Tr>
                <Table.Td colSpan={7} style={{ textAlign: "center" }}>
                  <Text color="dimmed">Nejsou k dispozici žádné bannery</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      {/* Modal for Add/Edit Banner */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBanner ? "Upravit banner" : "Přidat banner"}
        size="xl"
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing="md">
            <TextInput
              label="Název banneru"
              placeholder="Zadejte název banneru"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />

            <Textarea
              label="Popis (volitelné)"
              placeholder="Zadejte popis banneru"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              minRows={2}
            />

            <TextInput
              label="URL odkazu (volitelné)"
              placeholder="https://example.com"
              value={formData.link_url}
              onChange={(e) =>
                setFormData({ ...formData, link_url: e.target.value })
              }
            />

            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Text weight={500}>Desktop verze obrázku</Text>
                  <FileInput
                    placeholder="Vyberte soubor"
                    accept="image/*"
                    value={desktopImageFile}
                    onChange={handleDesktopImageChange}
                    label="Desktop obrázek"
                    description="Doporučený poměr stran: 16:9"
                    required={!editingBanner?.desktop_image_url}
                  />
                  {desktopPreview && (
                    <AspectRatio ratio={16 / 9} maw={400} mx="auto">
                      <Image
                        src={desktopPreview}
                        alt="Desktop preview"
                        radius="md"
                      />
                    </AspectRatio>
                  )}
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Text weight={500}>Mobilní verze obrázku</Text>
                  <FileInput
                    placeholder="Vyberte soubor"
                    accept="image/*"
                    value={mobileImageFile}
                    onChange={handleMobileImageChange}
                    label="Mobilní obrázek"
                    description="Doporučený poměr stran: 1:1 nebo 4:5"
                    required={!editingBanner?.mobile_image_url}
                  />
                  {mobilePreview && (
                    <AspectRatio ratio={4 / 5} maw={200} mx="auto">
                      <Image
                        src={mobilePreview}
                        alt="Mobile preview"
                        radius="md"
                      />
                    </AspectRatio>
                  )}
                </Stack>
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <DatePickerInput
                  label="Počáteční datum (volitelné)"
                  placeholder="Vyberte počáteční datum"
                  value={formData.start_date}
                  onChange={(date) =>
                    setFormData({ ...formData, start_date: date })
                  }
                  locale="cs"
                  clearable
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <DatePickerInput
                  label="Koncové datum (volitelné)"
                  placeholder="Vyberte koncové datum"
                  value={formData.end_date}
                  onChange={(date) =>
                    setFormData({ ...formData, end_date: date })
                  }
                  locale="cs"
                  clearable
                  minDate={formData.start_date || undefined}
                />
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NumberInput
                  label="Pořadí zobrazení"
                  placeholder="Zadejte pořadí (0 je nejvýše)"
                  value={formData.display_order}
                  onChange={(value) =>
                    setFormData({ ...formData, display_order: value })
                  }
                  min={0}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Switch
                  label="Aktivní"
                  checked={formData.is_active}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      is_active: event.currentTarget.checked,
                    })
                  }
                  mt={25}
                />
              </Grid.Col>
            </Grid>

            <Group position="right" mt="md">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Zrušit
              </Button>
              <Button type="submit" loading={uploadingImages}>
                {editingBanner ? "Uložit změny" : "Vytvořit banner"}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </div>
  );
};

export default PromotionalBanners;

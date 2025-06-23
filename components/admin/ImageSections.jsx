import { useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient";

import {
  Table,
  Button,
  Modal,
  TextInput,
  Group,
  ActionIcon,
  Text,
  Title,
  ScrollArea,
  Flex,
  Image,
  FileInput,
  Stack,
  Badge,
  Grid,
  AspectRatio,
  Card,
} from "@mantine/core";
import {
  IconEdit,
  IconTrash,
  IconUpload,
  IconX,
  IconPlus,
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

const ImageSections = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);

  // State for Form Data
  const [formData, setFormData] = useState({
    section_key: "",
    image_urls: [],
  });

  // State for Image Upload
  const [imageFiles, setImageFiles] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    fetchSections();
  }, []);

  // Fetch sections from the database
  const fetchSections = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("image_sections")
      .select("*")
      .order("section_key", { ascending: true });

    if (error) {
      notifications.show({
        title: "Chyba",
        message: "Nepodařilo se načíst sekce obrázků.",
        color: "red",
      });
      console.error("Error fetching sections:", error);
    } else {
      setSections(data);
    }
    setLoading(false);
  };

  // Open Modal for Adding or Editing
  const openModal = (section = null) => {
    if (section) {
      // Editing
      setEditingSection(section);
      setFormData({
        section_key: section.section_key,
        image_urls: section.image_urls || [],
      });
    } else {
      // Adding
      setEditingSection(null);
      setFormData({
        section_key: "",
        image_urls: [],
      });
    }

    setImageFiles([]);
    setIsModalOpen(true);
  };

  // Upload image to Supabase Storage
  const uploadImage = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `image-sections/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("photos")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("photos").getPublicUrl(filePath);

    return publicUrl;
  };

  // Handle image file changes
  const handleImageFilesChange = (files) => {
    setImageFiles(files);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.section_key) {
      notifications.show({
        title: "Chyba",
        message: "Vyplňte prosím klíč sekce.",
        color: "red",
      });
      return;
    }

    setUploadingImages(true);

    try {
      let newImageUrls = [...formData.image_urls];

      // Upload new images
      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const imageUrl = await uploadImage(file);
          newImageUrls.push(imageUrl);
        }
      }

      if (editingSection) {
        // Update existing section
        const { error } = await supabase
          .from("image_sections")
          .update({
            section_key: formData.section_key,
            image_urls: newImageUrls,
          })
          .eq("id", editingSection.id);

        if (error) {
          notifications.show({
            title: "Chyba",
            message: "Nepodařilo se upravit sekci.",
            color: "red",
          });
          console.error("Error updating section:", error);
        } else {
          await fetchSections();
          setIsModalOpen(false);
          notifications.show({
            title: "Úspěch",
            message: "Sekce byla úspěšně upravena.",
            color: "green",
          });
        }
      } else {
        // Create new section
        const { error } = await supabase.from("image_sections").insert({
          section_key: formData.section_key,
          image_urls: newImageUrls,
        });

        if (error) {
          notifications.show({
            title: "Chyba",
            message: "Nepodařilo se vytvořit sekci.",
            color: "red",
          });
          console.error("Error creating section:", error);
        } else {
          await fetchSections();
          setIsModalOpen(false);
          notifications.show({
            title: "Úspěch",
            message: "Sekce byla úspěšně vytvořena.",
            color: "green",
          });
        }
      }
    } catch (error) {
      notifications.show({
        title: "Chyba",
        message: "Nepodařilo se nahrát obrázky.",
        color: "red",
      });
      console.error("Error uploading images:", error);
    } finally {
      setUploadingImages(false);
    }
  };

  // Delete a section
  const handleDelete = (sectionId) => {
    modals.openConfirmModal({
      title: "Smazat sekci",
      children: (
        <Text size="sm">
          Opravdu chcete smazat tuto sekci? Tato akce je nevratná.
        </Text>
      ),
      labels: { confirm: "Smazat", cancel: "Zrušit" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        const { error } = await supabase
          .from("image_sections")
          .delete()
          .eq("id", sectionId);

        if (error) {
          notifications.show({
            title: "Chyba",
            message: "Nepodařilo se smazat sekci.",
            color: "red",
          });
          console.error("Error deleting section:", error);
        } else {
          await fetchSections();
          notifications.show({
            title: "Úspěch",
            message: "Sekce byla úspěšně smazána.",
            color: "green",
          });
        }
      },
    });
  };

  if (loading) {
    return <Text>Načítání...</Text>;
  }

  return (
    <Stack gap={16}>
      <Flex justify="space-between" align="center">
        <Title order={3}>Sekce obrázků</Title>
        <Button onClick={() => openModal()}>
          <IconPlus size={16} />
          Přidat sekci
        </Button>
      </Flex>

      <ScrollArea>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Klíč sekce</Table.Th>
              <Table.Th>Počet obrázků</Table.Th>
              <Table.Th>Akce</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sections.map((section) => (
              <Table.Tr key={section.id}>
                <Table.Td>
                  <Badge variant="light">{section.section_key}</Badge>
                </Table.Td>
                <Table.Td>
                  <Badge color="blue">
                    {section.image_urls?.length || 0} obrázků
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={8}>
                    <ActionIcon
                      variant="light"
                      color="blue"
                      onClick={() => openModal(section)}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="light"
                      color="red"
                      onClick={() => handleDelete(section.id)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      {/* Modal for Adding/Editing Sections */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSection ? "Upravit sekci" : "Přidat sekci"}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <Stack gap={16}>
            <TextInput
              label="Klíč sekce"
              placeholder="např. hero, gallery, about"
              value={formData.section_key}
              onChange={(e) =>
                setFormData({ ...formData, section_key: e.target.value })
              }
              required
              disabled={!!editingSection} // Can't change key when editing
            />

            {/* Current Images */}
            {formData.image_urls.length > 0 && (
              <Stack gap={8}>
                <Text size="sm" fw={500}>
                  Aktuální obrázky:
                </Text>
                <Grid>
                  {formData.image_urls.map((url, index) => (
                    <Grid.Col span={4} key={index}>
                      <Card p={8} withBorder>
                        <AspectRatio ratio={16 / 9}>
                          <Image src={url} alt={`Obrázek ${index + 1}`} />
                        </AspectRatio>
                        <Button
                          size="xs"
                          color="red"
                          variant="light"
                          mt={8}
                          fullWidth
                          onClick={() => {
                            const newUrls = formData.image_urls.filter(
                              (_, i) => i !== index
                            );
                            setFormData({ ...formData, image_urls: newUrls });
                          }}
                        >
                          <IconX size={12} />
                          Odstranit
                        </Button>
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              </Stack>
            )}

            {/* Upload New Images */}
            <FileInput
              label="Přidat nové obrázky"
              placeholder="Vyberte obrázky"
              accept="image/*"
              multiple
              value={imageFiles}
              onChange={handleImageFilesChange}
              leftSection={<IconUpload size={16} />}
            />

            <Group justify="flex-end" mt={16}>
              <Button
                variant="light"
                onClick={() => setIsModalOpen(false)}
                disabled={uploadingImages}
              >
                Zrušit
              </Button>
              <Button
                type="submit"
                loading={uploadingImages}
                disabled={uploadingImages}
              >
                {editingSection ? "Upravit" : "Vytvořit"}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
};

export default ImageSections;

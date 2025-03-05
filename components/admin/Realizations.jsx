// components/admin/Realizations.jsx
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
  MultiSelect,
  Flex,
  Image,
  FileInput,
  SimpleGrid,
  Card,
  Badge,
  Stack,
} from "@mantine/core";
import {
  IconEdit,
  IconTrash,
  IconPhoto,
  IconGripVertical,
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { DateInput } from "@mantine/dates";
import "dayjs/locale/cs";
import "@mantine/dates/styles.css";

// Import DnD kit components
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable Photo Card component
const SortablePhotoCard = ({ photo, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: photo.id.toString(),
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      shadow="sm"
      padding="xs"
      radius="md"
      withBorder
    >
      <div
        className="drag-handle"
        {...attributes}
        {...listeners}
        style={{
          cursor: "grab",
          position: "absolute",
          right: 8,
          top: 8,
          zIndex: 10,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: "50%",
          padding: "2px",
        }}
      >
        <IconGripVertical size={16} />
      </div>

      <Card.Section>
        <Image
          src={photo.photo_url}
          alt={photo.alt_text || "Fotografie realizace"}
          height={160}
          fit="cover"
        />
      </Card.Section>
      <Flex direction="column" mt="xs">
        <Badge size="sm" variant="light" mb="xs">
          Pořadí: {photo.display_order + 1}
        </Badge>
        <Text size="sm" color="dimmed" lineClamp={1}>
          {photo.alt_text || "Bez popisu"}
        </Text>
        <Flex justify="flex-end" mt="xs">
          <ActionIcon
            color="red"
            onClick={() => onDelete(photo.id)}
            title="Smazat fotografii"
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Flex>
      </Flex>
    </Card>
  );
};

const Realizations = () => {
  const [realizations, setRealizations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [realizationCategories, setRealizationCategories] = useState({});
  const [realizationPhotos, setRealizationPhotos] = useState({});
  const [loading, setLoading] = useState(true);
  const [reorderingPhotos, setReorderingPhotos] = useState(false);

  // State for Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [editingRealization, setEditingRealization] = useState(null);
  const [currentRealizationId, setCurrentRealizationId] = useState(null);

  // State for Form Data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    realization_date: null,
    categories: [],
  });

  // State for Photo Upload
  const [photoFile, setPhotoFile] = useState(null);
  const [photoAltText, setPhotoAltText] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // DnD sensors setup
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchRealizations();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (realizations.length > 0) {
      fetchRealizationCategories();
      fetchRealizationPhotos();
    }
  }, [realizations]);

  // Fetch realizations from the database
  const fetchRealizations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("realizations")
      .select("*")
      .order("realization_date", { ascending: false });
    if (error) {
      notifications.show({
        title: "Chyba",
        message: "Nepodařilo se načíst realizace.",
        color: "red",
      });
      console.error("Error fetching realizations:", error);
    } else {
      setRealizations(data);
    }
    setLoading(false);
  };

  // Fetch categories from the database
  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) {
      notifications.show({
        title: "Chyba",
        message: "Nepodařilo se načíst kategorie.",
        color: "red",
      });
      console.error("Error fetching categories:", error);
    } else {
      setCategories(data);
    }
  };

  // Fetch realization categories
  const fetchRealizationCategories = async () => {
    const { data, error } = await supabase
      .from("realization_categories")
      .select("*");
    if (error) {
      notifications.show({
        title: "Chyba",
        message: "Nepodařilo se načíst kategorie realizací.",
        color: "red",
      });
      console.error("Error fetching realization categories:", error);
    } else {
      const categoriesMap = {};
      data.forEach((item) => {
        const realizationId = item.realization_id;
        if (!categoriesMap[realizationId]) {
          categoriesMap[realizationId] = [];
        }
        categoriesMap[realizationId].push(item.category_id);
      });
      setRealizationCategories(categoriesMap);
    }
  };

  // Fetch realization photos
  const fetchRealizationPhotos = async () => {
    const { data, error } = await supabase
      .from("realization_photos")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      notifications.show({
        title: "Chyba",
        message: "Nepodařilo se načíst fotografie realizací.",
        color: "red",
      });
      console.error("Error fetching realization photos:", error);
    } else {
      const photosMap = {};
      data.forEach((item) => {
        const realizationId = item.realization_id;
        if (!photosMap[realizationId]) {
          photosMap[realizationId] = [];
        }
        photosMap[realizationId].push(item);
      });
      setRealizationPhotos(photosMap);
    }
  };

  // Handle DnD end event
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const currentPhotos = [...realizationPhotos[currentRealizationId]];
      const oldIndex = currentPhotos.findIndex(
        (p) => p.id.toString() === active.id
      );
      const newIndex = currentPhotos.findIndex(
        (p) => p.id.toString() === over.id
      );

      // Reorder the photos array
      const updatedPhotos = arrayMove(currentPhotos, oldIndex, newIndex);

      // Update the display_order of each photo to match its new position
      const updatedPhotosWithOrder = updatedPhotos.map((photo, index) => ({
        ...photo,
        display_order: index,
      }));

      // Update the state first for immediate UI feedback
      const updatedPhotosMap = {
        ...realizationPhotos,
        [currentRealizationId]: updatedPhotosWithOrder,
      };
      setRealizationPhotos(updatedPhotosMap);

      // Then update the database
      setReorderingPhotos(true);

      try {
        // Create an array of updates to be performed
        const updates = updatedPhotosWithOrder.map((photo) => ({
          id: photo.id,
          display_order: photo.display_order,
        }));

        // Update each photo's display_order in the database
        for (const update of updates) {
          await supabase
            .from("realization_photos")
            .update({ display_order: update.display_order })
            .eq("id", update.id);
        }

        notifications.show({
          title: "Úspěch",
          message: "Pořadí fotografií bylo aktualizováno.",
          color: "green",
        });
      } catch (error) {
        console.error("Error updating photo order:", error);
        notifications.show({
          title: "Chyba",
          message: "Nepodařilo se aktualizovat pořadí fotografií.",
          color: "red",
        });

        // Revert the state if there was an error
        await fetchRealizationPhotos();
      } finally {
        setReorderingPhotos(false);
      }
    }
  };

  // Open Modal for Adding or Editing
  const openModal = (realization = null) => {
    if (realization) {
      // Editing
      setEditingRealization(realization);
      setFormData({
        name: realization.name,
        description: realization.description,
        realization_date: new Date(realization.realization_date),
        categories: realizationCategories[realization.id] || [],
      });
    } else {
      // Adding
      setEditingRealization(null);
      setFormData({
        name: "",
        description: "",
        realization_date: new Date(),
        categories: [],
      });
    }
    setIsModalOpen(true);
  };

  // Open Photo Modal
  const openPhotoModal = (realizationId) => {
    setCurrentRealizationId(realizationId);
    setPhotoFile(null);
    setPhotoAltText("");
    setIsPhotoModalOpen(true);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingRealization) {
      // Update existing realization
      const { error } = await supabase
        .from("realizations")
        .update({
          name: formData.name,
          description: formData.description,
          realization_date: formData.realization_date,
          updated_at: new Date(),
        })
        .eq("id", editingRealization.id);

      if (error) {
        notifications.show({
          title: "Chyba",
          message: "Nepodařilo se upravit realizaci.",
          color: "red",
        });
        console.error("Error updating realization:", error);
      } else {
        await updateRealizationCategories(
          editingRealization.id,
          formData.categories
        );
        await fetchRealizations();
        setIsModalOpen(false);
        notifications.show({
          title: "Úspěch",
          message: "Realizace byla úspěšně upravena.",
          color: "green",
        });
      }
    } else {
      // Create new realization
      const { data, error } = await supabase
        .from("realizations")
        .insert({
          name: formData.name,
          description: formData.description,
          realization_date: formData.realization_date,
        })
        .select()
        .single();

      if (error) {
        notifications.show({
          title: "Chyba",
          message: "Nepodařilo se vytvořit realizaci.",
          color: "red",
        });
        console.error("Error creating realization:", error);
      } else {
        await updateRealizationCategories(data.id, formData.categories);
        await fetchRealizations();
        setIsModalOpen(false);
        notifications.show({
          title: "Úspěch",
          message: "Realizace byla úspěšně vytvořena.",
          color: "green",
        });
      }
    }
  };

  // Upload photo
  const handlePhotoUpload = async (e) => {
    e.preventDefault();
    if (!photoFile || !currentRealizationId) return;

    setUploadingPhoto(true);

    try {
      // Generate a unique file name
      const fileExt = photoFile.name.split(".").pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `realizations/${currentRealizationId}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(filePath, photoFile);

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL
      const { data: publicURLData } = supabase.storage
        .from("photos")
        .getPublicUrl(filePath);

      // Get the current max display_order
      const currentMaxOrder =
        realizationPhotos[currentRealizationId]?.length > 0
          ? Math.max(
              ...realizationPhotos[currentRealizationId].map(
                (p) => p.display_order
              )
            ) + 1
          : 0;

      // Save to the database
      const { error: dbError } = await supabase
        .from("realization_photos")
        .insert({
          realization_id: currentRealizationId,
          photo_url: publicURLData.publicUrl,
          alt_text: photoAltText,
          display_order: currentMaxOrder,
        });

      if (dbError) {
        throw dbError;
      }

      // Refresh data
      await fetchRealizationPhotos();
      setPhotoFile(null);
      setPhotoAltText("");

      notifications.show({
        title: "Úspěch",
        message: "Fotografie byla úspěšně nahrána.",
        color: "green",
      });
    } catch (error) {
      console.error("Error uploading photo:", error);
      notifications.show({
        title: "Chyba",
        message: "Nepodařilo se nahrát fotografii.",
        color: "red",
      });
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Delete photo
  const handlePhotoDelete = async (photoId) => {
    modals.openConfirmModal({
      title: "Potvrdit smazání",
      centered: true,
      children: (
        <Text size="sm">
          Opravdu chcete smazat tuto fotografii? Tato akce je nevratná.
        </Text>
      ),
      labels: { confirm: "Smazat", cancel: "Zrušit" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        // First get the photo to get the URL
        const { data: photoData } = await supabase
          .from("realization_photos")
          .select("photo_url")
          .eq("id", photoId)
          .single();

        if (photoData) {
          // Extract the path from the URL
          const url = new URL(photoData.photo_url);
          const pathParts = url.pathname.split("/");
          const storagePath = pathParts
            .slice(pathParts.indexOf("photos") + 1)
            .join("/");

          // Delete from storage
          await supabase.storage.from("photos").remove([storagePath]);
        }

        // Delete from database
        const { error } = await supabase
          .from("realization_photos")
          .delete()
          .eq("id", photoId);

        if (error) {
          notifications.show({
            title: "Chyba",
            message: "Nepodařilo se smazat fotografii.",
            color: "red",
          });
          console.error("Error deleting photo:", error);
        } else {
          await fetchRealizationPhotos();
          notifications.show({
            title: "Úspěch",
            message: "Fotografie byla úspěšně smazána.",
            color: "green",
          });
        }
      },
    });
  };

  // Delete a realization
  const handleDelete = (realizationId) => {
    modals.openConfirmModal({
      title: "Potvrdit smazání",
      centered: true,
      children: (
        <Text size="sm">
          Opravdu chcete smazat tuto realizaci? Tato akce je nevratná.
        </Text>
      ),
      labels: { confirm: "Smazat", cancel: "Zrušit" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        // Delete photos from storage
        if (realizationPhotos[realizationId]) {
          const photoPromises = realizationPhotos[realizationId].map(
            async (photo) => {
              // Extract the path from the URL
              const url = new URL(photo.photo_url);
              const pathParts = url.pathname.split("/");
              const storagePath = pathParts
                .slice(pathParts.indexOf("photos") + 1)
                .join("/");

              // Delete from storage
              return supabase.storage.from("photos").remove([storagePath]);
            }
          );

          await Promise.all(photoPromises);
        }

        // The database will handle cascading deletes for photos and categories
        const { error } = await supabase
          .from("realizations")
          .delete()
          .eq("id", realizationId);

        if (error) {
          notifications.show({
            title: "Chyba",
            message: "Nepodařilo se smazat realizaci.",
            color: "red",
          });
          console.error("Error deleting realization:", error);
        } else {
          await fetchRealizations();
          notifications.show({
            title: "Úspěch",
            message: "Realizace byla úspěšně smazána.",
            color: "green",
          });
        }
      },
    });
  };

  // Update realization categories
  const updateRealizationCategories = async (realizationId, categoryIds) => {
    await supabase
      .from("realization_categories")
      .delete()
      .eq("realization_id", realizationId);

    // Filter out any empty strings or undefined values
    const validCategoryIds = categoryIds.filter((id) => id);

    if (validCategoryIds.length > 0) {
      const inserts = validCategoryIds.map((categoryId) => ({
        realization_id: realizationId,
        category_id: categoryId,
      }));

      const { error } = await supabase
        .from("realization_categories")
        .insert(inserts);

      if (error) {
        notifications.show({
          title: "Chyba",
          message: "Nepodařilo se aktualizovat kategorie realizace.",
          color: "red",
        });
        console.error("Error updating realization categories:", error);
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("cs-CZ");
  };

  return (
    <div>
      <Group position="apart" mb="md">
        <Title order={2}>Realizace</Title>
        <Button onClick={() => openModal()} size="compact-sm" color="green">
          Přidat realizaci
        </Button>
      </Group>

      <ScrollArea h={500}>
        <Table striped bg="#cfcfcf" stickyHeader>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Název</Table.Th>
              <Table.Th>Datum realizace</Table.Th>
              <Table.Th>Kategorie</Table.Th>
              <Table.Th>Počet fotografií</Table.Th>
              <Table.Th>Akce</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {realizations.map((realization) => (
              <Table.Tr key={realization.id}>
                <Table.Td>{realization.name}</Table.Td>
                <Table.Td>{formatDate(realization.realization_date)}</Table.Td>
                <Table.Td>
                  (
                  {
                    realizationCategories[realization.id]?.map(
                      (categoryId) =>
                        categories.find((c) => c.id === categoryId)?.name_cz
                    ).length
                  }
                  ){" "}
                  {realizationCategories[realization.id]
                    ?.map(
                      (categoryId) =>
                        categories.find((c) => c.id === categoryId)?.name_cz
                    )
                    .join(", ")}
                </Table.Td>
                <Table.Td>
                  {realizationPhotos[realization.id]?.length || 0}
                </Table.Td>
                <Table.Td>
                  <Flex gap="xs">
                    <ActionIcon
                      color="teal"
                      onClick={() => openPhotoModal(realization.id)}
                      title="Spravovat fotografie"
                    >
                      <IconPhoto size={16} />
                    </ActionIcon>
                    <ActionIcon
                      color="blue"
                      onClick={() => openModal(realization)}
                      title="Upravit realizaci"
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      onClick={() => handleDelete(realization.id)}
                      title="Smazat realizaci"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Flex>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      {/* Modal for Add/Edit Realization */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRealization ? "Upravit realizaci" : "Přidat realizaci"}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Název"
            placeholder="Název realizace"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            mb="sm"
          />

          <Textarea
            label="Popis"
            placeholder="Popis realizace"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            minRows={3}
            mb="sm"
          />

          <DateInput
            locale="cs"
            label="Datum realizace"
            placeholder="Vyberte datum"
            value={formData.realization_date}
            onChange={(value) =>
              setFormData({ ...formData, realization_date: value })
            }
            required
            mb="sm"
          />

          <MultiSelect
            label="Kategorie"
            placeholder="Vyberte kategorie"
            data={categories.map((category) => ({
              value: category.id.toString(),
              label: category.name_cz || category.name,
            }))}
            value={formData.categories}
            onChange={(value) =>
              setFormData({ ...formData, categories: value })
            }
            required
            mb="lg"
          />

          <Group position="right" mt="md">
            <Button type="submit">
              {editingRealization ? "Upravit" : "Vytvořit"}
            </Button>
          </Group>
        </form>
      </Modal>

      {/* Modal for Managing Photos */}
      <Modal
        opened={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        title="Správa fotografií"
        size="xl"
      >
        <Stack>
          {/* Current Photos */}
          <Flex justify="space-between" align="center">
            <Text weight={500} mb="xs">
              Aktuální fotografie
            </Text>
            {realizationPhotos[currentRealizationId]?.length > 0 && (
              <Text size="sm" color="dimmed">
                Přetáhněte fotografie pro změnu pořadí
              </Text>
            )}
          </Flex>

          {realizationPhotos[currentRealizationId]?.length > 0 ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={realizationPhotos[currentRealizationId].map((p) =>
                  p.id.toString()
                )}
                strategy={verticalListSortingStrategy}
              >
                <SimpleGrid cols={3} spacing="md">
                  {realizationPhotos[currentRealizationId].map((photo) => (
                    <SortablePhotoCard
                      key={photo.id}
                      photo={photo}
                      onDelete={handlePhotoDelete}
                    />
                  ))}
                </SimpleGrid>
              </SortableContext>
            </DndContext>
          ) : (
            <Text color="dimmed" italic>
              Žádné fotografie
            </Text>
          )}

          {/* Upload New Photo */}
          <Text weight={500} mt="md" mb="xs">
            Nahrát novou fotografii
          </Text>
          <form onSubmit={handlePhotoUpload}>
            <FileInput
              label="Vyberte soubor"
              placeholder="Klikněte pro výběr souboru"
              accept="image/*"
              value={photoFile}
              onChange={setPhotoFile}
              required
              mb="sm"
            />
            <TextInput
              label="Alternativní text"
              placeholder="Popis obrázku pro lepší přístupnost"
              value={photoAltText}
              onChange={(e) => setPhotoAltText(e.target.value)}
              mb="md"
            />
            <Group position="right">
              <Button
                type="submit"
                loading={uploadingPhoto}
                disabled={!photoFile || reorderingPhotos}
              >
                Nahrát fotografii
              </Button>
            </Group>
          </form>
        </Stack>
      </Modal>
    </div>
  );
};

export default Realizations;

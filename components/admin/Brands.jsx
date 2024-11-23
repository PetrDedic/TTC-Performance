// components/admin/Brands.jsx
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Table,
  Button,
  Modal,
  TextInput,
  Select,
  Group,
  ActionIcon,
  Text,
  Title,
  ScrollArea,
  MultiSelect,
  Flex,
  Image,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brandCategories, setBrandCategories] = useState({});
  const [loading, setLoading] = useState(true);

  // State for Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

  // State for Form Data
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    url: "",
    categories: [],
  });

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (brands.length > 0) {
      fetchBrandCategories();
    }
  }, [brands]);

  // Fetch brands from the database
  const fetchBrands = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("brands")
      .select("*")
      .order("name", { ascending: true });
    if (error) {
      notifications.show({
        title: "Chyba",
        message: "Nepodařilo se načíst značky.",
        color: "red",
      });
      console.error("Error fetching brands:", error);
    } else {
      setBrands(data);
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

  // Fetch brand categories
  const fetchBrandCategories = async () => {
    const { data, error } = await supabase.from("brand_categories").select("*");
    if (error) {
      notifications.show({
        title: "Chyba",
        message: "Nepodařilo se načíst kategorie značek.",
        color: "red",
      });
      console.error("Error fetching brand categories:", error);
    } else {
      const categoriesMap = {};
      data.forEach((item) => {
        const brandId = item.brand_id; // Ensure it's a number
        if (!categoriesMap[brandId]) {
          categoriesMap[brandId] = [];
        }
        categoriesMap[brandId].push(item.category_id); // Keep as number
      });
      setBrandCategories(categoriesMap);
    }
  };

  // Open Modal for Adding or Editing
  const openModal = (brand = null) => {
    if (brand) {
      // Editing
      setEditingBrand(brand);
      setFormData({
        name: brand.name,
        image: brand.image,
        url: brand.url,
        categories: brandCategories[brand.id] || [],
      });
    } else {
      // Adding
      setEditingBrand(null);
      setFormData({
        name: "",
        image: "",
        url: "",
        categories: [],
      });
    }
    setIsModalOpen(true);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingBrand) {
      // Update existing brand
      const { error } = await supabase
        .from("brands")
        .update({
          name: formData.name,
          image: formData.image,
          url: formData.url,
        })
        .eq("id", editingBrand.id);

      if (error) {
        notifications.show({
          title: "Chyba",
          message: "Nepodařilo se upravit značku.",
          color: "red",
        });
        console.error("Error updating brand:", error);
      } else {
        await updateBrandCategories(editingBrand.id, formData.categories);
        await fetchBrands();
        setIsModalOpen(false);
        notifications.show({
          title: "Úspěch",
          message: "Značka byla úspěšně upravena.",
          color: "green",
        });
      }
    } else {
      // Create new brand
      const { data, error } = await supabase
        .from("brands")
        .insert({
          name: formData.name,
          image: formData.image,
          url: formData.url,
        })
        .select()
        .single();

      if (error) {
        notifications.show({
          title: "Chyba",
          message: "Nepodařilo se vytvořit značku.",
          color: "red",
        });
        console.error("Error creating brand:", error);
      } else {
        await updateBrandCategories(data.id, formData.categories);
        await fetchBrands();
        setIsModalOpen(false);
        notifications.show({
          title: "Úspěch",
          message: "Značka byla úspěšně vytvořena.",
          color: "green",
        });
      }
    }
  };

  // Delete a brand
  const handleDelete = (brandId) => {
    modals.openConfirmModal({
      title: "Potvrdit smazání",
      centered: true,
      children: (
        <Text size="sm">
          Opravdu chcete smazat tuto značku? Tato akce je nevratná.
        </Text>
      ),
      labels: { confirm: "Smazat", cancel: "Zrušit" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        const { error } = await supabase
          .from("brands")
          .delete()
          .eq("id", brandId);
        if (error) {
          notifications.show({
            title: "Chyba",
            message: "Nepodařilo se smazat značku.",
            color: "red",
          });
          console.error("Error deleting brand:", error);
        } else {
          await deleteBrandCategories(brandId);
          await fetchBrands();
          notifications.show({
            title: "Úspěch",
            message: "Značka byla úspěšně smazána.",
            color: "green",
          });
        }
      },
    });
  };

  // Update brand categories
  const updateBrandCategories = async (brandId, categoryIds) => {
    await supabase.from("brand_categories").delete().eq("brand_id", brandId);

    const inserts = categoryIds.map((categoryId) => ({
      brand_id: brandId,
      category_id: categoryId,
    }));

    const { error } = await supabase.from("brand_categories").insert(inserts);

    if (error) {
      notifications.show({
        title: "Chyba",
        message: "Nepodařilo se aktualizovat kategorie značky.",
        color: "red",
      });
      console.error("Error updating brand categories:", error);
    }
  };

  // Delete brand categories when brand is deleted
  const deleteBrandCategories = async (brandId) => {
    await supabase.from("brand_categories").delete().eq("brand_id", brandId);
  };

  return (
    <div>
      <Group position="apart" mb="md">
        <Title order={2}>Značky</Title>
        <Button onClick={() => openModal()} size="compact-sm" color="green">
          Přidat značku
        </Button>
      </Group>

      <ScrollArea h={500}>
        <Table striped bg="#cfcfcf" stickyHeader>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Název</Table.Th>
              <Table.Th>URL Obrázek</Table.Th>
              <Table.Th>URL Dinocheck</Table.Th>
              <Table.Th>Kategorie</Table.Th>
              <Table.Th>Akce</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {brands.map((brand) => (
              <Table.Tr key={brand.id}>
                <Table.Td>{brand.name}</Table.Td>
                <Table.Td>
                  <Flex gap={8}>
                    {brand.image && (
                      <Image
                        width={24}
                        height={24}
                        src={brand.image}
                        style={{ aspectRatio: 1 / 1, objectFit: "contain" }}
                        alt={brand.name}
                      />
                    )}
                    {brand.image}
                  </Flex>
                </Table.Td>
                <Table.Td>{brand.url}</Table.Td>
                <Table.Td>
                  (
                  {
                    brandCategories[brand.id]?.map(
                      (categoryId) =>
                        categories.find((c) => c.id === categoryId)?.name_cz
                    ).length
                  }
                  ){" "}
                  {brandCategories[brand.id]
                    ?.map(
                      (categoryId) =>
                        categories.find((c) => c.id === categoryId)?.name_cz
                    )
                    .join(", ")}
                </Table.Td>

                <Table.Td>
                  <Flex gap="xs">
                    <ActionIcon color="blue" onClick={() => openModal(brand)}>
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      onClick={() => handleDelete(brand.id)}
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

      {/* Modal for Add/Edit */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBrand ? "Upravit značku" : "Přidat značku"}
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Název"
            placeholder="Název"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <TextInput
            label="URL Obrázek"
            placeholder="https://example.com/image.png"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
          />
          <TextInput
            label="URL Dinocheck"
            placeholder="https://example.com"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
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
          />

          <Group position="right" mt="md">
            <Button type="submit">
              {editingBrand ? "Upravit" : "Vytvořit"}
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default Brands;

// components/admin/Models.jsx

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
  Title,
  ScrollArea,
  Text,
  Flex,
  Loader,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

const Models = () => {
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  // State for Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState(null);

  // State for Form Data
  const [formData, setFormData] = useState({
    name: "",
    brand_id: "",
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  // Fetch models when a brand is selected
  useEffect(() => {
    if (brandFilter) {
      fetchModels(brandFilter);
    } else {
      setModels([]);
      setSearchQuery("");
    }
  }, [brandFilter]);

  // Fetch brands from the database
  const fetchBrands = async () => {
    const { data, error } = await supabase
      .from("brands")
      .select("id, name")
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
  };

  // Fetch models based on selected brand
  const fetchModels = async (brandId) => {
    setLoading(true);
    let query = supabase
      .from("models")
      .select("id, name, brand_id")
      .eq("brand_id", brandId)
      .order("name", { ascending: true });

    if (searchQuery) {
      query = query.ilike("name", `%${searchQuery}%`);
    }

    const { data, error } = await query;
    if (error) {
      notifications.show({
        title: "Chyba",
        message: "Nepodařilo se načíst modely.",
        color: "red",
      });
      console.error("Error fetching models:", error);
    } else {
      setModels(data);
    }
    setLoading(false);
  };

  // Open Modal for Adding or Editing
  const openModal = (model = null) => {
    if (model) {
      // Editing
      setEditingModel(model);
      setFormData({
        name: model.name,
        brand_id: model.brand_id,
      });
    } else {
      // Adding
      setEditingModel(null);
      setFormData({
        name: "",
        brand_id: brandFilter || "",
      });
    }
    setIsModalOpen(true);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.brand_id) {
      notifications.show({
        title: "Chyba",
        message: "Vyberte značku.",
        color: "red",
      });
      return;
    }

    if (editingModel) {
      // Update existing model
      const { error } = await supabase
        .from("models")
        .update({
          name: formData.name,
          brand_id: formData.brand_id,
        })
        .eq("id", editingModel.id);

      if (error) {
        notifications.show({
          title: "Chyba",
          message: "Nepodařilo se upravit model.",
          color: "red",
        });
        console.error("Error updating model:", error);
      } else {
        await fetchModels(formData.brand_id);
        setIsModalOpen(false);
        notifications.show({
          title: "Úspěch",
          message: "Model byl úspěšně upraven.",
          color: "green",
        });
      }
    } else {
      // Create new model
      const { error } = await supabase.from("models").insert({
        name: formData.name,
        brand_id: formData.brand_id,
      });

      if (error) {
        notifications.show({
          title: "Chyba",
          message: "Nepodařilo se vytvořit model.",
          color: "red",
        });
        console.error("Error creating model:", error);
      } else {
        await fetchModels(formData.brand_id);
        setIsModalOpen(false);
        notifications.show({
          title: "Úspěch",
          message: "Model byl úspěšně vytvořen.",
          color: "green",
        });
      }
    }
  };

  // Delete a model with confirmation
  const handleDelete = (modelId) => {
    modals.openConfirmModal({
      title: "Potvrdit smazání",
      centered: true,
      children: (
        <Text size="sm">
          Opravdu chcete smazat tento model? Tato akce je nevratná.
        </Text>
      ),
      labels: { confirm: "Smazat", cancel: "Zrušit" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        const { error } = await supabase
          .from("models")
          .delete()
          .eq("id", modelId);
        if (error) {
          notifications.show({
            title: "Chyba",
            message: "Nepodařilo se smazat model.",
            color: "red",
          });
          console.error("Error deleting model:", error);
        } else {
          await fetchModels(brandFilter);
          notifications.show({
            title: "Úspěch",
            message: "Model byl úspěšně smazán.",
            color: "green",
          });
        }
      },
    });
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search on Enter key press
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && brandFilter) {
      fetchModels(brandFilter);
    }
  };

  return (
    <div>
      <Group position="apart" mb="md">
        <Title order={2}>Modely</Title>
        <Button
          onClick={() => openModal()}
          size="compact-sm"
          color="green"
          disabled={!brandFilter}
        >
          Přidat model
        </Button>
      </Group>

      {/* Brand Selection */}
      <Group position="apart" mb="md">
        <Select
          label="Značka"
          placeholder="Vyberte značku"
          data={brands.map((brand) => ({
            value: brand.id,
            label: brand.name,
          }))}
          value={brandFilter}
          onChange={(value) => {
            setBrandFilter(value);
            setModels([]);
            setSearchQuery("");
          }}
          style={{ flex: 1 }}
        />
        <TextInput
          label="Vyhledat model"
          placeholder="Zadejte název modelu"
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={handleSearchKeyDown}
          disabled={!brandFilter}
          style={{ flex: 1 }}
        />
        <Button
          onClick={() => fetchModels(brandFilter)}
          disabled={!brandFilter}
        >
          Hledat
        </Button>
      </Group>

      {loading ? (
        <Loader size="lg" />
      ) : (
        <ScrollArea h={500}>
          <Table striped bg="#cfcfcf" stickyHeader>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Název</Table.Th>
                <Table.Th>Akce</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {models.map((model) => (
                <Table.Tr key={model.id}>
                  <Table.Td>{model.name}</Table.Td>
                  <Table.Td>
                    <Flex gap="xs">
                      <ActionIcon color="blue" onClick={() => openModal(model)}>
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        color="red"
                        onClick={() => handleDelete(model.id)}
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
      )}

      {/* Modal for Add/Edit */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingModel ? "Upravit model" : "Přidat model"}
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Název"
            placeholder="Název"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Select
            label="Značka"
            placeholder="Vyberte značku"
            data={brands.map((brand) => ({
              value: brand.id,
              label: brand.name,
            }))}
            value={formData.brand_id}
            onChange={(value) => setFormData({ ...formData, brand_id: value })}
            required
            disabled
          />
          <Group position="right" mt="md">
            <Button type="submit">
              {editingModel ? "Upravit" : "Vytvořit"}
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default Models;

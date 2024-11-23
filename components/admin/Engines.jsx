// components/admin/Engines.jsx

import { useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient";

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

const Engines = () => {
  const [engines, setEngines] = useState([]);
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [engineTypes, setEngineTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [engineTypeFilter, setEngineTypeFilter] = useState("");

  // State for Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEngine, setEditingEngine] = useState(null);

  // State for Form Data
  const [formData, setFormData] = useState({
    specifications: "",
    model_id: "",
    engine_type_id: "",
  });

  useEffect(() => {
    fetchBrands();
    fetchEngineTypes();
  }, []);

  // Fetch models when a brand is selected
  useEffect(() => {
    if (brandFilter) {
      fetchModels(brandFilter);
    } else {
      setModels([]);
      setModelFilter("");
      setEngines([]);
    }
  }, [brandFilter]);

  // Fetch engines when a model is selected
  useEffect(() => {
    if (modelFilter) {
      fetchEngines(modelFilter);
    } else {
      setEngines([]);
    }
  }, [modelFilter]);

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
    const { data, error } = await supabase
      .from("models")
      .select("id, name")
      .eq("brand_id", brandId)
      .order("name", { ascending: true });
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
  };

  // Fetch engine types from the database
  const fetchEngineTypes = async () => {
    const { data, error } = await supabase
      .from("engine_types")
      .select("id, name_cz")
      .order("name_cz", { ascending: true });
    if (error) {
      notifications.show({
        title: "Chyba",
        message: "Nepodařilo se načíst typy motorů.",
        color: "red",
      });
      console.error("Error fetching engine types:", error);
    } else {
      setEngineTypes(data);
    }
  };

  // Fetch engines based on selected model and filters
  const fetchEngines = async (modelId) => {
    setLoading(true);
    let query = supabase
      .from("engines")
      .select(
        `
        id,
        specifications,
        model_id,
        engine_type_id,
        models (id, name),
        engine_types (id, name_cz)
      `
      )
      .eq("model_id", modelId)
      .order("specifications", { ascending: true });

    if (engineTypeFilter) {
      query = query.eq("engine_type_id", engineTypeFilter);
    }

    if (searchQuery) {
      query = query.ilike("specifications", `%${searchQuery}%`);
    }

    const { data, error } = await query;
    if (error) {
      notifications.show({
        title: "Chyba",
        message: "Nepodařilo se načíst motory.",
        color: "red",
      });
      console.error("Error fetching engines:", error);
    } else {
      setEngines(data);
    }
    setLoading(false);
  };

  // Open Modal for Adding or Editing
  const openModal = (engine = null) => {
    if (engine) {
      // Editing
      setEditingEngine(engine);
      setFormData({
        specifications: engine.specifications,
        model_id: engine.model_id,
        engine_type_id: engine.engine_type_id,
      });
    } else {
      // Adding
      setEditingEngine(null);
      setFormData({
        specifications: "",
        model_id: modelFilter || "",
        engine_type_id: "",
      });
    }
    setIsModalOpen(true);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.model_id) {
      notifications.show({
        title: "Chyba",
        message: "Vyberte model.",
        color: "red",
      });
      return;
    }

    if (editingEngine) {
      // Update existing engine
      const { error } = await supabase
        .from("engines")
        .update({
          specifications: formData.specifications,
          model_id: formData.model_id,
          engine_type_id: formData.engine_type_id,
        })
        .eq("id", editingEngine.id);

      if (error) {
        notifications.show({
          title: "Chyba",
          message: "Nepodařilo se upravit motor.",
          color: "red",
        });
        console.error("Error updating engine:", error);
      } else {
        await fetchEngines(formData.model_id);
        setIsModalOpen(false);
        notifications.show({
          title: "Úspěch",
          message: "Motor byl úspěšně upraven.",
          color: "green",
        });
      }
    } else {
      // Create new engine
      const { error } = await supabase.from("engines").insert({
        specifications: formData.specifications,
        model_id: formData.model_id,
        engine_type_id: formData.engine_type_id,
      });

      if (error) {
        notifications.show({
          title: "Chyba",
          message: "Nepodařilo se vytvořit motor.",
          color: "red",
        });
        console.error("Error creating engine:", error);
      } else {
        await fetchEngines(formData.model_id);
        setIsModalOpen(false);
        notifications.show({
          title: "Úspěch",
          message: "Motor byl úspěšně vytvořen.",
          color: "green",
        });
      }
    }
  };

  // Delete an engine with confirmation
  const handleDelete = (engineId) => {
    modals.openConfirmModal({
      title: "Potvrdit smazání",
      centered: true,
      children: (
        <Text size="sm">
          Opravdu chcete smazat tento motor? Tato akce je nevratná.
        </Text>
      ),
      labels: { confirm: "Smazat", cancel: "Zrušit" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        const { error } = await supabase
          .from("engines")
          .delete()
          .eq("id", engineId);
        if (error) {
          notifications.show({
            title: "Chyba",
            message: "Nepodařilo se smazat motor.",
            color: "red",
          });
          console.error("Error deleting engine:", error);
        } else {
          await fetchEngines(modelFilter);
          notifications.show({
            title: "Úspěch",
            message: "Motor byl úspěšně smazán.",
            color: "green",
          });
        }
      },
    });
  };

  return (
    <div>
      <Group position="apart" mb="md">
        <Title order={2}>Motory</Title>
        <Button
          onClick={() => openModal()}
          size="compact-sm"
          color="green"
          disabled={!modelFilter}
        >
          Přidat motor
        </Button>
      </Group>

      {/* Brand and Model Selection */}
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
            setModelFilter("");
            setEngines([]);
            setSearchQuery("");
            setEngineTypeFilter("");
          }}
          style={{ flex: 1 }}
        />
        <Select
          label="Model"
          placeholder="Vyberte model"
          data={models.map((model) => ({
            value: model.id,
            label: model.name,
          }))}
          value={modelFilter}
          onChange={(value) => {
            setModelFilter(value);
            setEngines([]);
            setSearchQuery("");
            setEngineTypeFilter("");
          }}
          disabled={!brandFilter}
          style={{ flex: 1 }}
        />
      </Group>

      {/* Search and Engine Type Filter */}
      <Group position="apart" mb="md">
        <TextInput
          placeholder="Vyhledat podle specifikace"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && modelFilter) {
              fetchEngines(modelFilter);
            }
          }}
          disabled={!modelFilter}
          style={{ flex: 1 }}
        />
        <Select
          placeholder="Filtrovat podle typu motoru"
          data={[
            { value: "", label: "Všechny typy" },
            ...engineTypes.map((type) => ({
              value: type.id,
              label: type.name_cz,
            })),
          ]}
          value={engineTypeFilter}
          onChange={(value) => setEngineTypeFilter(value)}
          disabled={!modelFilter}
          style={{ width: 200 }}
        />
        <Button
          onClick={() => fetchEngines(modelFilter)}
          disabled={!modelFilter}
        >
          Filtrovat
        </Button>
      </Group>

      {loading ? (
        <Loader size="lg" />
      ) : (
        <ScrollArea h={500}>
          <Table striped bg="#cfcfcf" stickyHeader>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Specifikace</Table.Th>
                <Table.Th>Model</Table.Th>
                <Table.Th>Typ motoru</Table.Th>
                <Table.Th>Akce</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {engines.map((engine) => (
                <Table.Tr key={engine.id}>
                  <Table.Td>{engine.specifications}</Table.Td>
                  <Table.Td>
                    {models.find((m) => m.id === engine.model_id)?.name ||
                      engine.models?.name ||
                      "N/A"}
                  </Table.Td>
                  <Table.Td>
                    {engineTypes.find((t) => t.id === engine.engine_type_id)
                      ?.name_cz ||
                      engine.engine_types?.name_cz ||
                      "N/A"}
                  </Table.Td>
                  <Table.Td>
                    <Flex gap="xs">
                      <ActionIcon
                        color="blue"
                        onClick={() => openModal(engine)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        color="red"
                        onClick={() => handleDelete(engine.id)}
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
        title={editingEngine ? "Upravit motor" : "Přidat motor"}
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Specifikace"
            placeholder="Specifikace motoru"
            value={formData.specifications}
            onChange={(e) =>
              setFormData({ ...formData, specifications: e.target.value })
            }
            required
          />
          <Select
            label="Model"
            placeholder="Vyberte model"
            data={models.map((model) => ({
              value: model.id,
              label: model.name,
            }))}
            value={formData.model_id}
            onChange={(value) => setFormData({ ...formData, model_id: value })}
            required
            disabled
          />
          <Select
            label="Typ motoru"
            placeholder="Vyberte typ motoru"
            data={engineTypes.map((type) => ({
              value: type.id,
              label: type.name_cz,
            }))}
            value={formData.engine_type_id}
            onChange={(value) =>
              setFormData({ ...formData, engine_type_id: value })
            }
            required
          />
          <Group position="right" mt="md">
            <Button type="submit">
              {editingEngine ? "Upravit" : "Vytvořit"}
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default Engines;

import styled from "styled-components";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Flex, Image, Select, Text } from "@mantine/core";
import supabase from "@/lib/supabaseClient";

const Styled30 = styled.div`
  margin: auto;
  width: 75vw;
  display: flex;
  max-width: 1280px;
  flex-direction: column;
  gap: 2rem;

  h3 {
    font-size: 1.75rem;
  }

  a {
    text-decoration: none;
    color: #101c24;
    transition: 250ms;

    &:hover {
      color: #e84048;
    }
  }

  form {
    max-width: 720px;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #0b1e25;
    padding: 2rem;
    border-radius: 1rem;

    .flex {
      display: flex;
      gap: 1rem;
      @media (max-width: 1280px) {
        flex-direction: column;
      }
      & > * {
        width: 100%;
      }
    }
  }

  input,
  textarea {
    padding: 1rem;
    font-size: 1rem;
    border-radius: 1rem;
  }

  input[type="submit"] {
    background-color: #e84048;
    color: white;
    border: none;
    padding: 1rem;
    cursor: pointer;
  }

  label {
    color: white;
  }

  .checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Form = ({
  simplified = false,
  mailTo = "zapletal@ttcperformance.cz",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    ...(simplified
      ? {}
      : {
          category: "",
          brand: "",
          otherBrand: "",
          model: "",
          otherModel: "",
          engine: "",
          otherEngine: "",
          discountCode: "",
          power: "",
          modifications: "",
          consent: false,
        }),
  });

  // State for options
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [engines, setEngines] = useState([]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      const { data: categoriesData, error } = await supabase
        .from("categories")
        .select("id, name, name_cz")
        .not("name_cz", "is", null);
      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(categoriesData);
      }
    };
    fetchCategories();
  }, []);

  // Fetch brands when category changes
  useEffect(() => {
    if (formData.category) {
      const fetchBrands = async () => {
        const { data: brandCategoryData, error } = await supabase
          .from("brand_categories")
          .select("brand_id, brands (id, name, image, url)")
          .eq("category_id", formData.category);
        if (error) {
          console.error("Error fetching brands:", error);
        } else {
          const brandList = brandCategoryData.map((item) => item.brands);
          setBrands(brandList);
        }
      };
      fetchBrands();
    } else {
      setBrands([]);
      setModels([]);
      setEngines([]);
      setFormData((prevData) => ({
        ...prevData,
        brand: "",
        otherBrand: "",
        model: "",
        otherModel: "",
        engine: "",
        otherEngine: "",
      }));
    }
  }, [formData.category]);

  // Fetch models when brand changes
  useEffect(() => {
    if (formData.brand && formData.brand !== "other") {
      const fetchModels = async () => {
        const { data: modelsData, error } = await supabase
          .from("models")
          .select("id, name")
          .eq("brand_id", formData.brand);
        if (error) {
          console.error("Error fetching models:", error);
        } else {
          setModels(modelsData);
        }
      };
      fetchModels();
    } else {
      setModels([]);
      setEngines([]);
      setFormData((prevData) => ({
        ...prevData,
        model: "",
        otherModel: "",
        engine: "",
        otherEngine: "",
      }));
    }
  }, [formData.brand]);

  // Fetch engines when model changes
  useEffect(() => {
    if (formData.model && formData.model !== "other") {
      const fetchEngines = async () => {
        const { data: enginesData, error } = await supabase
          .from("engines")
          .select("id, specifications, engine_types(id,name,name_cz)")
          .eq("model_id", formData.model);
        if (error) {
          console.error("Error fetching engines:", error);
        } else {
          setEngines(enginesData);
        }
      };
      fetchEngines();
    } else {
      setEngines([]);
      setFormData((prevData) => ({
        ...prevData,
        engine: "",
        otherEngine: "",
      }));
    }
  }, [formData.model]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name) => (value) => {
    setFormData((prevData) => {
      let updates = { [name]: value };

      // Reset dependent fields when selection changes
      if (name === "brand") {
        updates = {
          ...updates,
          model: "",
          otherModel: "",
          engine: "",
          otherEngine: "",
        };
      } else if (name === "model") {
        updates = {
          ...updates,
          engine: "",
          otherEngine: "",
        };
      }

      // Reset 'other' fields if standard option is selected
      if (name === "brand" && value !== "other") {
        updates.otherBrand = "";
      }
      if (name === "model" && value !== "other") {
        updates.otherModel = "";
      }
      if (name === "engine" && value !== "other") {
        updates.otherEngine = "";
      }

      return {
        ...prevData,
        ...updates,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (simplified) {
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, mailTo }),
        });

        if (response.ok) {
          alert("Email byl úspěšně odeslán!");

          if (window.dataLayer) {
            window.dataLayer.push({
              event: "form_sent",
              lead_type: "contact",
            });
          }

          // Reset form
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        } else {
          alert("Error sending email");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error sending email");
      }
      return;
    }

    // Find the category name_cz based on the selected id
    const categoryName =
      categories.find((c) => c.id.toString() === formData.category)?.name_cz ||
      "";

    // Prepare data for submission
    const submissionData = {
      ...formData,
      category: categoryName,
      brand:
        formData.brand === "other"
          ? formData.otherBrand
          : brands.find((b) => b.id.toString() === formData.brand)?.name || "",
      model:
        formData.model === "other"
          ? formData.otherModel
          : models.find((m) => m.id.toString() === formData.model)?.name || "",
      engine:
        formData.engine === "other"
          ? formData.otherEngine
          : engines.find((e) => e.id.toString() === formData.engine)
              ?.specifications || "",
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...submissionData, mailTo }),
      });

      if (response.ok) {
        alert("Email byl úspěšně odeslán!");

        if (window.dataLayer) {
          window.dataLayer.push({
            event: "form_sent",
            lead_type: "contact",
          });
        }

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          category: "",
          brand: "",
          otherBrand: "",
          model: "",
          otherModel: "",
          engine: "",
          otherEngine: "",
          discountCode: "",
          power: "",
          modifications: "",
          consent: false,
        });
      } else {
        alert("Error sending email");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending email");
    }
  };

  return (
    <Styled30 id="form">
      <h3 style={{ textAlign: "center" }}>Kontaktujte nás</h3>
      <p style={{ textAlign: "center" }}>
        Kontaktujte nás na telefonním čísle{" "}
        <a href="tel:+420 602 562 650" style={{ fontWeight: 700 }}>
          +420 602 562 650
        </a>
        , a nebo pomocí níže uvedeného formuláře a my se Vám ozveme.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Jméno a příjmení"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mailová adresa"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className="flex">
          <input
            type="tel"
            name="phone"
            placeholder="Telefonní číslo"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {simplified ? (
          <textarea
            rows="4"
            name="message"
            placeholder="Vaše zpráva"
            value={formData.message}
            onChange={handleChange}
            required
          />
        ) : (
          <>
            {/* Category Select */}
            <Select
              label="Kategorie vozidla"
              placeholder="Vyberte kategorii"
              data={categories
                .sort((a, b) => a.name_cz.localeCompare(b.name_cz))
                .map((category) => ({
                  value: category.id.toString(),
                  label: category.name_cz,
                }))}
              value={formData.category}
              onChange={handleSelectChange("category")}
            />

            {/* Brand Select */}
            {formData.category && (
              <>
                <Select
                  label="Značka vozidla"
                  placeholder="Vyberte značku"
                  data={[
                    ...brands
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((brand) => ({
                        value: brand.id.toString(),
                        label: brand.name,
                        image: brand.image || `/media/brands/${brand.name}.jpg`,
                      })),
                    { value: "other", label: "Jiné" },
                  ]}
                  value={formData.brand}
                  onChange={handleSelectChange("brand")}
                  disabled={!formData.category}
                  renderOption={({ option }) => (
                    <Flex gap={8} align="center">
                      {option.value !== "other" && (
                        <Image
                          width={24}
                          height={24}
                          src={option.image}
                          style={{ aspectRatio: 1 / 1, objectFit: "contain" }}
                          alt={option.label}
                        />
                      )}
                      <Text>{option.label}</Text>
                    </Flex>
                  )}
                />
                {formData.brand === "other" && (
                  <input
                    type="text"
                    name="otherBrand"
                    placeholder="Zadejte značku vozidla"
                    value={formData.otherBrand}
                    onChange={handleChange}
                  />
                )}
              </>
            )}

            {/* Model Select */}
            {formData.brand && (
              <>
                <Select
                  label="Model vozidla"
                  placeholder="Vyberte model"
                  data={[
                    ...models
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((model) => ({
                        value: model.id.toString(),
                        label: model.name,
                      })),
                    { value: "other", label: "Jiné" },
                  ]}
                  value={formData.model}
                  onChange={handleSelectChange("model")}
                  disabled={!formData.brand}
                />
                {formData.model === "other" && (
                  <input
                    type="text"
                    name="otherModel"
                    placeholder="Zadejte model vozidla"
                    value={formData.otherModel}
                    onChange={handleChange}
                  />
                )}
              </>
            )}

            {/* Engine Select */}
            {formData.model && (
              <>
                <Select
                  label="Motor vozidla"
                  placeholder="Vyberte motor"
                  data={[
                    ...Object.entries(
                      engines
                        .slice() // Create a shallow copy of the array to avoid mutating the original
                        .sort((a, b) =>
                          a.specifications.localeCompare(b.specifications)
                        ) // Sort engines by specifications
                        .reduce((groups, engine) => {
                          const groupName = engine.engine_types.name_cz;
                          if (!groups[groupName]) {
                            groups[groupName] = [];
                          }
                          groups[groupName].push({
                            value: engine.id.toString(),
                            label: engine.specifications,
                          });
                          return groups;
                        }, {})
                    ).map(([group, items]) => ({
                      group,
                      items,
                    })),
                    {
                      group: "Jiné",
                      items: [{ value: "other", label: "Jiné" }],
                    },
                  ]}
                  value={formData.engine}
                  onChange={handleSelectChange("engine")}
                  disabled={!formData.model}
                />
                {formData.engine === "other" && (
                  <input
                    type="text"
                    name="otherEngine"
                    placeholder="Zadejte motor vozidla"
                    value={formData.otherEngine}
                    onChange={handleChange}
                  />
                )}
              </>
            )}

            <textarea
              rows="4"
              name="modifications"
              placeholder="Poptávka úpravy na daném vozidle"
              value={formData.modifications}
              onChange={handleChange}
            />
          </>
        )}

        {!simplified && (
          <div className="checkbox">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              required
            />
            <label>
              Souhlasím se{" "}
              <Link
                href="/gdpr"
                style={{ textDecoration: "underline", color: "white" }}
              >
                zpracováním osobních údajů
              </Link>
            </label>
          </div>
        )}
        <input type="submit" value="Odeslat dotazník" />
      </form>
    </Styled30>
  );
};

export default Form;

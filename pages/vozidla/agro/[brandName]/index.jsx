import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "@/lib/supabaseClient";
import { Accordion, Flex, Grid, Stack, Text } from "@mantine/core";
import Hero from "@/components/Hero";

export async function getStaticPaths() {
  const { data: categoryData } = await supabase
    .from("categories")
    .select("id")
    .eq("name", "agro")
    .single();

  const categoryId = categoryData.id;

  const { data: brandCategoryData } = await supabase
    .from("brand_categories")
    .select("brand_id")
    .eq("category_id", categoryId);

  const brandIds = brandCategoryData.map((item) => item.brand_id);

  const { data: brands } = await supabase
    .from("brands")
    .select("name")
    .in("id", brandIds);

  const paths = brands.map((brand) => ({
    params: { brandName: brand.name },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { data: brandData } = await supabase
    .from("brands")
    .select("id, name")
    .eq("name", params.brandName)
    .single();

  if (!brandData) {
    return { notFound: true };
  }

  const brandId = brandData.id;

  const { data: modelsData } = await supabase
    .from("models")
    .select("id, name, engines (id, specifications, engine_types(name))")
    .eq("brand_id", brandId)
    .order("name");

  return {
    props: {
      brand: brandData,
      models: modelsData,
    },
    revalidate: 3600,
  };
}

const Vozidla = ({ brand, models }) => {
  const [accordionValue, setAccordionValue] = useState(null);

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("agro-accordionState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setAccordionValue(parsedState);
      console.log(parsedState);
    }
  }, []);

  // Scroll to the open accordion item after the state has updated
  useEffect(() => {
    if (accordionValue) {
      const model = models.find((m) => m.name === accordionValue);

      console.log(model);
      if (model) {
        const element = document.getElementById(`accordion-item-${model.id}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          console.log("scroll not possible");
        }
      }
    }
  }, [accordionValue, models]);

  const handleAccordionChange = (value) => {
    console.log(value);
    setAccordionValue(value);
    localStorage.setItem("agro-accordionState", JSON.stringify(value));
  };

  return (
    <>
      <Head>
        <title>{brand.name} - Modely - TTC Performance</title>
        <meta
          name="description"
          content="Modely a specifikace motorů pro vybranou značku"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="TTC_WEB_Icon.svg" />
      </Head>
      <Navbar />
      <Hero image="/media/foto/vozidla.png" title={`${brand.name} - Modely`} />
      <Stack
        px={32}
        py={128}
        justify="center"
        align="start"
        gap={32}
        maw={1280}
        mx="auto"
        w="100%"
      >
        <div className="nav">
          <Link href="/vozidla">Značky vozidel</Link>
          {" > "}
          <Link href="/vozidla/agro">Zemědělská technika</Link>
          {" > "}
          {brand.name}
        </div>

        <Accordion
          multiple={false}
          value={accordionValue}
          onChange={handleAccordionChange}
          variant="separated"
          w="100%"
          radius={0}
          mb={32}
        >
          {models.map((model) => (
            <Accordion.Item
              key={model.id}
              value={model.name}
              style={{ borderColor: "var(--item-border-color)" }}
              mt={0}
              id={`accordion-item-${model.id}`}
            >
              <Accordion.Control>
                <Text size="lg" fw={700}>
                  {model.name}
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Grid w="100%">
                  {model.engines.filter(
                    (e) => e.engine_types.name === "diesel"
                  ) &&
                    model.engines.filter(
                      (e) => e.engine_types.name === "diesel"
                    ).length > 0 && (
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <Flex direction="column" gap={8}>
                          <Text fz={16} fw={700}>
                            Dieselové motory
                          </Text>
                          {model.engines
                            .filter((e) => e.engine_types.name === "diesel")
                            .map((engine) => (
                              <Flex
                                key={engine.id}
                                align="center"
                                style={{ marginBottom: "0.5rem" }}
                              >
                                <Link
                                  href={`/vozidla/agro/${encodeURIComponent(
                                    brand.name
                                  )}/${encodeURIComponent(engine.id)}`}
                                  style={{
                                    fontSize: 16,
                                    color: "#dc1735",
                                  }}
                                >
                                  {engine.specifications}
                                </Link>
                              </Flex>
                            ))}
                        </Flex>
                      </Grid.Col>
                    )}

                  {model.engines.filter(
                    (e) => e.engine_types.name === "gasoline"
                  ) &&
                    model.engines.filter(
                      (e) => e.engine_types.name === "gasoline"
                    ).length > 0 && (
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <Flex direction="column" gap={8}>
                          <Text fz={16} fw={700}>
                            Benzínové motory
                          </Text>
                          {model.engines
                            .filter((e) => e.engine_types.name === "gasoline")
                            .map((engine) => (
                              <Flex
                                key={engine.id}
                                align="center"
                                style={{ marginBottom: "0.5rem" }}
                              >
                                <Link
                                  href={`/vozidla/agro/${encodeURIComponent(
                                    brand.name
                                  )}/${encodeURIComponent(engine.id)}`}
                                  style={{
                                    fontSize: 16,
                                    color: "#dc1735",
                                  }}
                                >
                                  {engine.specifications}
                                </Link>
                              </Flex>
                            ))}
                        </Flex>
                      </Grid.Col>
                    )}
                </Grid>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Stack>
      <Footer />
    </>
  );
};

export default Vozidla;

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Link from "next/link";
import supabase from "@/lib/supabaseClient";
import { Accordion, Card, Flex, Grid, Image, Text } from "@mantine/core";

const StyledRealizace = styled.main`
  background-image: url("/Web_pozadi.svg");
  background-size: cover;
  background-position: top;

  width: 100%;
  height: auto;
  min-height: 100vh;

  color: #101c24;

  .hero {
    margin-bottom: 8rem;
    width: 100vw;
    height: 50vh;

    @media (max-width: 900px) {
      height: 90vh;
    }

    background-image: url("/media/foto/vozidla.png");
    background-size: cover;
    background-position: center;

    display: flex;
    align-content: center;
    justify-content: center;

    color: white;

    div {
      align-self: center;
      text-align: center;

      h1 {
        font-size: 4rem;
        font-weight: bolder;
        line-height: 4.75rem;

        @media (max-width: 1280px) {
          font-size: 3rem;
        }
        @media (max-width: 600px) {
          font-size: 2rem;
        }
      }
      p {
        font-size: 2rem;
        font-weight: 100;

        @media (max-width: 1280px) {
          font-size: 1.5rem;
          letter-spacing: 0;
        }
        @media (max-width: 600px) {
          font-size: 1.5rem;
        }
      }
    }
  }

  .container {
    width: 80vw;
    margin: auto;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;

    .item {
      width: 8rem;
      white-space: nowrap;
      height: auto;
      padding: 1rem;
      background-color: #fff;
      transition: 150ms;
      font-size: 1rem;

      p {
        text-align: center;
        margin-bottom: 0.5rem;
        white-space: pre-wrap;
      }

      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
        0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
        0 16px 16px rgba(0, 0, 0, 0.12);

      img {
        margin: auto;
        min-width: 4rem;
        width: 4rem;
        min-height: 3rem;
        height: 3rem;
        object-fit: contain;
      }

      &.active {
        background-color: #101c2499;
        color: white;
      }

      &:hover {
        cursor: pointer;
        color: white;
        background-color: #101c24;
      }
    }
  }

  ul {
    scroll-margin: 8rem;
    margin: auto;
    width: 85vw;
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;

    h4 {
      font-size: 1.75rem;
      width: 100%;
      margin-top: 2rem;
      font-weight: 600;
    }
    p {
      margin-top: 1rem;
      font-size: 1.25rem;
      width: 100%;

      @media (max-width: 900px) {
        font-size: 1.15rem;
      }
    }

    li {
      font-size: 1.25rem;
      padding: 0.5rem;
      margin: 0.5rem;
      border-radius: 0.5rem;
      width: calc(50% - 1rem);
      text-align: left;

      @media (max-width: 900px) {
        width: calc(100% - 1rem);
        font-size: 1rem;
      }

      a {
        color: #e84048;
      }
    }
  }

  .nav {
    margin: auto;
    width: 85vw;
  }
`;

export async function getStaticPaths() {
  const { data: categoryData } = await supabase
    .from("categories")
    .select("id")
    .eq("name", "machines")
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
    .eq("brand_id", brandId);

  return {
    props: {
      brand: brandData,
      models: modelsData,
    },
    revalidate: 3600,
  };
}

const Vozidla = ({ brand, models }) => {
  return (
    <>
      <Head>
        <title>{brand.name} - Modely - TTC Performance</title>
        <meta
          name="description"
          content="Modely a specifikace motorů pro vybranou značku"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="/media/Premium Package/Logos (Vector Format)/Transparent.svg"
        />
      </Head>
      <Navbar />
      <StyledRealizace>
        <div className="hero">
          <div>
            <h1>{brand.name} - Modely</h1>
          </div>
        </div>

        <div className="nav">
          <Link href="/vozidla">Značky vozidel</Link>
          {" > "}
          <Link href="/vozidla/bagry">Stavební technika</Link>
          {" > "}
          {brand.name}
        </div>

        <div className="container">
          <Accordion variant="separated" w="100%" radius={0} mb={32}>
            {models.map((model) => (
              <Accordion.Item
                key={model.id}
                value={model.name}
                style={{ borderColor: "var(--item-border-color)" }}
                mt={0}
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
                                    href={`/vozidla/bagry/${encodeURIComponent(
                                      brand.name
                                    )}/${encodeURIComponent(engine.id)}`}
                                    style={{
                                      fontSize: 16,
                                      color: "#e84048",
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
                                    href={`/vozidla/bagry/${encodeURIComponent(
                                      brand.name
                                    )}/${encodeURIComponent(engine.id)}`}
                                    style={{
                                      fontSize: 16,
                                      color: "#e84048",
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
        </div>
      </StyledRealizace>
      <Footer />
    </>
  );
};

export default Vozidla;
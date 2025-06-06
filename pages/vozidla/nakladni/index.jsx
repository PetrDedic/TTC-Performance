import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Link from "next/link";
import supabase from "@/lib/supabaseClient";
import { Card, Flex, Image, Stack, Text } from "@mantine/core";
import Hero from "@/components/Hero";

const StyledRealizace = styled.main`
  width: 100%;
  height: auto;
  min-height: 100vh;

  color: #101c24;

  .hero {
    margin-bottom: 8rem;
    width: 100vw;
    height: 480px;

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
    padding: 1.5rem;
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

  [id^="accordion-item-"] {
    scroll-margin-top: 160px; /* Adjust to your desired offset */
  }
`;

export async function getStaticProps() {
  const { data: categoryData, error: categoryError } = await supabase
    .from("categories")
    .select("id")
    .eq("name", "truck")
    .single();

  if (categoryError || !categoryData) {
    console.error("Category fetch error:", categoryError);
    return { props: { brands: [] }, revalidate: 3600 };
  }

  const categoryId = categoryData.id;

  const { data: brandCategoryData, error: brandCategoryError } = await supabase
    .from("brand_categories")
    .select("brand_id")
    .eq("category_id", categoryId);

  if (brandCategoryError || !brandCategoryData) {
    console.error("Brand-Category fetch error:", brandCategoryError);
    return { props: { brands: [] }, revalidate: 3600 };
  }

  const brandIds = brandCategoryData.map((item) => item.brand_id);

  const { data: brands, error: brandsError } = await supabase
    .from("brands")
    .select("id, name, url, image")
    .order("name", { ascending: true })
    .in("id", brandIds);

  if (brandsError) {
    console.error("Supabase fetch error:", brandsError);
    return { props: { brands: [] }, revalidate: 3600 };
  }

  return { props: { brands }, revalidate: 3600 };
}

const Vozidla = ({ brands }) => {
  return (
    <>
      <Head>
        <title>TTC Performance</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="TTC_WEB_Icon.svg" />
      </Head>
      <Navbar />
      <Hero image="/media/foto/vozidla.png" title="Nákladní vozidla" />
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
          {` > Nákladní vozidla`}
        </div>
        <Flex
          gap={16}
          wrap="wrap"
          mx="auto"
          my={32}
          align="center"
          justify="center"
        >
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/vozidla/nakladni/${encodeURIComponent(brand.name)}`}
              passHref
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Card
                radius={8}
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
                }}
                w={128}
                h={160}
              >
                <Flex direction="column" justify="space-between" h={128}>
                  <Text ta="center">{brand.name}</Text>
                  {brand.image ? (
                    <Image
                      width={72}
                      height={72}
                      src={brand.image}
                      style={{ aspectRatio: 1 / 1, objectFit: "contain" }}
                      alt={brand.name}
                    />
                  ) : (
                    <Image
                      width={72}
                      height={72}
                      src={`/media/brands/${brand.name}.jpg`}
                      style={{ aspectRatio: 1 / 1, objectFit: "contain" }}
                      alt={brand.name}
                    />
                  )}
                </Flex>
              </Card>
            </Link>
          ))}
        </Flex>

        <p>&#8203;</p>
      </Stack>
      <Footer />
    </>
  );
};

export default Vozidla;

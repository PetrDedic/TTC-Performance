import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { AspectRatio, Card, Flex, Grid, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Realizace = () => {
  const smallWindow = useMediaQuery("(max-width: 1200px)");

  return (
    <>
      <Head>
        <title>TTC Performance</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="/media/Premium Package/Logos (Vector Format)/Transparent.svg"
        />
      </Head>
      <Navbar />
      <Hero
        image="/Foty_web_uvodni_hlavni_fotky/Realizace_foto.webp"
        title="Do všech našich realizací dáváme maximální úsilí a proto jsou naši klienti vždy spokojeni."
      />
      <Stack
        px={32}
        py={128}
        justify="center"
        align="center"
        gap={smallWindow ? 64 : 128}
        maw={720}
        mx="auto"
        w="100%"
      >
        <Grid w="100%" gutter={32} maw={1280} mx="auto">
          <Grid.Col span={{ md: 6, sm: 12 }}>
            <Card
              bg="#101c24"
              radius={16}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 15px",
                justifyContent: "center",
              }}
            >
              <Flex align="center" justify="center" gap={32}>
                <AspectRatio
                  ratio={1}
                  style={{
                    position: "relative",
                  }}
                  h={128}
                  w={128}
                >
                  <Stack align="center" justify="center" h="100%" maw={96}>
                    <svg
                      fill="#fff"
                      version="1.2"
                      baseProfile="tiny"
                      id="tractor_by_Adioma"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 196"
                    >
                      <path
                        d="M175.9,154.3c0,21.6,17.5,39.1,39.1,39.1s39.1-17.5,39.1-39.1c0-21.6-17.5-39.1-39.1-39.1S175.9,132.7,175.9,154.3z
	 M202.2,154.3c0-7,5.7-12.7,12.7-12.7c7,0,12.7,5.7,12.7,12.7c0,7-5.7,12.7-12.7,12.7C207.9,167,202.2,161.3,202.2,154.3z M2,148
	c0,25,20.3,45.3,45.3,45.3c25,0,45.3-20.3,45.3-45.3s-20.3-45.3-45.3-45.3C22.3,102.7,2,123,2,148z M28.4,148c0-2.7,0.6-5.3,1.6-7.6
	c2.9-6.7,9.6-11.3,17.3-11.3s14.4,4.7,17.3,11.3c1,2.3,1.6,4.9,1.6,7.6c0,10.4-8.5,18.9-18.9,18.9S28.4,158.5,28.4,148z M99.7,140.4
	h70.6c5.9-19,23.7-32.8,44.6-32.8V75.4c0-8.1-6.6-14.7-14.7-14.7h-15.5V16.2h-12.5v44.5h-45.4L105.2,8.3c-1.5-3.3-4.8-5.5-8.4-5.5
	H34.4v57.9L11.8,81.4v27.4c9.4-8.5,21.9-13.7,35.6-13.7C73.9,95.1,96,114.8,99.7,140.4z M47.3,60.7v-45H94l16.2,45H47.3z"
                      />
                    </svg>
                  </Stack>
                </AspectRatio>
                <Stack align="center" justify="center" w="100%">
                  <Text fz={20} c="white">
                    Zemědělská technika
                  </Text>
                </Stack>
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ md: 6, sm: 12 }}>
            <Card
              bg="#101c24"
              radius={16}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 15px",
                justifyContent: "center",
              }}
            >
              <Flex align="center" justify="center" gap={32}>
                <AspectRatio
                  ratio={1}
                  style={{
                    position: "relative",
                  }}
                  h={128}
                  w={128}
                >
                  <Image
                    quality={100}
                    src="/media/icons/van.png"
                    alt="/media/icons/van.png"
                    fill
                    sizes="100vw"
                    style={{ borderRadius: 16, objectFit: "contain" }}
                  />
                </AspectRatio>
                <Stack align="center" justify="center" w="100%">
                  <Text fz={20} c="white">
                    Nákladní vozidla
                  </Text>
                </Stack>
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ md: 6, sm: 12 }}>
            <Card
              bg="#101c24"
              radius={16}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 15px",
                justifyContent: "center",
              }}
            >
              <Flex align="center" justify="center" gap={32}>
                <AspectRatio
                  ratio={1}
                  style={{
                    position: "relative",
                  }}
                  h={128}
                  w={128}
                >
                  <Image
                    quality={100}
                    src="/media/icons/car.png"
                    alt="/media/icons/car.png"
                    fill
                    sizes="100vw"
                    style={{ borderRadius: 16, objectFit: "contain" }}
                  />
                </AspectRatio>
                <Stack align="center" justify="center" w="100%">
                  <Text fz={20} c="white">
                    Osobní vozidla
                  </Text>
                </Stack>
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ md: 6, sm: 12 }}>
            <Card
              bg="#101c24"
              radius={16}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 15px",
                justifyContent: "center",
              }}
            >
              <Flex align="center" justify="center" gap={32}>
                <AspectRatio
                  ratio={1}
                  style={{
                    position: "relative",
                  }}
                  h={128}
                  w={128}
                >
                  <Image
                    quality={100}
                    src="/media/icons/const.png"
                    alt="/media/icons/const.png"
                    fill
                    sizes="100vw"
                    style={{ borderRadius: 16, objectFit: "contain" }}
                  />
                </AspectRatio>
                <Stack align="center" justify="center" w="100%">
                  <Text fz={20} c="white">
                    Stavební technika
                  </Text>
                </Stack>
              </Flex>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
      <Footer />
    </>
  );
};

export default Realizace;

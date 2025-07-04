import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { TwoOneSection } from "./sluzby/lesni-technika";
import XmasCard from "@/components/XmasCard";
import {
  AspectRatio,
  Button,
  Card,
  Flex,
  Grid,
  Stack,
  Text,
  Title,
  Image as MantineImage,
  BackgroundImage,
} from "@mantine/core";
import Hero from "@/components/Hero";
import { useMediaQuery } from "@mantine/hooks";
import classes from "../styles/Index.module.css";
import promotionalBannerClasses from "../styles/PromotionalBanner.module.css";
import { AnimatedSection } from "@/components/AnimatedSection";
import { StaggeredItem, StaggeredItems } from "@/components/StaggeredItems";
import { IconBrandInstagram } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import supabase from "@/lib/supabaseClient";

export const getStaticProps = async () => {
  // Fetch multiple image sections for different carousels
  const sectionKeys = [
    "mc-performance-luxury-cars",
    "mc-performance-porsche",
    "mc-performance-bmw-audi-mercedes",
    "mc-performance-audi-rs6-rs7-rsq8",
    "mc-performance-mercedes",
  ];

  const { data: imageSections, error: imageSectionsError } = await supabase
    .from("image_sections")
    .select("*")
    .in("section_key", sectionKeys);

  if (imageSectionsError) {
    console.error("Error fetching image sections:", imageSectionsError);
    return {
      props: { imageSections: [] },
      revalidate: 120, // 2 minutes
    };
  }

  // Convert array to object for easier access
  const imageSectionsMap = {};
  imageSections.forEach((section) => {
    imageSectionsMap[section.section_key] = section;
  });

  return {
    props: { imageSections: imageSectionsMap },
    revalidate: 120, // 2 minutes
  };
};

export default function Home({ imageSections }) {
  const smallWindow = useMediaQuery("(max-width: 1200px)");

  return (
    <>
      <Head>
        <title>TTC Performance</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="TTC_WEB_Icon.svg" />
      </Head>
      <Navbar />
      <Hero
        image="/Foty_web_uvodni_hlavni_fotky/ECU_foto.webp"
        title="Specialisté na performance úpravy motorů sportovních a luxusních aut."
        buttons={
          <Flex wrap="wrap" gap={16} align="center" justify="center">
            <Link
              href="#form"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Button
                color="#dc1735"
                variant="filled"
                size="compact-xl"
                radius="lg"
                px={32}
              >
                Získat nabídku
              </Button>
            </Link>
            <Link
              href="tel:+420 602 562 650"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Button
                color="#dc1735"
                variant="filled"
                size="compact-xl"
                radius="lg"
                px={32}
              >
                +420 602 562 650
              </Button>
            </Link>
          </Flex>
        }
      />
      <AnimatedSection
        animationType="fadeIn"
        delay={0.2}
        style={{ width: "100%" }}
      >
        <Card
          py="5vh"
          px={32}
          radius={0}
          style={{
            position: "relative",
            width: "100lvw",
            alignItems: "center",
            justifyContent: "center",
            gap: 48,
          }}
          c="white"
        >
          <Stack align="center" justify="center" w="100%" gap={64}>
            <Stack>
              <Title
                order={3}
                fz={32}
                lh={1}
                style={{ scrollMarginTop: 100 }}
                c="black"
                ta="center"
              >
                Konec problémů s nedostatkem výkonu
              </Title>
              <Text fz={20} maw={720} ta="center" c="black">
                Využijte naše služby, pro získání vyššího výkonu, na svém
                vozidle! Zaměřujeme se na softwarové úpravy motorů - STAGE 1-3,
                automatických pořevodovek a Performance úpravy, mezi které
                patří: Turba, intercoolery, výfukové systémy a svody, sportovní
                sání, atd...
              </Text>
            </Stack>
            <Stack>
              <Title
                order={3}
                fz={32}
                lh={1}
                style={{ scrollMarginTop: 100 }}
                c="black"
                ta="center"
              >
                Nabízíme performance díly z celého světa
              </Title>
              <Text fz={20} maw={720} ta="center" c="black">
                Pro naše úpravy používáme ty nejznámější světové značky dílů
                jako je: Remus, Milltek sport, Eventuri, Forge Motorsport,
                Wagner Tuning, K&N, Do88 Performance, Akrapovič a další..
              </Text>
            </Stack>
          </Stack>
        </Card>
      </AnimatedSection>
      <AnimatedSection
        animationType="fadeIn"
        delay={0.2}
        style={{ width: "100%" }}
      >
        <Card
          py="5vh"
          px={32}
          radius={0}
          style={{
            position: "relative",
            width: "100lvw",
            alignItems: "center",
            justifyContent: "center",
            gap: 48,
          }}
          c="white"
          bg="#e9e9e9"
        >
          <Stack align="center" justify="center" w="100%" gap={64}>
            <Stack justify="center" align="center">
              <Image
                src="/RRahmani.webp"
                alt="RRahmani logo"
                width={256}
                height={100}
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
              <Title
                maw={800}
                order={3}
                fz={32}
                lh={1}
                style={{ scrollMarginTop: 100 }}
                c="black"
                ta="center"
              >
                Jako jediní v České republice jsme oficiálním partnerem RRahmani
                Performance.
              </Title>
              <Text fz={20} maw={720} ta="center" c="black">
                RRahmani je celosvětově jedním z nejvyhledávanějších úpravců
                sportovních a luxusních aut jako je: Ferrari, Lamborghini,
                McLeren, Porsche, Audi, BMW, Mercedes a další.
              </Text>
              <Link
                href="https://www.instagram.com/rrahmani_performance"
                target="_blank"
              >
                <Flex align="center" gap={8}>
                  <Flex
                    w={32}
                    h={32}
                    align="center"
                    justify="center"
                    bg="#dc1735"
                    radius="lg"
                    style={{
                      borderRadius: 8,
                    }}
                  >
                    <IconBrandInstagram color="white" size={24} />
                  </Flex>
                  <Text fz={20} maw={720} ta="center" c="black" td="underline">
                    rrahmani_performance
                  </Text>
                </Flex>
              </Link>
            </Stack>
          </Stack>
        </Card>
      </AnimatedSection>

      <AnimatedSection
        animationType="fadeIn"
        delay={0.2}
        style={{ width: "100%" }}
      >
        <Card
          py="7.5vh"
          px={32}
          radius={0}
          style={{
            position: "relative",
            width: "100lvw",
            alignItems: "center",
            justifyContent: "center",
            gap: 48,
          }}
          c="white"
          bg="#101c24"
        >
          <Stack justify="center" align="center">
            <Title
              maw={800}
              order={3}
              fz={32}
              lh={1}
              style={{ scrollMarginTop: 100 }}
              c="white"
              ta="center"
            >
              Chiptuning pro luxusní vozidla
            </Title>
            <Text fz={20} maw={720} ta="center" c="#dc1735">
              McLeren, Ferrari, Lamborghini, Porsche, Bentley
            </Text>
          </Stack>
        </Card>
      </AnimatedSection>

      <Stack
        px={32}
        py={128}
        justify="center"
        align="center"
        gap={smallWindow ? 64 : 128}
        maw={1280}
        mx="auto"
        w="100%"
      >
        <AnimatedSection
          animationType="fadeIn"
          delay={0.2}
          style={{ width: "100%" }}
        >
          <Stack w="100%" align="center" justify="center" gap={64}>
            <Stack w="100%" align="center" justify="center" gap={32}>
              <Text fz={20} maw={720} ta="center" c="black">
                Zaměřujeme se na softwarové úpravy výkonu těchto luxusních
                automobilových značek.
              </Text>
              <Text fz={20} maw={720} ta="center" c="black">
                Nabízíme optimalizaci softwaru řídících jednotek motorů (ECU),
                úpravy automatických převodovek a mnoho dalších služeb, abychom
                odemkli maximální potenciál vašeho auta.
              </Text>
              <Text fz={20} maw={720} ta="center" c="black">
                Všechny naše úpravy ladíme na 4x4 válcové zkušebně výkonu.
              </Text>
            </Stack>
            <Carousel
              w="100%"
              maw={1280}
              mx="auto"
              withIndicators={
                smallWindow
                  ? true
                  : imageSections["mc-performance-luxury-cars"]?.image_urls
                      ?.length > 3
              }
              withControls={
                smallWindow
                  ? true
                  : imageSections["mc-performance-luxury-cars"]?.image_urls
                      ?.length > 3
              }
              slideSize={{ base: "100%", sm: "33.333333%" }}
              slideGap="md"
              emblaOptions={{ loop: true, align: "start", slidesToScroll: 1 }}
              classNames={{
                indicator: promotionalBannerClasses.indicator,
              }}
            >
              {imageSections["mc-performance-luxury-cars"]?.image_urls?.map(
                (image, index) => (
                  <Carousel.Slide key={index}>
                    <AspectRatio
                      ratio={16 / 9}
                      w="100%"
                      h="100%"
                      style={{
                        borderRadius: 16,
                        aspectRatio: 16 / 9,
                        position: "relative",
                      }}
                    >
                      <Image
                        src={image}
                        alt={
                          imageSections["mc-performance-luxury-cars"]
                            ?.section_key +
                          " " +
                          index
                        }
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                          borderRadius: 16,
                        }}
                      />
                    </AspectRatio>
                  </Carousel.Slide>
                )
              ) || []}
            </Carousel>
            <Title order={3} fz={32} lh={1} c="#dc1735" ta="center" maw={800}>
              Díky spolupráci s RRahmani Performance, vám přinášíme ty
              nejkvalitnější úpravy na světovém trhu!
            </Title>
          </Stack>
        </AnimatedSection>

        <AnimatedSection
          animationType="fadeIn"
          delay={0.2}
          style={{ width: "100%" }}
        >
          <Stack w="100%" align="center" justify="center">
            <Title order={3} fz={32} lh={1} c="black" ta="center" maw={800}>
              Odemkněte skrytý potenciál vašeho Porsche!
            </Title>
            <Text fz={20} maw={720} ta="center" c="black">
              Díky našemu významnému partnerovi, vám nabízíme optimalizaci
              softwaru řídících jednotek motorů (ECU) STAGE 1-3 a úpravy
              automatických převodovek. Jedná se zejména o vozidla: Porsche GT3,
              GT3RS, GT4RS.
            </Text>
            <Carousel
              w="100%"
              maw={1280}
              mx="auto"
              withIndicators={
                smallWindow
                  ? true
                  : imageSections["mc-performance-porsche"]?.image_urls
                      ?.length > 3
              }
              withControls={
                smallWindow
                  ? true
                  : imageSections["mc-performance-porsche"]?.image_urls
                      ?.length > 3
              }
              slideSize={{ base: "100%", sm: "33.333333%" }}
              slideGap="md"
              emblaOptions={{ loop: true, align: "start", slidesToScroll: 1 }}
              classNames={{
                indicator: promotionalBannerClasses.indicator,
              }}
            >
              {imageSections["mc-performance-porsche"]?.image_urls?.map(
                (image, index) => (
                  <Carousel.Slide key={index}>
                    <AspectRatio
                      ratio={16 / 9}
                      w="100%"
                      h="100%"
                      style={{
                        borderRadius: 16,
                        aspectRatio: 16 / 9,
                        position: "relative",
                      }}
                    >
                      <Image
                        src={image}
                        alt={
                          imageSections["mc-performance-porsche"]?.section_key +
                          " " +
                          index
                        }
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                          borderRadius: 16,
                        }}
                      />
                    </AspectRatio>
                  </Carousel.Slide>
                )
              ) || []}
            </Carousel>
          </Stack>
        </AnimatedSection>

        <AnimatedSection animationType="fadeIn" delay={0.2}>
          <Card
            py="7.5vh"
            px={32}
            radius={0}
            style={{
              position: "relative",
              width: "100lvw",
              alignItems: "center",
              justifyContent: "center",
              gap: 48,
            }}
            c="white"
            bg="#101c24"
          >
            <Text
              order={3}
              fz={36}
              lh={1}
              c="white"
              ta="center"
              maw={800}
              fw={700}
            >
              Pro získání cenové nabídky vyplňte formulář, nebo zavolejte na
              níže uvedené číslo.
            </Text>
            <Flex wrap="wrap" gap={16} align="center" justify="center">
              <Link
                href="#form"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button
                  color="#dc1735"
                  variant="filled"
                  size="compact-xl"
                  radius="lg"
                  px={32}
                >
                  Získat cenu
                </Button>
              </Link>
              <Link
                href="tel:+420 602 562 650"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button
                  color="#dc1735"
                  variant="filled"
                  size="compact-xl"
                  radius="lg"
                  px={32}
                >
                  +420 602 562 650
                </Button>
              </Link>
            </Flex>
          </Card>
        </AnimatedSection>

        <AnimatedSection
          animationType="fadeIn"
          delay={0.2}
          style={{ width: "100%" }}
        >
          <Stack w="100%" align="center" justify="center">
            <Title order={3} fz={32} lh={1} c="black" ta="center" maw={800}>
              Chiptuning pro BMW, Audi, Mercedes
            </Title>
            <Text fz={20} maw={720} ta="center" c="black">
              Nabízíme optimalizaci softwaru řídících jednotek motorů (ECU),
              úpravy automatických převodovek a mnoho dalších služeb pro vozidla
              do roku 2025.
            </Text>
            <Text fz={20} maw={720} ta="center" c="black">
              Všechny naše úpravy ladíme na 4x4 válcové zkušebně výkonu.
            </Text>
            <Carousel
              w="100%"
              maw={1280}
              mx="auto"
              withIndicators={
                smallWindow
                  ? true
                  : imageSections["mc-performance-bmw-audi-mercedes"]
                      ?.image_urls?.length > 3
              }
              withControls={
                smallWindow
                  ? true
                  : imageSections["mc-performance-bmw-audi-mercedes"]
                      ?.image_urls?.length > 3
              }
              slideSize={{ base: "100%", sm: "33.333333%" }}
              slideGap="md"
              emblaOptions={{ loop: true, align: "start", slidesToScroll: 1 }}
              classNames={{
                indicator: promotionalBannerClasses.indicator,
              }}
            >
              {imageSections[
                "mc-performance-bmw-audi-mercedes"
              ]?.image_urls?.map((image, index) => (
                <Carousel.Slide key={index}>
                  <AspectRatio
                    ratio={16 / 9}
                    w="100%"
                    h="100%"
                    style={{
                      borderRadius: 16,
                      aspectRatio: 16 / 9,
                      position: "relative",
                    }}
                  >
                    <Image
                      src={image}
                      alt={
                        imageSections["mc-performance-bmw-audi-mercedes"]
                          ?.section_key +
                        " " +
                        index
                      }
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        borderRadius: 16,
                      }}
                    />
                  </AspectRatio>
                </Carousel.Slide>
              )) || []}
            </Carousel>
          </Stack>
        </AnimatedSection>

        <AnimatedSection
          animationType="fadeIn"
          delay={0.2}
          style={{ width: "100%" }}
        >
          <Stack w="100%" align="center" justify="center">
            <Title order={3} fz={32} lh={1} c="black" ta="center" maw={800}>
              Vylepšete své BMW pomocí MG Flasher
            </Title>
            <Text fz={20} maw={720} ta="center" c="black">
              MG Flasher je mobilní aplikace vyvinutá pro možnost ladění přes
              palubní diagnostiku u BMW řady Fxx/Gxx vybavených motory generace
              1 & 2 B46, B48 nebo B58 a také motory S58 a S63. Veškerý proces je
              poté velice jednoduchý a doba zápisu mapy je 15 - 20 sekund!
            </Text>
          </Stack>
        </AnimatedSection>

        <AnimatedSection
          animationType="fadeIn"
          delay={0.2}
          style={{ width: "100%" }}
        >
          <Stack w="100%" align="center" justify="center">
            <Title order={3} fz={32} lh={1} c="black" ta="center" maw={800}>
              Co si lze zakoupit?
            </Title>
            <Text fz={20} maw={720} ta="center" c="black">
              Vždy je nutné mít zakoupenou licenci "Flasher License" a poté si
              lze koupit "STAGE 1" & "STAGE 2", nebo "ULTIMATE PACKAGE", který
              obsahuje obě verze.
            </Text>
          </Stack>
          <Grid
            w="100%"
            gutter={smallWindow ? 24 : 64}
            mt={32}
            maw={960}
            mx="auto"
          >
            <Grid.Col span={{ base: 6, sm: 3 }}>
              <AspectRatio ratio={3 / 4}>
                <Card
                  className={classes.card}
                  radius={16}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 15px",
                    justifyContent: "center",
                    backgroundImage: `url("/Fotky_WEBP/Flasher_License.webp")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  p={48}
                />
              </AspectRatio>
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 3 }}>
              <AspectRatio ratio={3 / 4}>
                <Card
                  className={classes.card}
                  radius={16}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 15px",
                    justifyContent: "center",
                    backgroundImage: `url("/Fotky_WEBP/Stage_1.webp")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  p={48}
                />
              </AspectRatio>
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 3 }}>
              <AspectRatio ratio={3 / 4}>
                <Card
                  className={classes.card}
                  radius={16}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 15px",
                    justifyContent: "center",
                    backgroundImage: `url("/Fotky_WEBP/Stage_2.webp")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  p={48}
                />
              </AspectRatio>
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 3 }}>
              <AspectRatio ratio={3 / 4}>
                <Card
                  className={classes.card}
                  radius={16}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 15px",
                    justifyContent: "center",
                    backgroundImage: `url("/Fotky_WEBP/Ultimate_Package.webp")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  p={48}
                />
              </AspectRatio>
            </Grid.Col>
          </Grid>
        </AnimatedSection>

        <AnimatedSection animationType="fadeIn" delay={0.2}>
          <Card
            py="7.5vh"
            px={32}
            radius={0}
            style={{
              position: "relative",
              width: "100lvw",
              alignItems: "center",
              justifyContent: "center",
              gap: 48,
            }}
            c="white"
            bg="#101c24"
          >
            <Stack w="100%" align="center" justify="center" gap={32}>
              <Text
                order={3}
                fz={36}
                lh={1}
                c="white"
                ta="center"
                maw={800}
                fw={700}
              >
                Nevíte si rady a potřebujete poradit?
              </Text>
              <Text fz={20} maw={720} ta="center" c="white">
                Vyplňte jednoduchý poptávkový formulář, nebo nám rovnou
                zavolejte na níže uvedené číslo.
              </Text>
            </Stack>
            <Flex wrap="wrap" gap={16} align="center" justify="center">
              <Link
                href="#form"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button
                  color="#dc1735"
                  variant="filled"
                  size="compact-xl"
                  radius="lg"
                  px={32}
                >
                  Vyplnit formulář
                </Button>
              </Link>
              <Link
                href="tel:+420 602 562 650"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button
                  color="#dc1735"
                  variant="filled"
                  size="compact-xl"
                  radius="lg"
                  px={32}
                >
                  +420 602 562 650
                </Button>
              </Link>
            </Flex>
          </Card>
        </AnimatedSection>

        <AnimatedSection
          animationType="fadeIn"
          delay={0.2}
          style={{ width: "100%" }}
        >
          <Stack w="100%" align="center" justify="center">
            <Title order={3} fz={32} lh={1} c="black" ta="center" maw={800}>
              Vylepšete svá vozidla Audi RS3 8Y / Cupra Formentor VZ5!
            </Title>
            <Text fz={20} maw={720} ta="center" c="black">
              Představujeme revoluční optimalizaci řídící jednotky pro Audi RS3
              a Cupra Formentor VZ5 s motory 2.5TFSI 390PS 400PS s kódy motoru
              DNWB a DNWC.
            </Text>
          </Stack>
        </AnimatedSection>

        <AnimatedSection
          animationType="fadeIn"
          delay={0.2}
          style={{ width: "100%" }}
        >
          <Stack w="100%" align="center" justify="center">
            <Title order={3} fz={32} lh={1} c="black" ta="center" maw={800}>
              Audi RS6, RS7, RSQ8, Lamborghini Urus, Porsche Cayenne Turbo GT do
              roku 2025
            </Title>
            <Text fz={20} maw={720} ta="center" c="black">
              Díky našemu významnému partnerovi, vám přinášíme možnost odemčení
              řídící jednotky motoru, optimalizaci softwaru STAGE 1-3 a úpravy
              automatických převodovek. Jedná se zejména o vozidla: Audi RS6,
              RS7, RSQ8, Lamborghini Urus & Porsche Cayenne Turbo GT.
            </Text>
            <Carousel
              w="100%"
              maw={1280}
              mx="auto"
              withIndicators={
                smallWindow
                  ? true
                  : imageSections["mc-performance-audi-rs6-rs7-rsq8"]
                      ?.image_urls?.length > 3
              }
              withControls={
                smallWindow
                  ? true
                  : imageSections["mc-performance-audi-rs6-rs7-rsq8"]
                      ?.image_urls?.length > 3
              }
              slideSize={{ base: "100%", sm: "33.333333%" }}
              slideGap="md"
              emblaOptions={{ loop: true, align: "start", slidesToScroll: 1 }}
              classNames={{
                indicator: promotionalBannerClasses.indicator,
              }}
            >
              {imageSections[
                "mc-performance-audi-rs6-rs7-rsq8"
              ]?.image_urls?.map((image, index) => (
                <Carousel.Slide key={index}>
                  <AspectRatio
                    ratio={16 / 9}
                    w="100%"
                    h="100%"
                    style={{
                      borderRadius: 16,
                      aspectRatio: 16 / 9,
                      position: "relative",
                    }}
                  >
                    <Image
                      src={image}
                      alt={
                        imageSections["mc-performance-audi-rs6-rs7-rsq8"]
                          ?.section_key +
                        " " +
                        index
                      }
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        borderRadius: 16,
                      }}
                    />
                  </AspectRatio>
                </Carousel.Slide>
              )) || []}
            </Carousel>
          </Stack>
        </AnimatedSection>

        <AnimatedSection
          animationType="fadeIn"
          delay={0.2}
          style={{ width: "100%" }}
        >
          <Stack w="100%" align="center" justify="center">
            <Title order={3} fz={32} lh={1} c="black" ta="center" maw={800}>
              Exkluzivní úpravy pro vozidla Mercedes
            </Title>
            <Text fz={20} maw={720} ta="center" c="black">
              Vhodné pro všechny vozidla Mercedes MD1/MG1 do roku 2025.
              Podporované typy motorů: OM656, OM654, M139, M256
            </Text>
            <Carousel
              w="100%"
              maw={1280}
              mx="auto"
              withIndicators={
                smallWindow
                  ? true
                  : imageSections["mc-performance-mercedes"]?.image_urls
                      ?.length > 3
              }
              withControls={
                smallWindow
                  ? true
                  : imageSections["mc-performance-mercedes"]?.image_urls
                      ?.length > 3
              }
              slideSize={{ base: "100%", sm: "33.333333%" }}
              slideGap="md"
              emblaOptions={{ loop: true, align: "start", slidesToScroll: 1 }}
              classNames={{
                indicator: promotionalBannerClasses.indicator,
              }}
            >
              {imageSections["mc-performance-mercedes"]?.image_urls?.map(
                (image, index) => (
                  <Carousel.Slide key={index}>
                    <AspectRatio
                      ratio={16 / 9}
                      w="100%"
                      h="100%"
                      style={{
                        borderRadius: 16,
                        aspectRatio: 16 / 9,
                        position: "relative",
                      }}
                    >
                      <Image
                        src={image}
                        alt={
                          imageSections["mc-performance-mercedes"]
                            ?.section_key +
                          " " +
                          index
                        }
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                          borderRadius: 16,
                        }}
                      />
                    </AspectRatio>
                  </Carousel.Slide>
                )
              ) || []}
            </Carousel>
          </Stack>
        </AnimatedSection>

        <Form simplified mailTo="mc@ttcperformance.cz" />
      </Stack>
      <Footer />
    </>
  );
}

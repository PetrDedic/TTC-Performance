import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import supabase from "@/lib/supabaseClient";
import {
  AspectRatio,
  Card,
  Flex,
  Grid,
  Stack,
  Text,
  Title,
  Image,
  Chip,
  Group,
  Badge,
  Skeleton,
  Container,
  createStyles,
} from "@mantine/core";
import Hero from "@/components/Hero";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import "@mantine/carousel/styles.css";
import classes from "../styles/Index.module.css";

export default function Realizations() {
  const smallWindow = useMediaQuery("(max-width: 1200px)");
  const mobileView = useMediaQuery("(max-width: 768px)");

  const [realizations, setRealizations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photosMap, setPhotosMap] = useState({});

  useEffect(() => {
    fetchCategories();
    fetchRealizations();
  }, []);

  useEffect(() => {
    if (realizations.length > 0) {
      fetchAllPhotos();
    }
  }, [realizations]);

  // Fetch categories
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name_cz", { ascending: true });

    if (error) {
      console.error("Error fetching categories:", error);
    } else {
      setCategories(data);
    }
  };

  // Fetch realizations
  const fetchRealizations = async () => {
    setLoading(true);

    // First get all realizations
    const { data: realizationsData, error: realizationsError } = await supabase
      .from("realizations")
      .select("*")
      .order("realization_date", { ascending: false });

    if (realizationsError) {
      console.error("Error fetching realizations:", realizationsError);
      setLoading(false);
      return;
    }

    // Then get the category relationships
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("realization_categories")
      .select("*");

    if (categoriesError) {
      console.error("Error fetching realization categories:", categoriesError);
      setLoading(false);
      return;
    }

    // Map categories to realizations
    const realizationsWithCategories = realizationsData.map((realization) => {
      const categoryIds = categoriesData
        .filter((rc) => rc.realization_id === realization.id)
        .map((rc) => rc.category_id);

      return {
        ...realization,
        categoryIds,
      };
    });

    setRealizations(realizationsWithCategories);
    setLoading(false);
  };

  // Fetch all photos for all realizations
  const fetchAllPhotos = async () => {
    const realizationIds = realizations.map((r) => r.id);

    // Get all photos for the realizations
    const { data, error } = await supabase
      .from("realization_photos")
      .select("*")
      .in("realization_id", realizationIds)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching photos:", error);
      return;
    }

    // Group photos by realization_id
    const photosGrouped = {};
    data.forEach((photo) => {
      if (!photosGrouped[photo.realization_id]) {
        photosGrouped[photo.realization_id] = [];
      }
      photosGrouped[photo.realization_id].push(photo);
    });

    setPhotosMap(photosGrouped);
  };

  // Filter realizations based on selected categories
  const filteredRealizations =
    selectedCategories.length > 0
      ? realizations.filter((realization) =>
          selectedCategories.some((categoryId) =>
            realization.categoryIds.includes(categoryId)
          )
        )
      : realizations;

  // Format date to Czech locale
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("cs-CZ");
  };

  // Render image or carousel based on available photos
  const renderMedia = (realizationId) => {
    const photos = photosMap[realizationId];

    if (!photos || photos.length === 0) {
      return (
        <AspectRatio ratio={16 / 9} style={{ borderRadius: 4 }}>
          <Skeleton />
        </AspectRatio>
      );
    }

    if (photos.length === 1) {
      return (
        <AspectRatio ratio={16 / 9} style={{ borderRadius: 4 }}>
          <Image
            radius={4}
            src={photos[0].photo_url}
            alt={photos[0].alt_text || "Fotografie realizace"}
            fit="cover"
          />
        </AspectRatio>
      );
    }

    return (
      <Carousel
        withIndicators
        loop
        style={{ borderRadius: 4 }}
        styles={{ viewport: { borderRadius: 4 } }}
      >
        {photos.map((photo) => (
          <Carousel.Slide key={photo.id} style={{ borderRadius: 4 }}>
            <AspectRatio ratio={16 / 9} style={{ borderRadius: 4 }}>
              <Image
                radius={4}
                src={photo.photo_url}
                alt={photo.alt_text || "Fotografie realizace"}
                fit="cover"
                w="100%"
                h="100%"
              />
            </AspectRatio>
          </Carousel.Slide>
        ))}
      </Carousel>
    );
  };

  return (
    <>
      <Head>
        <title>Realizace | TTC Performance</title>
        <meta
          name="description"
          content="Prohlédněte si naše realizace z oblasti automobilového průmyslu. TTC Performance vám přináší ty nejlepší služby s důrazem na kvalitu."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="TTC_WEB_Icon.svg" />
      </Head>

      <Navbar />

      <Hero
        image="/Foty_web_uvodni_hlavni_fotky/Realizace_foto.webp"
        title="Do všech našich realizací dáváme maximální úsilí a proto jsou naši klienti vždy spokojeni."
      />

      <Container size="xl" py={64}>
        <Stack spacing={48}>
          {/* Category filter */}
          <Stack spacing={16}>
            <Title order={2} align="center">
              Filtrovat podle kategorie
            </Title>
            <Chip.Group
              multiple
              value={selectedCategories}
              onChange={setSelectedCategories}
            >
              <Group position="center" spacing={12}>
                {categories
                  .sort((a, b) => a.name_cz.localeCompare(b.name_cz))
                  .map((category) => (
                    <Chip
                      key={category.id}
                      value={category.id}
                      color="blue"
                      variant="outline"
                    >
                      {category.name_cz}
                    </Chip>
                  ))}
              </Group>
            </Chip.Group>
          </Stack>

          {/* Realizations grid */}
          {loading ? (
            <Grid>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Grid.Col key={i} md={6} lg={4}>
                  <Skeleton height={320} radius="md" />
                </Grid.Col>
              ))}
            </Grid>
          ) : (
            <>
              {filteredRealizations.length === 0 ? (
                <Text align="center" size="lg" color="dimmed">
                  Nebyly nalezeny žádné realizace odpovídající vybraným
                  kategoriím.
                </Text>
              ) : (
                <Grid gutter={mobileView ? 16 : 24}>
                  {filteredRealizations.map((realization) => (
                    <Grid.Col
                      span={{ base: 12, sm: 6, md: 4 }}
                      key={realization.id}
                    >
                      <Card
                        shadow="sm"
                        p="lg"
                        radius="md"
                        withBorder
                        h="100%"
                        sx={{ cursor: "pointer" }}
                      >
                        <Card.Section>
                          <AspectRatio ratio={16 / 9}>
                            {renderMedia(realization.id)}
                          </AspectRatio>
                        </Card.Section>

                        <Stack spacing="xs" mt="md">
                          <Text weight={700} size="xl" lineClamp={1} fw={700}>
                            {realization.name}
                          </Text>

                          <Group spacing={8}>
                            {realization.categoryIds.map((categoryId) => {
                              const category = categories.find(
                                (c) => c.id === categoryId
                              );
                              return (
                                category && (
                                  <Badge
                                    key={categoryId}
                                    color="blue"
                                    variant="light"
                                  >
                                    {category.name_cz}
                                  </Badge>
                                )
                              );
                            })}
                          </Group>

                          <Text size="sm" color="dimmed">
                            {formatDate(realization.realization_date)}
                          </Text>

                          <Text lineClamp={3} size="sm">
                            {realization.description || ""}
                          </Text>
                        </Stack>
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              )}
            </>
          )}
        </Stack>
      </Container>

      <Stack
        px={32}
        py={64}
        justify="center"
        align="center"
        maw={1280}
        mx="auto"
        w="100%"
      >
        <Form />
      </Stack>

      <Footer />
    </>
  );
}

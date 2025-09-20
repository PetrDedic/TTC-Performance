// components/LatestRealizations.jsx
import { useState, useEffect } from "react";
import Link from "next/link";
import supabase from "@/lib/supabaseClient";
import {
  AspectRatio,
  Card,
  Grid,
  Stack,
  Text,
  Title,
  Group,
  Badge,
  Skeleton,
  Button,
  Container,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import "@mantine/carousel/styles.css";
import Image from "next/image";

export default function LatestRealizations({
  categoryIds,
  title,
  subText,
  showButton = true,
}) {
  const smallWindow = useMediaQuery("(max-width: 1200px)");
  const mobileView = useMediaQuery("(max-width: 768px)");

  const [realizations, setRealizations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photosMap, setPhotosMap] = useState({});

  useEffect(() => {
    fetchCategories(categoryIds);
    fetchLatestRealizations(categoryIds);
  }, [categoryIds]);

  useEffect(() => {
    if (realizations.length > 0) {
      fetchPhotos();
    }
  }, [realizations]);

  // Fetch categories
  const fetchCategories = async (categoryIds) => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .in("id", categoryIds);
    if (error) {
      console.error("Error fetching categories:", error);
    } else {
      setCategories(data);

      console.log(data);
    }
  };

  // Fetch latest 3 realizations
  const fetchLatestRealizations = async (categoryIds) => {
    setLoading(true);

    // Get latest 3 realizations
    const { data: realizationsData, error: realizationsError } = await supabase
      .from("realizations")
      .select("*, realization_categories!inner(category_id)")
      .order("realization_date", { ascending: false })
      .in("realization_categories.category_id", categoryIds)
      .limit(3);

    console.log(realizationsData);

    if (realizationsError) {
      console.error("Error fetching realizations:", realizationsError);
      setLoading(false);
      return;
    }

    // Get category relationships for these realizations
    const realizationIds = realizationsData.map((r) => r.id);
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("realization_categories")
      .select("*")
      .in("realization_id", realizationIds);

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

  // Fetch photos for realizations
  const fetchPhotos = async () => {
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
        <AspectRatio
          w="100%"
          h="100%"
          ratio={16 / 9}
          style={{ borderRadius: 4 }}
        >
          <Skeleton />
        </AspectRatio>
      );
    }

    if (photos.length === 1) {
      return (
        <AspectRatio
          w="100%"
          h="100%"
          ratio={16 / 9}
          style={{ borderRadius: 4, position: "relative" }}
        >
          <Image
            src={photos[0].photo_url}
            alt={photos[0].alt_text || "Fotografie realizace"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ borderRadius: 4, objectFit: "cover" }}
          />
        </AspectRatio>
      );
    }

    return (
      <Carousel
        withIndicators
        emblaOptions={{
          loop: true,
          align: "center",
        }}
        style={{ borderRadius: 4 }}
        styles={{
          viewport: { borderRadius: 4, height: "100%" },
          container: { height: "100%" },
        }}
      >
        {photos.map((photo) => (
          <Carousel.Slide key={photo.id} style={{ borderRadius: 4 }}>
            <AspectRatio
              w="100%"
              h="100%"
              ratio={16 / 9}
              style={{ borderRadius: 4, position: "relative" }}
            >
              <Image
                src={photo.photo_url}
                alt={photo.alt_text || "Fotografie realizace"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ borderRadius: 4, objectFit: "cover" }}
              />
            </AspectRatio>
          </Carousel.Slide>
        ))}
      </Carousel>
    );
  };

  return (
    <Stack gap={32} w="100%" maw={1280} mx="auto">
      <Stack spacing={8} align="center">
        <Title order={3} fz={32} lh={1} ta="center">
          {title}
        </Title>
        <Text ta="center" size="lg" c="dimmed" maw={700} mx="auto">
          {subText}
        </Text>
      </Stack>

      {loading ? (
        <Grid>
          {[1, 2, 3].map((i) => (
            <Grid.Col key={i} span={{ base: 12, sm: 6, md: 4 }}>
              <Skeleton height={320} radius="md" />
            </Grid.Col>
          ))}
        </Grid>
      ) : realizations.length === 0 ? (
        <Text align="center" size="lg" color="dimmed">
          Žádné realizace k zobrazení.
        </Text>
      ) : (
        <Grid gutter={mobileView ? 16 : 24}>
          {realizations.map((realization) => (
            <Grid.Col key={realization.id} span={{ base: 12, sm: 6, md: 4 }}>
              <Card
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
                h="100%"
                sx={{ cursor: "pointer" }}
              >
                <Card.Section>
                  <AspectRatio w="100%" h="100%" ratio={16 / 9}>
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
                          <Badge key={categoryId} color="blue" variant="light">
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

      {showButton && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link href="/realizace" style={{ textDecoration: "none" }}>
            <Button
              color="#dc1735"
              variant="filled"
              size="compact-xl"
              radius="lg"
              px={32}
            >
              Zobrazit všechny realizace
            </Button>
          </Link>
        </div>
      )}
    </Stack>
  );
}

// Example component showing how to use image sections
import { useState, useEffect } from "react";
import { Image, Grid, AspectRatio, Text, Stack } from "@mantine/core";
import { getImageUrlsForSection } from "@/lib/imageSections";

const ImageSectionExample = ({ sectionKey, title }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const imageUrls = await getImageUrlsForSection(sectionKey);
      setImages(imageUrls);
      setLoading(false);
    };

    fetchImages();
  }, [sectionKey]);

  if (loading) {
    return <Text>Načítání obrázků...</Text>;
  }

  if (images.length === 0) {
    return <Text>Žádné obrázky nebyly nalezeny pro sekci "{sectionKey}"</Text>;
  }

  return (
    <Stack gap={16}>
      {title && (
        <Text size="lg" fw={500}>
          {title}
        </Text>
      )}
      <Grid>
        {images.map((imageUrl, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <AspectRatio ratio={16 / 9}>
              <Image
                src={imageUrl}
                alt={`Obrázek ${index + 1}`}
                fit="cover"
                radius="md"
              />
            </AspectRatio>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
};

export default ImageSectionExample;

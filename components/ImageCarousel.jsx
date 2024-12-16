import { Carousel } from "@mantine/carousel";
import { AspectRatio, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import classes from "../styles/Index.module.css";

export default function ImageCarousel({ carouselImages, title }) {
  const smallWindow = useMediaQuery("(max-width: 1200px)");
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={close}
        title={title}
        size="100%"
        styles={{ body: { minHeight: "80%" } }}
      >
        <AspectRatio
          mx="auto"
          ratio={16 / 9}
          style={{
            position: "relative",
            borderRadius: 16,
            aspectRatio: "16 / 9",
            maxHeight: "80vh",
          }}
        >
          <Carousel
            w="100%"
            withIndicators
            style={{
              borderRadius: 16,
              aspectRatio: "16 / 9",
              maxHeight: "80vh",
            }}
            loop
            align="start"
          >
            {carouselImages.map((img) => (
              <Carousel.Slide key={img}>
                <AspectRatio
                  ratio={16 / 9}
                  style={{
                    position: "relative",
                    borderRadius: 16,
                    aspectRatio: "16 / 9",
                    maxHeight: "80vh",
                  }}
                >
                  <Image
                    quality={100}
                    src={img}
                    alt={`${img} alt`}
                    fill
                    sizes="100vw"
                    style={{ borderRadius: 16 }}
                  />
                </AspectRatio>
              </Carousel.Slide>
            ))}
          </Carousel>
        </AspectRatio>
      </Modal>
      <Stack align="center" justify="center" gap={24} w="100%">
        <Title order={2} fz={32} ta="center" lh={1}>
          {title}
        </Title>
        <Carousel
          w="100%"
          withIndicators
          height={320}
          slideSize={{ base: "100%", sm: "33.333333%" }}
          slideGap={smallWindow ? 16 : 48}
          loop
          align="start"
          classNames={classes}
        >
          {carouselImages.map((img) => (
            <Carousel.Slide key={img}>
              <AspectRatio
                ratio={16 / 9}
                style={{ position: "relative", borderRadius: 16 }}
                h="100%"
                onClick={open}
              >
                <Image
                  quality={100}
                  src={img}
                  alt={`${img} alt`}
                  fill
                  sizes="100vw"
                  style={{ borderRadius: 16 }}
                />
              </AspectRatio>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Stack>
    </>
  );
}

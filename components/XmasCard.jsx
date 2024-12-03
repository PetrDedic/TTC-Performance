import {
  AspectRatio,
  Card,
  Flex,
  Image,
  List,
  Stack,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";

export default function XmasCard() {
  const smallWindow = useMediaQuery("(max-width: 1280px)");

  return (
    <Card
      style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 15px" }}
      w={smallWindow ? "80vw" : "60vw"}
      mx="auto"
      mb={72}
      radius={16}
      px={32}
      py={24}
    >
      <Flex gap={64} direction={smallWindow ? "column" : "row"} align="center">
        <Stack w="100%" justify="space-between" h="100%">
          <Text fz={20} fw={700} c="#e84048">
            Darujte svým nejbližším pod stromeček dárkový poukaz od TTC
            Performance!
          </Text>
          <List withPadding>
            <List.Item>Platí pouze pro softwarovou úpravu</List.Item>
            <List.Item>
              Poukazy lze zakoupit u nás na adrese Kotojedy 110 a nebo po
              telefonické domluvě i jinak
            </List.Item>
            <List.Item>
              Hodnota poukazů je 3 000, 5 000, 7 000, 10 000, a 15 000 Kč
            </List.Item>
          </List>
          <Text>
            Pro více informací nás kontaktujte na{" "}
            <Link
              href="tel:+420 602 562 650"
              style={{
                fontWeight: 700,
                color: "black",
              }}
            >
              +420 602 562 650
            </Link>
            .
          </Text>
        </Stack>

        <AspectRatio
          ratio={1400 / 1000}
          w="100%"
          h="100%"
          style={{
            position: "relative",
            borderRadius: 16,
          }}
        >
          <Image
            quality={100}
            src="/Fotky_WEBP/Darkovy_poukaz_web.webp"
            alt="/Fotky_WEBP/Darkovy_poukaz_web.webp"
            fill
            sizes="100vw"
            style={{ borderRadius: 16, objectFit: "cover" }}
          />
        </AspectRatio>
      </Flex>
    </Card>
  );
}

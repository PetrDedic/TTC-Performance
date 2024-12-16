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
    <Card mx="auto" radius={16} bg="none" p={0} style={{ overflow: "visible" }}>
      <Flex
        gap={smallWindow ? 24 : 64}
        direction={smallWindow ? "column" : "row"}
        align="center"
        style={{ overflow: "visible" }}
      >
        <Flex
          gap={16}
          w="100%"
          h="100%"
          direction={smallWindow ? "column" : "row"}
          style={{ overflow: "visible" }}
        >
          <Stack
            w="100%"
            px={16}
            py={32}
            gap={24}
            align="center"
            bg="white"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 15px",
              borderRadius: 32,
            }}
          >
            <Stack gap={0} align="center" w="100%">
              <Text fz={24} fw={700} ta="center">
                Dárkové poukazy
              </Text>
              <Text ta="center" fz={14} w="100%">
                V hodnotě{" "}
                <Text span style={{ textWrap: "nowrap" }} fz={14}>
                  10 000
                </Text>{" "}
                &{" "}
                <Text span style={{ textWrap: "nowrap" }} fz={14}>
                  15 000 Kč.
                </Text>
              </Text>
            </Stack>

            <AspectRatio
              ratio={1350 / 1000}
              w="100%"
              h="100%"
              style={{
                position: "relative",
                borderRadius: 16,
              }}
            >
              <Image
                quality={100}
                src="/Fotky_WEBP/Darkove_poukazy_v1.webp"
                alt="/Fotky_WEBP/Darkove_poukazy_v1.webp"
                fill
                sizes="100vw"
                style={{ borderRadius: 16, objectFit: "cover" }}
              />
            </AspectRatio>
          </Stack>
          <Stack
            w="100%"
            px={16}
            py={32}
            gap={24}
            align="center"
            bg="white"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 15px",
              borderRadius: 32,
            }}
          >
            <Stack gap={0} align="center" w="100%">
              <Text fz={24} fw={700} ta="center">
                Dárkové poukazy
              </Text>
              <Text ta="center" fz={14}>
                V hodnotě{" "}
                <Text span style={{ textWrap: "nowrap" }} fz={14}>
                  3 000,
                </Text>{" "}
                <Text span style={{ textWrap: "nowrap" }} fz={14}>
                  5 000
                </Text>{" "}
                &{" "}
                <Text span style={{ textWrap: "nowrap" }} fz={14}>
                  7 000 Kč.
                </Text>
              </Text>
            </Stack>

            <AspectRatio
              ratio={1350 / 1000}
              w="100%"
              h="100%"
              style={{
                position: "relative",
                borderRadius: 16,
              }}
            >
              <Image
                quality={100}
                src="/Fotky_WEBP/Darkove_poukazy_v2.webp"
                alt="/Fotky_WEBP/Darkove_poukazy_v2.webp"
                fill
                sizes="100vw"
                style={{ borderRadius: 16, objectFit: "cover" }}
              />
            </AspectRatio>
          </Stack>
        </Flex>
        <Stack w="100%" justify="space-between" h="100%">
          <Text fz={32} fw={700} lh={1.25}>
            Darujte svým nejbližším dárkový poukaz!
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
          <Text fz={24}>
            Pro více informací nás kontaktujte{" "}
            <Text
              span
              fz={24}
              style={{
                textWrap: "nowrap",
                color: "black",
              }}
            >
              na{" "}
              <Link
                href="tel:+420 602 562 650"
                style={{
                  fontWeight: 700,
                  color: "black",
                  textWrap: "nowrap",
                }}
              >
                +420 602 562 650
              </Link>
              .
            </Text>
          </Text>
        </Stack>
      </Flex>
    </Card>
  );
}

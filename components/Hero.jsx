import { Card, Flex, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";

const Hero = ({ image, title, subText }) => {
  const smallWindow = useMediaQuery("(max-width: 1200px)");

  return (
    <Stack gap={0} w="100%">
      <Card
        radius={0}
        w="100%"
        px={16}
        py="15vh"
        mah={600}
        style={{
          background: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Stack gap={48} align="center" justify="center">
          <Stack direction="column" align="center" gap={24}>
            <Text
              fz={smallWindow ? 16 : 20}
              fw={100}
              c="white"
              lts={2}
              ta="center"
            >
              TTC PERFORMANCE
            </Text>
            <Title
              maw={960}
              order={1}
              c="white"
              ta="center"
              fz={smallWindow ? 32 : 48}
              lh={1.25}
            >
              {title}
            </Title>
            {subText && <>{subText}</>}
          </Stack>
        </Stack>
      </Card>
      <Flex
        w="100%"
        bg="#e84048"
        align="center"
        justify="center"
        gap={smallWindow ? 4 : 16}
        p={8}
      >
        <Text
          c="white"
          tt="uppercase"
          fw={700}
          lts={smallWindow ? 0.75 : 1}
          fz={smallWindow ? 12 : 16}
        >
          ODBORNÉ ÚPRAVY
        </Text>
        <Text
          c="white"
          tt="uppercase"
          fw={700}
          lts={smallWindow ? 0.75 : 1}
          fz={smallWindow ? 12 : 16}
        >
          -
        </Text>
        <Text
          c="white"
          tt="uppercase"
          fw={700}
          lts={smallWindow ? 0.75 : 1}
          fz={smallWindow ? 12 : 16}
        >
          RYCHLOST
        </Text>
        <Text
          c="white"
          tt="uppercase"
          fw={700}
          lts={smallWindow ? 0.75 : 1}
          fz={smallWindow ? 12 : 16}
        >
          -
        </Text>
        <Text
          c="white"
          tt="uppercase"
          fw={700}
          lts={smallWindow ? 0.75 : 1}
          fz={smallWindow ? 12 : 16}
        >
          ZÁRUKA NA SLUŽBY
        </Text>
      </Flex>
    </Stack>
  );
};

export default Hero;

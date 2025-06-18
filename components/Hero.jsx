import { Card, Flex, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const Hero = ({ image, title, buttons }) => {
  const smallWindow = useMediaQuery("(max-width: 1200px)");
  const { route } = useRouter();

  return (
    <Stack gap={0} w="100%">
      <Head>
        <link rel="preload" href={image} as="image" fetchPriority="high" />
      </Head>
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
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {route === "/mc-performance" ? (
                <Image
                  src="/MC_logo_bile.svg"
                  alt="MC Performance logo"
                  width={210}
                  height={69}
                  quality={100}
                  priority
                  style={{
                    objectFit: "contain",
                  }}
                />
              ) : route === "/" ? (
                <Flex align="center" justify="center" gap={32}>
                  <Image
                    src="/TTC_new_logo.svg"
                    alt="TTC Performance logo"
                    width={240}
                    height={69}
                    quality={100}
                    priority
                    style={{
                      objectFit: "contain",
                    }}
                  />
                  <Image
                    src="/MC_logo_bile.svg"
                    alt="MC Performance logo"
                    width={200}
                    height={69}
                    quality={100}
                    priority
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </Flex>
              ) : null}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
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
            </motion.div>

            {buttons && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {buttons}
              </motion.div>
            )}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default Hero;

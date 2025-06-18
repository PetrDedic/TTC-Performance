import Link from "next/link";
import styles from "./Footer.module.css";
import { Divider, Flex, Text } from "@mantine/core";
import Image from "next/image";

const Footer = () => {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.image}>
        <div className={styles.flex}>
          <div className={styles.map}>
            <iframe
              src="https://frame.mapy.cz/s/cojetuvuvo"
              width="100%"
              height="100%"
              frameBorder="0"
            ></iframe>
          </div>
          <div className={styles.text}>
            <p className={styles.name}>TTC Performance s. r. o.</p>
            <p>
              Kotojedy 110
              <br />
              76701 Kroměříž
            </p>
            <p>
              <span style={{ fontWeight: 700 }}>Kontaktní osoby:</span>
              <br />
              Jednatel a Technické oddělení
              <br />
              Vlastimil Okálek -{" "}
              <a style={{ color: "white" }} href="tel:+420604892755">
                604 892 755
              </a>
              <br />
              <br />
              Ekonomické oddělení
              <br />
              Ing. Pavla Okálková -{" "}
              <a style={{ color: "white" }} href="tel:+420724226468">
                724 226 468
              </a>
              <br />
              <br />
              Obchodní zástupce
              <br />
              Luděk Zapletal -{" "}
              <a style={{ color: "white" }} href="tel:+420725084680">
                725 084 680
              </a>
            </p>
          </div>
        </div>
        <Flex
          justify="center"
          align="center"
          gap="32px 72px"
          direction={{ base: "column", sm: "row" }}
        >
          <Flex gap={16} align="center">
            <Link
              href="https://www.facebook.com/ttcperformance"
              style={{
                color: "inherit",
                textDecoration: "inherit",
                width: 32,
                height: 32,
              }}
            >
              <Image
                height={32}
                width={32}
                src="\iconmonstr-facebook-3.svg"
                alt="fb logo"
              />
            </Link>
            <Link
              href="https://www.instagram.com/ttc_performance/"
              style={{
                color: "inherit",
                textDecoration: "inherit",
                width: 32,
                height: 32,
              }}
            >
              <Image
                height={32}
                width={32}
                src="\iconmonstr-instagram-11.svg"
                alt="ig logo"
              />
            </Link>
            <Divider orientation="vertical" />
            <Image
              src="/TTC_new_logo.svg"
              alt="TTC Performance logo"
              width={200 / 1.5}
              height={69 / 1.5}
              quality={100}
              priority
              style={{
                objectFit: "contain",
              }}
            />
          </Flex>

          <Flex
            gap={16}
            align="center"
            direction={{ base: "row-reverse", sm: "row" }}
          >
            <Image
              src="/MC_logo_bile.svg"
              alt="MC Performance logo"
              width={200 / 1.5}
              height={69 / 1.5}
              quality={100}
              priority
              style={{
                objectFit: "contain",
              }}
            />
            <Divider orientation="vertical" />
            <Link
              href="https://www.facebook.com/mcperformancecz"
              style={{
                color: "inherit",
                textDecoration: "inherit",
                width: 32,
                height: 32,
              }}
            >
              <Image
                height={32}
                width={32}
                src="\iconmonstr-facebook-3.svg"
                alt="fb logo"
              />
            </Link>
            <Link
              href="https://www.instagram.com/mc_performance_cz/"
              style={{
                color: "inherit",
                textDecoration: "inherit",
                width: 32,
                height: 32,
              }}
            >
              <Image
                height={32}
                width={32}
                src="\iconmonstr-instagram-11.svg"
                alt="ig logo"
              />
            </Link>
          </Flex>
        </Flex>
        <Text ta="center" fz="sm" c="white">
          Společnost je zapsaná v obchodním rejstříku vedeném u Krajského soudu
          v Brně, spisová značka C 125704.
        </Text>
      </div>
      <div className={styles.paryn}>
        <Link
          href="/gdpr"
          style={{
            color: "black",
            fontSize: 16,
            textDecoration: "underline",
          }}
        >
          Ochrana osobních údajů
        </Link>
        <p style={{ marginBottom: "0.25rem", marginTop: "1rem" }}>
          IČO: 11991356 | DIČ: CZ11991356
        </p>
        <p style={{ marginBottom: "0.25rem" }}>
          TTC Performance s. r. o., Cimburk 563, 768 33 Morkovice-Slížany, +420
          604 892 755
        </p>
        <p style={{ fontWeight: "600" }}>
          Designed by:{" "}
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            href="https://www.paryndesign.cz/"
            rel="noopener noreferrer"
            target="_blank"
          >
            paryn design
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

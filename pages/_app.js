import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    document.getElementById("top").scrollIntoView();
  }, [router.asPath]);

  return (
    <>
      <Head>
        <link rel="icon" href="TTC_WEB_Icon.svg" />
        <title>TTC Performance</title>
        <meta
          name="description"
          content="TTC Performance - Odborný a profesionální chiptuning. Řešíme problémy s emisními systémy SCR (AdBlue), DPF, EGR, úpravy řídících jednotek motorů a automatických převodovek. Nákladní vozidla, Zemědělská, Stavební a Lesní technika, Osobní vozidla a Autobusy."
        />
        <meta
          name="keywords"
          content="chiptuning, emisní systémy, DPF, EGR, řídící jednotky, automatické převodovky, nákladní vozidla, zemědělská technika, stavební technika, lesní technika, osobní vozidla, autobusy"
        />
        <meta name="author" content="TTC Performance s.r.o." />
        <meta property="og:title" content="TTC Performance" />
        <meta
          property="og:description"
          content="TTC Performance - Odborný a profesionální chiptuning. Řešíme problémy s emisními systémy SCR (AdBlue), DPF, EGR, úpravy řídících jednotek motorů a automatických převodovek. Nákladní vozidla, Zemědělská, Stavební a Lesní technika, Osobní vozidla a Autobusy."
        />
        <meta property="og:image" content="/nahled_obrazek_web.webp" />
        <meta property="og:url" content="https://www.ttcperformance.cz" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="og:site_name" content="TTC Performance" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="TTC Performance Logo" />
        <meta property="og:image:type" content="image/webp" />
      </Head>
      <ColorSchemeScript forceColorScheme="light" />
      <MantineProvider
        theme={{
          fontFamily: "Roboto, sans-serif",
        }}
        forceColorScheme="light"
      >
        <ModalsProvider>
          <Notifications />
          <Component {...pageProps} />
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}

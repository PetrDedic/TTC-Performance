import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    document.getElementById("top").scrollIntoView();
  }, [router.asPath]);
  useEffect(() => {
    setTimeout(() => {
      document.getElementById("spin-cont").classList.add("hidden");
    }, 2000);
  }, []);

  return (
    <>
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

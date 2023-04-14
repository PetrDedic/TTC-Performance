import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
      <Component {...pageProps} />
    </>
  );
}

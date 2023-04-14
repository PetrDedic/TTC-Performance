import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    var scrollToTop = window.setInterval(function () {
      var pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
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

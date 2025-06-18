import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.navbar}>
      <img
        src="/TTC_new_logo.svg"
        alt="Logo"
        onClick={() => router.push("/")}
        style={{ padding: "16px", marginLeft: "16px" }}
      />
      <div className={styles.links}>
        <Link href="/" className={router.pathname == "/" ? styles.active : ""}>
          Úvod
        </Link>
        <Link
          href="/sluzby"
          className={router.pathname.includes("/sluzby") ? styles.active : ""}
        >
          Služby
        </Link>
        <Link
          href="/mc-performance"
          className={router.pathname == "/mc-performance" ? styles.active : ""}
        >
          MC Performance
        </Link>
        <Link
          href="/cenik"
          className={router.pathname == "/cenik" ? styles.active : ""}
        >
          Ceník
        </Link>
        <Link
          href="/realizace"
          className={router.pathname == "/realizace" ? styles.active : ""}
        >
          Realizace
        </Link>
        <Link
          href="/vozidla"
          className={router.pathname.includes("/vozidla") ? styles.active : ""}
        >
          Značky vozidel
        </Link>
        <Link
          href="#contact"
          onClick={() => setOpen(false)}
          className={router.pathname == "/kontakt" ? styles.active : ""}
        >
          Kontakt
        </Link>
      </div>
      <svg
        className={open ? styles.open : ""}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        onClick={() => setOpen(!open)}
      >
        <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
      </svg>
      <div className={`${styles.menu} ${open ? styles.open : ""}`}>
        <Link href="/" className={router.pathname == "/" ? styles.active : ""}>
          Úvod
        </Link>
        <Link
          href="/sluzby"
          className={router.pathname == "/sluzby" ? styles.active : ""}
        >
          Služby
        </Link>
        <Link
          href="/mc-performance"
          className={router.pathname == "/mc-performance" ? styles.active : ""}
        >
          MC Performance
        </Link>
        <Link
          href="/cenik"
          className={router.pathname == "/cenik" ? styles.active : ""}
        >
          Ceník
        </Link>
        <Link
          href="/realizace"
          className={router.pathname == "/realizace" ? styles.active : ""}
        >
          Realizace
        </Link>
        <Link
          href="/vozidla"
          className={router.pathname == "/vozidla" ? styles.active : ""}
        >
          Značky vozidel
        </Link>
        <Link
          href="#contact"
          onClick={() => setOpen(false)}
          className={router.pathname == "/contact" ? styles.active : ""}
        >
          Kontakt
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

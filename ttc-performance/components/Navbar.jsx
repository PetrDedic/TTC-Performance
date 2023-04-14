import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const StyledNavbar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 5rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 999;

  background-color: #101c24cc;
  backdrop-filter: blur(10px);
  svg {
    display: none;
  }

  img {
    max-width: 75vw;
    object-fit: contain;
    cursor: pointer;
  }
  @media (max-width: 1400px) {
    svg {
      display: unset;
      height: 32px;
      align-self: center;
      margin: 2rem;
      fill: white;
      transition: 250ms;

      &:hover {
        fill: #ffffff75;
      }
    }
  }

  .links {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    padding: 0 3rem;
    align-items: center;
    justify-content: center;

    @media (max-width: 1400px) {
      display: none;
    }

    a {
      font-size: 1rem;
      font-weight: bold;
      color: white;
      text-decoration: none;
      padding: 0.25rem 0.5rem;
      transition: 250ms;

      &.active {
        border-bottom: 4px solid #e84048;
      }

      &:hover {
        opacity: 1 !important;
      }
    }

    &:hover {
      a {
        opacity: 0.25;
      }
    }
  }

  .menu {
    z-index: 99;

    top: 5rem;
    left: 105vw;
    transition: 250ms;
    &.open {
      left: 0;
    }
    position: absolute;
    height: calc(100vh - 5rem);
    width: 100vw;
    background-color: #101c24cc;
    backdrop-filter: blur(10px);

    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    gap: 1rem;

    a {
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
      text-decoration: none;
    }
  }
`;

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <StyledNavbar>
      <img
        src="..\..\media\Premium Package\Logos (Vector Format)\Transparent White.svg"
        alt="Logo"
        onClick={() => router.push("/")}
      />
      <div className="links">
        <Link href="/" className={router.pathname == "/" ? "active" : ""}>
          Úvod
        </Link>
        <Link
          href="/sluzby"
          className={router.pathname == "/sluzby" ? "active" : ""}
        >
          Služby
        </Link>
        <Link
          href="/cenik"
          className={router.pathname == "/cenik" ? "active" : ""}
        >
          Ceník
        </Link>
        <Link
          href="/realizace"
          className={router.pathname == "/realizace" ? "active" : ""}
        >
          Realizace
        </Link>
        <Link
          href="/vozidla"
          className={router.pathname.includes("/vozidla") ? "active" : ""}
        >
          Značky vozidel
        </Link>
        <Link
          href="/#contact"
          onClick={() => setOpen(false)}
          className={router.pathname == "/kontakt" ? "active" : ""}
        >
          Kontakt
        </Link>
      </div>
      <svg
        className={open ? "open" : ""}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        onClick={() => setOpen(!open)}
      >
        <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
      </svg>
      <div className={open ? "open menu" : "menu"}>
        <Link href="/" className={router.pathname == "/" ? "active" : ""}>
          Úvod
        </Link>
        <Link
          href="/sluzby"
          className={router.pathname == "/sluzby" ? "active" : ""}
        >
          Služby
        </Link>
        <Link
          href="/cenik"
          className={router.pathname == "/cenik" ? "active" : ""}
        >
          Ceník
        </Link>
        <Link
          href="/realizace"
          className={router.pathname == "/realizace" ? "active" : ""}
        >
          Realizace
        </Link>
        <Link
          href="/vozidla"
          className={router.pathname == "/vozidla" ? "active" : ""}
        >
          Značky vozidel
        </Link>
        <Link
          href="#contact"
          onClick={() => setOpen(false)}
          className={router.pathname == "/contact" ? "active" : ""}
        >
          Kontakt
        </Link>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;

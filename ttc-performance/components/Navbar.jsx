import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const StyledNavbar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 8rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 999;

  background-color: #101c24cc;

  .links {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    padding: 0 3rem;
    align-items: center;
    justify-content: center;

    a {
      font-size: 1.5rem;
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
`;

const Navbar = () => {
  const router = useRouter();

  return (
    <StyledNavbar>
      <img
        src="media\Premium Package\Logos (Vector Format)\Transparent White.svg"
        alt="Logo"
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
          className={router.pathname == "/vozidla" ? "active" : ""}
        >
          Značky vozidel
        </Link>
        <Link
          href="/kontakt"
          className={router.pathname == "/kontakt" ? "active" : ""}
        >
          Kontakt
        </Link>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;

import Thirty from "@/components/30days";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Form from "@/components/Form";
import FourGrid from "@/components/FourGrid";
import Navbar from "@/components/Navbar";
import Params from "@/components/Params";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";

const StyledSluzby = styled.main`
  width: 100%;
  height: auto;
  min-height: 100vh;

  color: #101c24;

  .hero {
    margin-bottom: 8rem;
    width: 100vw;
    height: 50vh;

    background-image: url("/Foty_web_uvodni_hlavni_fotky/Sluzby_foto.webp");
    background-size: cover;
    background-position: 75%;

    display: flex;
    align-content: center;
    justify-content: center;

    color: white;

    div {
      align-self: center;
      text-align: center;

      h1 {
        font-size: 4rem;
        font-weight: bolder;
        line-height: 4.75rem;

        @media (max-width: 1280px) {
          font-size: 3rem;
        }
        @media (max-width: 600px) {
          font-size: 2rem;
        }
      }
      p {
        font-size: 2rem;
        font-weight: 100;

        @media (max-width: 1280px) {
          font-size: 1.5rem;
          letter-spacing: 0;
        }
        @media (max-width: 600px) {
          font-size: 1.5rem;
        }
      }
    }
  }

  section {
    max-width: 1280px;

    @media (max-width: 1400px) {
      max-width: 75vw;
    }

    margin: auto;
    display: flex;
    flex-direction: column;

    h2 {
      font-size: 2rem;
      font-weight: 700;
    }

    &.text {
      gap: 2rem;
      font-size: 1.25rem;
      margin-bottom: 4rem;
      ul {
        padding-left: 1rem;
        list-style-type: "- ";
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }

    &.warn {
      margin-bottom: 4rem;
      text-align: center;
      font-size: 14px;
    }

    &.grid {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-bottom: 4rem;
      @media (max-width: 1280px) {
        flex-direction: column;
      }

      & > .card {
        width: calc(50% - 2rem);
        @media (max-width: 1280px) {
          width: calc(100% - 2rem);
        }
        margin: 1rem;
        aspect-ratio: 16/9;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: end;
        padding: 2rem;
        color: white;
        background-size: cover;
        background-position: center;
        position: relative;
        border-radius: 1rem;

        transition: 500ms ease-in-out;
        &:hover {
          transform: scale(1.025);
        }
      }

      & > .card::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 1rem;
      }

      h3,
      p,
      a {
        position: relative;
        z-index: 1;
      }

      h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 1.2rem;
        margin-bottom: 1rem;
      }

      a {
        background: #e84048;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        text-decoration: none;
        transition: 250ms;
        width: 10rem;
        text-align: center;

        &:hover {
          background: white;
          color: #e84048;
        }
      }
    }
  }
`;

export const TwoOneSection = styled.section`
  max-width: 75vw;
  margin: auto;
  display: flex;
  flex-direction: row !important;
  gap: 4rem;
  justify-content: center;
  align-content: center;
  margin-bottom: 4rem !important;
  @media (max-width: 1280px) {
    flex-direction: column !important;
  }

  img {
    height: 100%;
    max-height: 50vh;
    width: 100%;
    object-fit: cover;
    border-radius: 1rem;
    max-width: 50%;

    @media (max-width: 1280px) {
      max-width: 100%;
    }
  }

  .text-area {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-content: center;
    font-size: 1.25rem;

    h2 {
      font-size: 2rem;
      font-weight: 700;
    }

    ul {
      list-style-type: "- ";
      padding-left: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  a {
    font-size: 16px;
    margin-top: 1rem;
    background: #e84048;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    text-decoration: none;
    transition: 250ms;
    border: 1px solid #e84048;
    width: 10rem;
    text-align: center;

    &:hover {
      background: none;
      color: #e84048;
    }
  }
`;

const cardData = [
  {
    img: "/nove/Fotky_mereni_vykonu/4_mereni_vykonu.webp",
  },
  {
    img: "/nove/Fotky_mereni_vykonu/2_mereni_vykonu.webp",
  },
  {
    img: "/nove/Fotky_mereni_vykonu/3_mereni_vykonu.webp",
  },
  {
    img: "/nove/Fotky_mereni_vykonu/1_mereni_vykonu.webp",
  },
];

const Sluzby = () => {
  return (
    <>
      <Head>
        <title>TTC Performance</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="/media/Premium Package/Logos (Vector Format)/Transparent.svg"
        />
      </Head>
      <Navbar />
      <StyledSluzby>
        <div className="hero">
          <div>
            <h1>NAŠE SLUŽBY</h1>
            <span style={{ color: "#e84048", fontSize: 20 }}>
              Na co se specializujeme?
            </span>
          </div>
        </div>
        <section className="text">
          <h2>4x4 Válcová zkušebna výkonu</h2>
          <p>
            Řada HP je nejvýkonnějším podvozkovým dynamometrem Bapro. Čtyři
            všechny spojené válce o průměru 400 mm na každou nápravu zaručují
            špičkovou opakovatelnost a přesnost.
          </p>
          <p>
            Elektronicky propojené a synchronizované nápravy prostřednictvím
            softwaru, vytvořené rychlým a přesným vysokofrekvenčním řízením brzd
            s vířivými proudy, s cílem synchronizovat nápravy ve voze 4wd
            (patentovaný systém Bapro).
          </p>
          <p>
            Tato funkce zabraňuje jakémukoli poškození diferenciálů a pomáhá
            provádět přesnější testy, protože je také zabráněno plýtvání výkonem
            kvůli prokluzování uvnitř diferenciálů.
          </p>
        </section>
        <TwoOneSection>
          <img
            src="/nove/Fotky_mereni_vykonu/5_mereni_vykonu.webp"
            alt="auto"
          />
          <div className="text-area">
            <h2>Základní informace</h2>
            <ul>
              <li>Maximální rychlost 360 km/h</li>
              <li>Maximální měřitelný výkon 2 000 HP</li>
              <li>Maximální absorbovatelný výkon 1 300 HP</li>
              <li>Maximální tažná síla 3 200 Nm</li>
            </ul>
          </div>
        </TwoOneSection>
        <section className="text">
          <h2>AGRO DYNO - Měření výkonu</h2>
          <p>
            Mobilní dynamometr pro měření výkonu traktorů přes vývodový hřídel
            PTO. Maximální měřitelný výkon je do 450 Hp a 2 000 Nm.
          </p>
        </section>
        <TwoOneSection>
          <img
            src="/nove/Fotky_mereni_vykonu/2_mereni_vykonu.webp"
            alt="auto"
          />
          <div className="text-area">
            <h2>Zkušební lhůta</h2>
            <p>
              Zdarma 30 dní zkušební lhůta,
              <br />
              na námi provedenou optimalizaci výkonu.
            </p>
            <Link href="#form">Kontaktujte nás</Link>
          </div>
        </TwoOneSection>
        <Params />
        <section className="text" style={{ marginTop: 64 }}>
          <h2>Pronájem zkušebny</h2>
          <ul>
            <li>Možnost pronájmu zkušebny pro své vlastní účely.</li>
            <li>Cena pronájmu je od 2 699 Kč na hodinu bez DPH.</li>
            <li>Po celou dobu s technikem, který zkušebnu bude obsluhovat.</li>
          </ul>
        </section>
        <FourGrid cards={cardData} />
        <Form />
      </StyledSluzby>
      <Footer />
    </>
  );
};

export default Sluzby;

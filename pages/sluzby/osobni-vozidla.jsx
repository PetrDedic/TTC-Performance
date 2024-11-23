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
`;

const Styled6 = styled.div`
  margin: auto;
  margin-top: 6rem;
  margin-bottom: 6rem;
  max-width: 1280px;
  width: 75vw;
  display: flex;
  flex-direction: column;
  gap: 4rem;

  a {
    width: 10rem;
    text-align: center;
    background: #e84048;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    text-decoration: none;
    transition: 250ms;
    border: 1px solid #e84048;

    &:hover {
      background: none;
      color: #e84048;
    }
  }

  .flexbox {
    justify-content: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem 2rem;
  }

  .flexbox {
    justify-content: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .card {
    width: calc(33.3333% - 2rem);
    @media (max-width: 1280px) {
      width: calc(50% - 1rem);
    }
    @media (max-width: 720px) {
      width: 100%;
    }
    transition: 500ms ease-in-out;
    &:hover {
      transform: scale(1.025);
    }
    aspect-ratio: 1;
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    h4 {
      margin: 0.5rem 0;
    }

    p {
      margin: 0.5rem 0;
    }

    .price {
      color: red;
      font-weight: bold;
    }
  }
`;

export const SixGrid = ({ cards }) => {
  return (
    <Styled6>
      <h2 style={{ textAlign: "center" }}>Oblíbené služby našich zákazníků</h2>
      <div className="flexbox">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <h4>{card.title}</h4>
            <p>{card.description}</p>
            <p className="price">{card.price}</p>
          </div>
        ))}
      </div>
      <div className="flexbox">
        <Link href="#form">Kontaktujte nás</Link>
        <Link href="/sluzby">Více služeb</Link>
      </div>
    </Styled6>
  );
};

const Sluzby = () => {
  const cardData = [
    {
      img: "/nove/Fotky_osobni_vozidla/1_osobni_vozidla.webp",
    },
    {
      img: "/nove/Fotky_osobni_vozidla/3_osobni_vozidla.webp",
    },
    {
      img: "/nove/Fotky_osobni_vozidla/4_osobni_vozidla.webp",
    },
    {
      img: "/nove/Fotky_osobni_vozidla/5_osobni_vozidla.webp",
    },
  ];

  const cards = [
    {
      title: "Chiptuning s měřením výkonu",
      description:
        "Využijte potenciál svého vozidla na maximum pomocí optimalizace výkonu.",
      price: "Cena od 5 000,-",
    },
    {
      title: "Deaktivace systému SCR (AdBlue)",
      description:
        "Snižte své provozní náklady za opravy systému SCR (AdBlue).",
      price: "Cena od 5 000,-",
    },
    {
      title: "Deaktivace systému DPF",
      description:
        "Snižte své provozní náklady za opravy pomocí deaktivace systému DPF.",
      price: "Cena od 5 000,-",
    },
    {
      title: "Softwarová úprava automatických převodovek",
      description:
        "Optimalizací softwaru docílíme efektivnějšího fungování převodovky dle požadavků zákazníka.",
      price: "Cena od 5 000,-",
    },
    {
      title: "Vypnutí systému start-stop",
      description: "Trvalé vypnutí funkce start-stop.",
      price: "Cena od 4 000,-",
    },
    {
      title: "Deaktivace systému EGR",
      description:
        "Vyhnete se negativním vlivům, které může způsobit systém EGR, svou špatnou funkcí.",
      price: "Cena od 3 000,-",
    },
  ];

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
        <TwoOneSection>
          <img
            src="/nove/Fotky_osobni_vozidla/2_osobni_vozidla.webp"
            alt="auto"
          />
          <div className="text-area">
            <h2>
              S využitím naších služeb, Vaše osobní vozidlo dosáhne zcela jiných
              rozměrů!
            </h2>
          </div>
        </TwoOneSection>
        <SixGrid cards={cards} />
        <Params />
        <Thirty />
        <FourGrid cards={cardData} />
        <Form />
      </StyledSluzby>
      <Footer />
    </>
  );
};

export default Sluzby;

import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const StyledSluzby = styled.main`
  background-image: url("./Web_pozadi.svg");
  background-size: cover;
  background-position: top;

  width: 100%;
  height: auto;
  min-height: 100vh;

  color: #101c24;

  .hero {
    margin-bottom: 8rem;
    width: 100vw;
    height: 50vh;

    background-image: url("./Foty_web_uvodni_hlavni_fotky/Sluzby_foto.webp");
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
    max-width: 75vw;
    margin: auto;
    display: flex;
    flex-direction: column;

    h2 {
      font-size: 2rem;
      font-weight: 700;
    }

    &.text {
      max-width: 1280px;

      @media (max-width: 1400px) {
        max-width: 75vw;
      }

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
      max-width: 1280px;
      @media (max-width: 1400px) {
        max-width: 75vw;
      }
      margin-bottom: 4rem;
      text-align: center;
      font-size: 14px;
    }

    &.grid {
      max-width: 1280px;
      @media (max-width: 1400px) {
        max-width: 75vw;
      }
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
          aspect-ratio: 4/3;
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
          box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 1);
        }
      }

      & > .card::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.25);
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
  .banner {
    &.mobile {
      display: none;
      @media (max-width: 1280px) {
        display: block;
        aspect-ratio: auto 904 / 761;
      }
    }
    @media (max-width: 1280px) {
      display: none;
    }
    position: relative;
    width: 100%;
    margin: auto;
    margin-bottom: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: 500ms ease-in-out;
    aspect-ratio: auto 1543 / 693;
    max-width: min(75vw, 1280px);
    &:hover {
      transform: scale(1.025);
      box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 1);
    }

    .banner-image {
      position: absolute;
      height: 100%;
      background-size: cover;
      background-position: center;
      opacity: 0;
      transition: opacity 1s ease-in-out;
      object-fit: contain;
      aspect-ratio: auto 1543 / 693;
    }

    .active {
      opacity: 1;
    }
  }
`;

const cardData = [
  {
    heading: "MĚŘENÍ VÝKONU",
    subheading: "Osobní vozidla & Zemědělská technika",
    button: "Více informací",
    link: "/sluzby/zkusebna-vykonu",
    background: "./dlazdice/Fotky_dlazdice_2.webp",
  },
  {
    heading: "ZEMĚDĚLSKÁ TECHNIKA",
    subheading: "",
    button: "Více informací",
    link: "/sluzby/zemedelska-technika",
    background: "./dlazdice/Fotky_dlazdice_4.webp",
  },
  {
    heading: "NÁKLADNÍ VOZIDLA",
    subheading: "",
    button: "Více informací",
    link: "/sluzby/nakladni-vozidla",
    background: "./dlazdice/Fotky_dlazdice_6.webp",
  },
  {
    heading: "STAVEBNÍ TECHNIKA",
    subheading: "",
    button: "Více informací",
    link: "/sluzby/stavebni-technika",
    background: "./dlazdice/Fotky_dlazdice_3.webp",
  },
  {
    heading: "LESNÍ TECHNIKA",
    subheading: "",
    button: "Více informací",
    link: "/sluzby/lesni-technika",
    background: "./dlazdice/Fotky_dlazdice_5.webp",
  },
  {
    heading: "OSOBNÍ VOZIDLA",
    subheading: "",
    button: "Více informací",
    link: "/sluzby/osobni-vozidla",
    background: "./dlazdice/Fotky_dlazdice_1.webp",
  },
];

const Sluzby = () => {
  const router = useRouter();

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
          <h2>Nabízíme široký sortiment služeb</h2>
          <p>
            Naše společnost nabízí profesionální softwarové úpravy řídících
            jednotek motorů, emisních systémů a automatických převodovek.
          </p>
          <p>
            Vlastní vývoj softwaru - Veškeré úpravy jsou vyvíjeny a testovány na
            zkušebně výkonu.
          </p>
          <p>
            Kvalitní a bezpečné úpravy, díky spolupráci s nejlepšími na trhu:
            Dimsport, Autotuner, Alientech Bapro, Dynoproject, Remus výfukové
            systémy, DTE systémy a Eventuri karbonové sání a další ..
          </p>
        </section>
        <section className="text">
          <h2>Jsme mobilní po celé České republice</h2>
          <p>
            Platí pro nákladní vozidla, zemědělskou, lesní a stavební techniku.
          </p>
          <p>
            Pro měření výkonu osobních vozidel je nutné dojet na válcovou
            zkušebnu výkonu na adresu Kotojedy 110, 767 01 Kroměříž - Kotojedy.
          </p>
        </section>
        <section className="grid">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="card"
              style={{
                backgroundImage: `url("${card.background}")`,
                cursor: "pointer",
              }}
              onClick={() => router.push(card.link)}
            >
              <h3>{card.heading}</h3>
              {card.subheading && (
                <p style={{ borderLeft: "1px solid white", paddingLeft: 4 }}>
                  {card.subheading}
                </p>
              )}
              <Link href={card.link}>{card.button}</Link>
            </div>
          ))}
        </section>
        <section className="text">
          <h2>Záruka na naše služby</h2>
          <ul>
            <li>Záruka 14 dní na vrácení peněz.</li>
            <li>
              Záruka 12 měsíců na řídící jednotku. <br />
              (V případě mechanického zásahu do řídící jednotky).
            </li>
            <li>Záruka 10 let na námi upravený software</li>
          </ul>
        </section>
        <section className="warn">
          <p>
            <p>
              Dle novely zákona č. 56/2001 Sb. o podmínkách provozu na pozemních
              komunikacích se vozidlo s neschválenou úpravou stává nezpůsobilé k
              provozu na pozemních komunikacích. Novela zákona, §83 odstavec 1,
              písmeno i) definuje podmínky takto: "fyzická osoba se dopustí
              přestupku tím, že jako provozovatel silničního vozidla v rozporu s
              §38 odst. 1 písm. a) provozuje na pozemních komunikacích vozidlo,
              které je technicky nezpůsobilé k provozu."
            </p>
          </p>
        </section>
        <Form />
      </StyledSluzby>
      <Footer />
    </>
  );
};

export default Sluzby;

import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Main = styled.main`
  width: 100%;
  height: auto;
  min-height: 100vh;

  color: #101c24;

  background-image: url("./Web_pozadi.svg");
  background-size: cover;
  background-position: top;

  .hero {
    margin-bottom: 8rem;
    width: 100vw;
    height: 50vh;

    background-image: url("./Foty_web_uvodni_hlavni_fotky/Uvod_foto.webp");
    background-size: cover;
    background-position: 50% 60%;

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

  .marks {
    width: 100%;
    height: auto;
    position: relative;
    margin-top: -14rem;
    margin-bottom: 6rem;

    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 3%;

    color: #fff;

    @media (max-width: 1280px) {
      flex-wrap: wrap;
      gap: 0;
      .mark {
        margin: 0.5rem;
      }
    }

    .mark {
      width: 8rem;
      height: auto;
      background-color: #101c24cc;
      border: solid 1px gray;
      border-radius: 1rem;

      display: flex;
      flex-direction: column;

      @media (max-width: 600px) {
        justify-content: center;
        width: 5rem;
        height: 7rem;
        font-size: 1rem;

        p {
          padding: 1rem 0 !important;
          font-size: 0.55rem !important;
        }

        img {
          margin: 0 !important;
          height: 2rem !important;
        }
      }

      p {
        font-size: 1rem;
        padding: 1rem;
        padding-bottom: 0;
        text-align: center;
        font-weight: 700;
      }
      img {
        margin: auto 0;
        padding: 0 1rem;
        font-size: 2rem;
        text-align: center;
        width: 100%;
        max-height: 50%;
      }
    }
  }

  section {
    width: 100%;
    max-width: 60vw;
    margin: auto;
    height: auto;

    display: flex;
    flex-direction: row-reverse;

    @media (max-width: 1280px) {
      flex-direction: column;

      img {
        margin: auto !important;
      }
    }

    &.reverse {
      flex-direction: row-reverse;
      background: #101c24;
      border-radius: 2rem;
      background-repeat: no-repeat;
      background-size: cover 75%;
      background-position: right;
      padding: 2rem 0;

      color: white;

      ul {
        list-style: none;
        font-size: 1.25rem;

        color: #dcdcdc;

        span {
          color: #fff;
          font-weight: 700;
        }
      }

      h2 {
        font-size: 4.5rem !important;

        @media (max-width: 1280px) {
          font-size: 3rem !important;
        }
        @media (max-width: 600px) {
          font-size: 2rem !important;
        }
      }

      @media (max-width: 1280px) {
        flex-direction: column;
      }

      img {
        box-shadow: none !important;
      }
    }

    .text {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-self: center;

      ul {
        list-style: none;
        font-size: 1.25rem;
        padding-left: 0;
        text-align: justify;
        @media (max-width: 900px) {
          text-align: left;
        }

        .bold {
          font-size: 1.15rem;
          font-weight: 900;
          text-align: left;

          @media (max-width: 900px) {
            font-size: 1.25rem;
            font-weight: 700;
          }
        }
      }

      gap: 1rem;

      h2 {
        font-size: 5rem;
        font-weight: 900;
        text-align: left;

        @media (max-width: 1280px) {
          text-align: center;
          font-size: 3.5rem;
          letter-spacing: 0px;
        }
        @media (max-width: 600px) {
          font-size: 2rem !important;
        }
      }

      ul li {
        text-align: left;
        font-size: 1.5rem;
        line-height: 1.2;
        margin: 1.5rem 0;
      }
    }

    .image {
      width: 100%;
      height: 100%;
      align-self: center;

      img {
        margin: 1rem 3rem 1rem auto;
        height: 100%;
        max-height: 25vh;
        width: 70%;
        object-fit: cover;
        border-radius: 1.5rem;
        aspect-ratio: 4/2.75;

        -webkit-box-shadow: -48px 48px 0px 0px #c3c7ca81;
        -moz-box-shadow: -48px 48px 0px 0px #c3c7ca81;
        box-shadow: -48px 48px 0px 0px #c3c7ca81;

        @media (max-width: 900px) {
          max-height: 25vh;
          width: 100%;
          -webkit-box-shadow: -16px 16px 0px 0px #c3c7ca81;
          -moz-box-shadow: -16px 16px 0px 0px #c3c7ca81;
          box-shadow: -16px 16px 0px 0px #c3c7ca81;
          margin-bottom: 2rem !important;
        }
      }
    }
  }

  .box {
    margin: 0 auto;
    margin-top: 8rem;

    h2 {
      font-size: 2.5rem;
      font-weight: 900;
      text-align: center;
      margin-bottom: 3rem;
      letter-spacing: -2px;

      @media (max-width: 1280px) {
        text-align: center;
        font-size: 2.5rem;
        letter-spacing: 0px;
      }
      @media (max-width: 600px) {
        font-size: 1.5rem !important;
      }
    }
    .boxes {
      display: flex;
      flex-wrap: wrap;
      width: 75vw;
      height: auto;
      justify-content: center;
      gap: 2rem;
      margin: 0 auto;

      .card {
        background-color: white;
        width: 25vw;
        height: auto;
        padding: 2rem 1rem;
        border-radius: 1rem;
        min-height: 20vh;

        transition: 500ms ease-in-out;
        &:hover {
          transform: scale(1.025);
          box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 1);
        }

        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
          0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
          0 16px 16px rgba(0, 0, 0, 0.12);

        aspect-ratio: 16/9;

        @media (max-width: 1280px) {
          width: calc(100% - 4rem);
          aspect-ratio: 1/1;

          &:nth-of-type(1) {
            background-color: #fff !important;
            color: #101c24 !important;
          }

          &:nth-of-type(2) {
            background-color: #101c24;
            color: white !important;
          }
        }

        @media (max-width: 900px) {
          h4 {
            text-align: center;
            font-size: 1.5rem !important;
            font-weight: 900 !important;
          }

          p {
            font-size: 1rem !important;
            font-weight: 500 !important;
            text-align: center;
          }
        }

        &:nth-of-type(1) {
          background-color: #101c24;
          color: white;
        }
        &:nth-of-type(4) {
          background-color: #101c24;
          color: white;
        }

        display: flex;
        flex-direction: column;
        justify-content: center;

        h4 {
          text-align: center;
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1rem;
          font-weight: 500;
          text-align: center;
        }
      }
    }
  }

  .reasons {
    margin: 0 auto;
    margin-top: 8rem;
    display: flex;
    flex-direction: column;
    max-width: 75vw;
    gap: 3rem;

    h2 {
      font-size: 2.5rem;
      font-weight: 900;
      text-align: center;
      letter-spacing: -2px;

      @media (max-width: 1280px) {
        text-align: center;
        font-size: 2.5rem;
        letter-spacing: 0px;
      }
      @media (max-width: 600px) {
        font-size: 1.5rem !important;
      }
    }

    .container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 2rem;

      @media (max-width: 1280px) {
        flex-wrap: wrap;
      }

      .reason {
        display: flex;
        flex-direction: row;
        width: auto;
        justify-items: center;
        gap: 1rem;

        @media (max-width: 900px) {
          width: 60vw;
        }

        p {
          font-size: 1.05rem;
          justify-self: center;
          font-weight: 700;
          height: min-content;
          margin: auto 1rem;

          @media (max-width: 900px) {
            font-size: 0.75rem;
          }
        }

        div {
          width: 100%;
          min-width: 6rem;
          max-width: 6rem;
          height: 6rem;
          border-radius: 1rem;
          background-color: #101c24;
          display: flex;
          align-items: center;

          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12),
            0 2px 2px rgba(0, 0, 0, 0.12), 0 4px 4px rgba(0, 0, 0, 0.12),
            0 8px 8px rgba(0, 0, 0, 0.12), 0 16px 16px rgba(0, 0, 0, 0.12);

          span {
            color: white;
            margin: auto;
            font-size: 3rem;
            font-weight: 900;
            text-align: center;
          }

          @media (max-width: 900px) {
            width: 100%;
            min-width: 4rem;
            max-width: 4rem;
            height: 4rem;
            span {
              font-size: 2rem;
              letter-spacing: 0px;
            }
          }
        }
      }
    }
  }

  .diagnose {
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    max-width: 75vw;
    gap: 6rem;
    margin-bottom: 12rem !important;

    h2 {
      font-size: 4rem;
      font-weight: 900;
      text-align: center;
      letter-spacing: -2px;

      @media (max-width: 1280px) {
        text-align: center;
        font-size: 2.5rem;
        letter-spacing: 0px;
      }
      @media (max-width: 600px) {
        font-size: 1.5rem !important;
      }
    }

    .row {
      display: flex;
      flex: row;
      justify-content: center;
      justify-items: center;
      gap: 2rem;

      @media (max-width: 1280px) {
        flex-wrap: wrap;
      }

      div {
        font-size: 3rem;
        height: min-content;
        justify-self: center;
        margin: auto 0;
      }

      .spacer {
        font-size: 3.5rem;
        font-weight: bold;
        padding: 1.5rem 0 2rem 0;
        @media (max-width: 1280px) {
          display: none;
        }
      }
    }
  }

  .end-text {
    margin: 3rem auto 0 auto;
    display: flex;
    flex-direction: column;
    max-width: 70vw;
    gap: 4rem;
    padding-bottom: 12rem !important;

    p {
      font-size: 2rem;
      text-align: center;

      @media (max-width: 1280px) {
        font-size: 1.5rem;
        text-align: justify;
      }
    }
  }

  .welcome {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto 6rem auto;
  }

  .contact-us {
    font-size: 16px;
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

export default function Home() {
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
      <Main>
        <div className="hero">
          <div>
            <h1>TTC Performance</h1>
            <p style={{ color: "#e84048", fontSize: 20 }}>
              Profesionální chiptuning
            </p>
          </div>
        </div>
        <div className="marks">
          <div className="mark">
            <p>KVALITA</p>
            <img src="./media/icons/iconmonstr-award-7.svg" />
          </div>
          <div className="mark">
            <p>RYCHLOST</p>
            <img src="./media/icons/iconmonstr-time-19.svg" />
          </div>
          <div className="mark">
            <p>ZÁRUKA</p>
            <img src="./media/icons/iconmonstr-certificate-12.svg" />
          </div>
        </div>
        <picture>
          <source
            media="(max-width: 599px)"
            srcset="./media/banner_ttc_phone.webp"
          />
          <source media="(min-width: 600px)" srcset="./media/banner_ttc.webp" />
          <img
            className="welcome"
            src="./media/banner_ttc.webp"
            alt="Welcome"
          />
        </picture>
        <div style={{ backgroundColor: "#101c24", height: "auto" }}>
          <section className="reverse">
            <div className="text">
              <ul>
                <li>
                  Našimi zákazníky jsou převážně majitelé dopravní techniky,
                  kteří chtějí zvýšit jízdní výkon, snížit spotřebu pohonných
                  hmot a močoviny AdBlue, optimalizovat své provozní náklady za
                  opravy a servis.
                </li>
                <li>
                  <Link href="/sluzby#form" className="contact-us">
                    Kontaktujte nás
                  </Link>
                </li>
              </ul>
            </div>
            <div className="image">
              <img
                src="./media/Traktor_AGRO_DYNO_brzda-076 kopie.webp"
                alt="Traktor brzda"
              />
            </div>
          </section>
        </div>
        <div className="reasons">
          <h2>3 DŮVODY PRO CHIPTUNING U NÁS</h2>
          <div className="container">
            <div className="reason">
              <div>
                <span>1.</span>
              </div>
              <p>
                Měření výkonu na válcové
                <br /> zkušebně 4x4 + Agro Dyno{" "}
              </p>
            </div>
            <div className="reason">
              <div>
                <span>2.</span>
              </div>
              <p>Kvalitní bezpečné úpravy</p>
            </div>
            <div className="reason">
              <div>
                <span>3.</span>
              </div>
              <p>Garance zachování emisních limitů.</p>
            </div>
          </div>
        </div>
        <div className="box">
          <h2>NAŠE ZAMĚŘENÍ</h2>
          <div className="boxes">
            <Link
              className="card"
              href="/sluzby/zkusebna-vykonu"
              style={{ textDecoration: "inherit" }}
            >
              <h4>Dopravní technika</h4>
              <p>osobní vozidla</p>
              <p>nákladní vozy / autobusy</p>
              <p>dodávky / obytné vozy</p>
            </Link>
            <Link
              className="card"
              href="/sluzby/zemedelska-technika"
              style={{ textDecoration: "inherit", color: "inherit" }}
            >
              <h4>Zemědělská technika</h4>
              <p>traktory / kombajny</p>
              <p>manipulátory / řezačky</p>
            </Link>
            <Link
              className="card"
              href="/sluzby/stavebni-technika"
              style={{ textDecoration: "inherit", color: "inherit" }}
            >
              <h4>Stavební technika</h4>
              <p>bagry / nakladače</p>
              <p>buldozery / traktorbagry</p>
              <p>drtiče</p>
            </Link>
            <Link
              className="card"
              href="/sluzby/lesni-technika"
              style={{ textDecoration: "inherit" }}
            >
              <h4>Lesní technika</h4>
              <p>harvestory / vyvážecí soupravy</p>
              <p>lesní traktory</p>
            </Link>
          </div>

          <Form />
        </div>
      </Main>
      <Footer />
    </>
  );
}

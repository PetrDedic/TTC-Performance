import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import styled from "styled-components";

const StyledCenik = styled.main`
  background-image: url("./bg.svg");
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

    @media (max-width: 900px) {
      height: 90vh;
    }

    background-image: url("./media/foto/cenik.png");
    background-size: cover;
    background-position: center;

    display: flex;
    align-content: center;
    justify-content: center;

    color: white;

    div {
      align-self: center;
      text-align: center;

      h1 {
        font-size: 6rem;
        font-weight: bolder;
        line-height: 4.75rem;

        @media (max-width: 1280px) {
          font-size: 4rem;
        }
        @media (max-width: 600px) {
          font-size: 3rem;
        }
      }
      p {
        font-size: 4rem;
        font-weight: 100;
        letter-spacing: 0.25rem;

        @media (max-width: 1280px) {
          font-size: 3rem;
          letter-spacing: 0;
        }
        @media (max-width: 600px) {
          font-size: 2rem;
        }
      }
    }
  }

  section {
    height: auto;
    width: 75vw;
    margin: auto;
    padding: 5vw 12.5vw;
    margin-bottom: 8rem;

    border-radius: 2rem;
    background-color: #101c24;
    color: white;

    display: flex;
    flex-direction: column;
    gap: 4rem;

    -webkit-box-shadow: 48px 32px 0px 0px rgba(200, 196, 204, 1);
    -moz-box-shadow: 48px 32px 0px 0px rgba(200, 196, 204, 1);
    box-shadow: 48px 32px 0px 0px rgba(200, 196, 204, 1);

    &.reverse {
      -webkit-box-shadow: -48px 32px 0px 0px rgba(200, 196, 204, 1);
      -moz-box-shadow: -48px 32px 0px 0px rgba(200, 196, 204, 1);
      box-shadow: -48px 32px 0px 0px rgba(200, 196, 204, 1);
    }

    h2 {
      font-size: 3.5rem;
      letter-spacing: -4px;
      font-weight: 900;
      text-align: center;

      @media (max-width: 1280px) {
        font-size: 2rem !important;
        letter-spacing: 0px;
      }
      @media (max-width: 600px) {
        font-size: 1.5rem !important;
      }
    }

    ul li {
      font-size: 2rem;
      margin: 1.5rem 0;
      font-weight: 400;

      @media (max-width: 1280px) {
        font-size: 1.5rem !important;
        letter-spacing: 0px;
      }
      @media (max-width: 600px) {
        font-size: 1rem !important;
      }

      span {
        font-weight: 600;
      }
    }

    p {
      font-size: 3rem;
      font-weight: 400;
      text-align: center;

      @media (max-width: 1280px) {
        font-size: 2rem !important;
        letter-spacing: 0px;
      }
      @media (max-width: 600px) {
        font-size: 1.25rem !important;
      }

      span {
        font-weight: 600;
      }
    }
  }

  .box {
    margin: 8rem auto;

    h2 {
      font-size: 5rem;
      letter-spacing: -4px;
      font-weight: 900;
      text-align: center;
      margin-bottom: 4rem;

      @media (max-width: 1280px) {
        text-align: center;
        font-size: 3.5rem;
        letter-spacing: 0px;
      }
      @media (max-width: 600px) {
        font-size: 2rem !important;
      }
    }
    .boxes {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: auto;
      justify-content: center;
      gap: 2rem;

      .card {
        background-color: white;
        width: calc(40% - 4rem);
        height: auto;
        padding: 2rem;
        border-radius: 1rem;
        min-height: 20vh;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
          0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
          0 16px 16px rgba(0, 0, 0, 0.12);

        @media (max-width: 1280px) {
          width: calc(80% - 4rem);

          &:nth-of-type(1) {
            background-color: #fff !important;
            color: #101c24 !important;
          }

          &:nth-of-type(2) {
            background-color: #101c24;
            color: white;
          }
        }

        @media (max-width: 900px) {
          h4 {
            text-align: center;
            font-size: 1.5rem !important;
            font-weight: 900 !important;
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
          font-size: 2.5rem;
          font-weight: 900;
        }

        p {
          font-size: 1rem;
          font-weight: 500;
          text-align: left;
          display: flex;
          justify-content: space-between;
          margin: 0.5rem 0;

          span {
            font-weight: 700;
            font-size: 1.1rem;
            text-align: right;
          }

          @media (max-width: 900px) {
            margin: 1rem 0;
            flex-direction: column;
            gap: 0.25rem;
            text-align: center;

            span {
              text-align: center !important;
            }
          }
        }
      }
    }
  }

  p.text {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 2rem;

    @media (max-width: 900px) {
      font-size: 1.25rem;
    }
  }
`;

const Cenik = () => {
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
      <StyledCenik>
        <div className="hero">
          <div>
            <h1>NÁŠ CENÍK</h1>
          </div>
        </div>
        <div className="box">
          <div className="boxes">
            <div className="card">
              <p
                style={{
                  textAlign: "center",
                  margin: "1rem auto",
                  fontWeight: "700",
                  fontSize: "1.25rem",
                }}
              >
                Osobní a užitková vozidla
              </p>
              <p>
                Chiptuning vč. měření výkonu <span>od 4.000,- Kč</span>
              </p>
              <p>
                Oprava systému adblue/dpf <span>od 4.200,- Kč</span>
              </p>
              <p>
                Odstranění funkce egr <span>3.000,- Kč</span>
              </p>
              <p>
                Programování automatických převodovek<span>od 2.450,- Kč</span>
              </p>
              <p>
                Oprava špatných teplých startů<span>od 900,- Kč</span>
              </p>
              <p>
                Omezovače otáček<span>od 2.600,- Kč</span>
              </p>
              <p>
                Omezovače rychlosti <span>od 900,- Kč</span>
              </p>
              <p>
                Klonování řídících jednotek <span>1.500,- Kč</span>
              </p>
              <p>
                Měření výkonu<span>od 2.600,- Kč</span>
              </p>
            </div>
            <div className="card">
              <p
                style={{
                  textAlign: "center",
                  margin: "1rem auto",
                  fontWeight: "700",
                  fontSize: "1.25rem",
                }}
              >
                Nákladní vozidla a autobusy
              </p>
              <p>
                Oprava systému AD Blue/DPF truck/bus <span>25.000,- Kč</span>
              </p>
              <p>
                Odstranění funkce EGR ventilu <span>18.000,- Kč</span>
              </p>
              <p>
                Snížení dávky vstřikování AD Blue E6 <span>22.000,- Kč</span>
              </p>
              <p>
                Odstranění nouzového režimu E4,E5 <span>15.000,- Kč</span>
              </p>
              <p>
                Odstranění nouzového režimu E6 <span>2.000,- Kč</span>
              </p>
            </div>
            <div className="card">
              <p
                style={{
                  textAlign: "center",
                  margin: "1rem auto",
                  fontWeight: "700",
                  fontSize: "1.25rem",
                }}
              >
                Zemědělská technika
              </p>
              <p>
                Chiptuning agro <span>25.000,- Kč</span>
              </p>
              <p>
                Oprava systému AD Blue/DPF agro
                <span>od 25.000,- Kč (dle výrobce motoru/ECU)</span>
              </p>
            </div>
            <div className="card">
              <p
                style={{
                  textAlign: "center",
                  margin: "1rem auto",
                  fontWeight: "700",
                  fontSize: "1.25rem",
                }}
              >
                Stavební a lesní technika
              </p>
              <p>
                Chiptuning stavební/lesní
                <span>od 32.000,- Kč (dle výrobce motoru/ECU)</span>
              </p>
              <p>
                Oprava systému AD Blue/DPF stavební/lesní
                <span>od 32.000,- Kč (dle výrobce motoru/ECU)</span>
              </p>
            </div>
          </div>
        </div>
        <p className="text">Uvedené ceny jsou bez DPH.</p>
        <p className="text">Další úpravy naceníme dle vašich požadavků.</p>

        <p>&#8203;</p>
      </StyledCenik>
      <Footer />
    </>
  );
};

export default Cenik;

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

const Main = styled.main`
  width: 100%;
  height: auto;
  min-height: 100vh;

  color: #101c24;

  background-image: url("./bg.svg");
  background-size: cover;
  background-position: top;

  .hero {
    width: 100vw;
    height: 100vh;

    background-image: url("./media/foto/jay-huang-aeouwx28n6M-unsplash.jpg");
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

  .marks {
    width: 100%;
    height: auto;
    position: relative;
    bottom: 6rem;

    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 7.5%;

    color: #fff;

    @media (max-width: 1280px) {
      flex-wrap: wrap;
      gap: 0;
      .mark {
        margin: 1rem;
      }
    }

    .mark {
      width: 12rem;
      height: 13rem;
      background-color: #101c24cc;
      border: solid 1px gray;
      border-radius: 1rem;

      display: flex;
      flex-direction: column;

      @media (max-width: 600px) {
        width: 6rem;
        height: 7rem;

        p {
          padding: 0.75rem !important;
          font-size: 0.75rem !important;
        }

        img {
          margin: 1rem !important;
          height: 3rem !important;
        }
      }

      p {
        padding: 2rem 0 1rem 0;
        font-size: 2rem;
        text-align: center;
        font-weight: 100;
        height: 6rem;
      }
      img {
        padding: 0.5rem 1rem 0;
        font-size: 2rem;
        text-align: center;
        height: 6rem;
      }
    }
  }

  section {
    width: 100%;
    max-width: 75vw;
    margin: auto;
    margin-bottom: 12rem;
    height: auto;

    display: flex;
    flex-direction: row;

    @media (max-width: 1280px) {
      flex-direction: column;

      img {
        margin: auto !important;
      }
    }

    &.reverse {
      flex-direction: row-reverse;
      background: #101c24b2;
      border-radius: 2rem;
      background-repeat: no-repeat;
      background-size: cover 75%;
      background-position: right;
      padding: 2rem 0;

      color: white;

      h2 {
        font-size: 4.5rem !important;

        @media (max-width: 1280px) {
          font-size: 3rem !important;
        }
        @media (max-width: 600px) {
          font-size: 2rem !important;
        }
      }

      img {
        margin-left: 0 !important;
        margin-right: auto;
      }

      @media (max-width: 1280px) {
        flex-direction: column;

        img {
          margin: auto !important;
        }
      }
    }

    .text {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-self: center;

      gap: 1rem;

      h2 {
        font-size: 5rem;
        letter-spacing: -4px;
        font-weight: 900;
        text-align: left;

        @media (max-width: 1280px) {
          text-align: center;
          font-size: 3.5rem;
        }
        @media (max-width: 600px) {
          font-size: 2rem !important;
        }
      }

      ul li {
        font-size: 1.75rem;
        margin: 1.5rem 0;
      }
    }

    .image {
      width: 100%;
      height: 100%;
      align-self: center;

      img {
        margin-left: auto;
        height: 100%;
        max-height: 65vh;
        width: 80%;
        object-fit: cover;
        border-radius: 1.5rem;

        -webkit-box-shadow: -48px 32px 0px 0px rgba(200, 196, 204, 1);
        -moz-box-shadow: -48px 32px 0px 0px rgba(200, 196, 204, 1);
        box-shadow: -48px 32px 0px 0px rgba(200, 196, 204, 1);
      }
    }
  }

  .reasons {
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    max-width: 75vw;
    gap: 6rem;
    margin-bottom: 12rem !important;

    h2 {
      font-size: 5rem;
      letter-spacing: -4px;
      font-weight: 900;
      text-align: center;

      @media (max-width: 1280px) {
        text-align: center;
        font-size: 3.5rem;
      }
      @media (max-width: 600px) {
        font-size: 2rem !important;
      }
    }

    .container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 4rem;

      @media (max-width: 1280px) {
        flex-wrap: wrap;
      }

      .reason {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-items: center;
        gap: 2rem;

        p {
          justify-self: center;
          font-size: 1.5rem;
          font-weight: 200;
          height: min-content;
          margin: auto;
        }

        div {
          width: 100%;
          min-width: 8rem;
          max-width: 8rem;
          height: 8rem;
          border-radius: 1rem;
          background-color: #101c24;
          display: flex;
          align-items: center;

          span {
            color: white;
            margin: auto;
            font-size: 4rem;
            letter-spacing: -4px;
            font-weight: 900;
            text-align: center;
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
      font-size: 5rem;
      letter-spacing: -4px;
      font-weight: 900;
      text-align: center;

      @media (max-width: 1280px) {
        text-align: center;
        font-size: 3.5rem;
      }
      @media (max-width: 600px) {
        font-size: 2.5rem !important;
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
            <p>profesionální chiptuning</p>
          </div>
        </div>
        <div className="marks">
          <div className="mark">
            <p>Kvalita!</p>
            <img src="./media/icons/iconmonstr-award-7.svg" />
          </div>
          <div className="mark">
            <p>Rychlost!</p>
            <img src="./media/icons/iconmonstr-time-19.svg" />
          </div>
          <div className="mark">
            <p>Záruka!</p>
            <img src="./media/icons/iconmonstr-certificate-12.svg" />
          </div>
        </div>
        <section>
          <div className="text">
            <h2>Nejlepší v ČR!</h2>
            <ul>
              <li>schválený Ministerstvem dopravy ČR</li>
              <li>vždy měřený na válcové zkušebně 4x4</li>
              <li>s podrobnou diagnostikou a emisním testem</li>
              <li>s protokoly a certifkátem o provedené úpravě</li>
              <li>s certifikací kvality ISO9001:2016 a auditem TÜV SÜD</li>
              <li>s možností převzetí tovární záruky</li>
            </ul>
          </div>
          <div className="image">
            <img src="./media/kombajn.jpg" alt="" />
          </div>
        </section>
        <section className="reverse">
          <div className="text">
            <h2>Softwarové úpravy</h2>
            <ul>
              <li>nákladních automobilů</li>
              <li>zemědělských a stavebních strojů</li>
              <li>osobní automobily</li>
              <li>motorky</li>
              <li>lodě</li>
            </ul>
          </div>
          <div className="image">
            <img src="./media/traktor.jpg" alt="" />
          </div>
        </section>
        <div className="reasons">
          <h2>3 důvody pro chiptuning</h2>
          <div className="container">
            <div className="reason">
              <div>
                <span>1.</span>
              </div>
              <p>Všechny úpravy podrobujeme emisním testům.</p>
            </div>
            <div className="reason">
              <div>
                <span>2.</span>
              </div>
              <p>Chiptuning můžeme zapsat do TP.</p>
            </div>
            <div className="reason">
              <div>
                <span>3.</span>
              </div>
              <p>Náš chiptuning je bezpečný pro motor.</p>
            </div>
          </div>
        </div>
        <div className="diagnose">
          <h2>Diagnostika</h2>
          <div className="row">
            <div>LAUNCH</div>
            <div className="spacer">|</div>
            <div>JALTEST</div>
            <div className="spacer">|</div>
            <div>WÜRTH</div>
            <div className="spacer">|</div>
            <div>Delphi</div>
          </div>
        </div>
        <div className="end-text">
          <p>
            Služba je poskytována formou mobilního chiptuningu po celé České
            republice a také za Vámi přijedeme na Slovensko nebo do Polska.
          </p>
          <p>
            Pokud stále váháte, nabízíme na 30 dní úpravu na zkoušku zdarma!
          </p>
        </div>
      </Main>
      <Footer />
    </>
  );
}

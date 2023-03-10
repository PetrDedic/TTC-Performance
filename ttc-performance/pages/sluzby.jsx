import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import styled from "styled-components";

const StyledSluzby = styled.main`
  background-image: url("./media/texture.png");
  background-size: cover;
  background-position: top;

  width: 100%;
  height: auto;
  min-height: 100vh;

  color: #101c24;

  h1 {
    font-size: 5rem;
    letter-spacing: -4px;
    font-weight: 900;
    text-align: center;
    margin: 8rem 0;
  }

  section {
    width: 100%;
    max-width: 75vw;
    margin: auto;
    margin-bottom: 12rem;
    height: auto;

    display: flex;
    flex-direction: row;

    &.reverse {
      flex-direction: row-reverse;

      padding: 2rem 0;

      h2 {
        font-size: 4.5rem !important;
      }

      img {
        margin-left: 0 !important;
        margin-right: auto;

        -webkit-box-shadow: -48px 32px 0px 0px rgba(200, 196, 204, 1) !important;
        -moz-box-shadow: -48px 32px 0px 0px rgba(200, 196, 204, 1) !important;
        box-shadow: -48px 32px 0px 0px rgba(200, 196, 204, 1) !important;
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
      }

      ul li {
        font-size: 2rem;
        margin: 1.5rem 0;
        font-weight: 700;

        span {
          font-weight: 300;
        }
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

        -webkit-box-shadow: 48px 32px 0px 0px rgba(200, 196, 204, 1);
        -moz-box-shadow: 48px 32px 0px 0px rgba(200, 196, 204, 1);
        box-shadow: 48px 32px 0px 0px rgba(200, 196, 204, 1);
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
    }
  }
`;

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
        <img src="./media/foto/sluzby.png" alt="" />
        <h1>Na??e slu??by</h1>
        <section>
          <div className="text">
            <ul>
              <li>OPTIMALIZACE V??KONU SN????EN?? SPOT??EBY</li>
              <li>DEAKTIVACE SCR (AdBlue)</li>
              <li>DEAKTIVACE DPF</li>
              <li>
                MOBILN?? CHIPTUNING
                <br />
                <span>(cel?? ??R i SR)</span>
              </li>
            </ul>
          </div>
          <div className="image">
            <img src="./media/truck.png" alt="" />
          </div>
        </section>
        <section className="reverse">
          <div className="text">
            <ul>
              <li>SOFTWAROV?? ??PRAVY AUTOMATICK??CH P??EVODOVEK</li>
              <li>
                SOFTWAROV?? ??PRAVY
                <br />
                <span>
                  EGR, START/STOP, DTC, LAMBDA, POPCORN, LAUNCH CONTROL, V????IV??
                  KLAPKY, V-MAX OFF
                </span>
              </li>
              <li>
                DIAGNOSTIKA - <br />
                <span>
                  osobn?? a n??kladn?? vozidla, zem??d??lsk?? a stavebn?? stroje
                </span>
              </li>
              <li>PLN??N?? KLIMATIZACE A DEZINFEKCE OZONEM</li>
            </ul>
          </div>
          <div className="image">
            <img src="./media/truck2.png" alt="" />
          </div>
        </section>
        <div className="end-text">
          <p>
            Dle novely z??kona ??. 56/2001 Sb. o podm??nk??ch provozu na pozemn??ch
            komunikac??ch se vozidlo s neschv??lenou ??pravou st??v?? nezp??sobil?? k
            provozu na pozemn??ch komunikac??ch. Novela z??kona, ??83 odstavec 1,
            p??smeno i) definuje podm??nky takto: "fyzick?? osoba se dopust??
            p??estupku t??m, ??e jako provozovatel silni??n??ho vozidla v rozporu s
            ??38 odst. 1 p??sm. a) provozuje na pozemn??ch komunikac??ch vozidlo,
            kter?? je technicky nezp??sobil?? k provozu."
          </p>
        </div>
      </StyledSluzby>
      <Footer />
    </>
  );
};

export default Sluzby;

import Link from "next/link";
import styled from "styled-components";

const StyledFooter = styled.footer`
  .image {
    background-image: url("../media/foto/footer.jpg");
    background-size: cover;
    background-position: center;
    padding: 8rem;
    padding-bottom: 4rem;
    height: auto;
    width: 100%;

    display: flex;
    flex-direction: column;

    gap: 4rem;

    @media (max-width: 900px) {
      padding: 4rem;
    }
  }

  .flex {
    display: flex;
    flex-direction: row;
    gap: 4rem;
    justify-content: center;

    @media (max-width: 1280px) {
      flex-direction: column;
    }

    .map {
      width: 50%;
      max-height: 100%;

      @media (max-width: 1280px) {
        width: 100%;
        height: 256px;
      }
    }

    .text {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      width: max-content;
      @media (max-width: 1280px) {
        width: 100%;
        font-size: 1.25rem;
      }
      color: white;
      font-weight: 100;

      span {
        line-height: 2.5;
      }

      .name {
        font-weight: 600;
      }
    }
  }

  .logos {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: center;

    .socials {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      justify-content: center;

      a {
        display: flex;
      }

      img {
        width: 2rem;
        min-width: 2rem;
        height: 2rem;
        min-height: 2rem;
      }
    }

    @media (max-width: 900px) {
      flex-direction: column;
      text-align: center;
    }

    span {
      align-self: center;
      height: min-content;
      height: 3rem;
      border: 1px solid white;

      @media (max-width: 900px) {
        border: 0px solid white;
        display: none;
      }
    }

    img {
      height: 4rem;
      width: auto;
      align-self: center;
    }

    p {
      color: white;
      align-self: center;
      height: min-content;
    }
  }

  .paryn {
    text-align: center;
    font-size: 0.75rem;
    padding: 1rem;
    @media (max-width: 1280px) {
      width: 100%;
      font-size: 1rem;
    }
  }

  .width {
    max-width: 400px;
  }
`;

const Footer = () => {
  return (
    <StyledFooter id="contact">
      <div className="image">
        <div className="flex">
          <div className="map">
            <iframe
              src="https://frame.mapy.cz/s/cojetuvuvo"
              width="100%"
              height="100%"
              frameborder="0"
            ></iframe>
          </div>
          <div className="text">
            <p className="name">TTC Performance s. r. o.</p>
            <p>
              Kotojedy 110
              <br />
              76701 Kroměříž
            </p>
            <p>
              <span style={{ fontWeight: 700 }}>Kontaktní osoby:</span>
              <br />
              Technické oddělení
              <br />
              Vlastimil Okálek -{" "}
              <a style={{ color: "white" }} href="tel:+420604892755">
                604 892 755
              </a>
              <br />
              <br />
              Ekonomické oddělení
              <br />
              Ing. Pavla Okálková -{" "}
              <a style={{ color: "white" }} href="tel:+420724226468">
                724 226 468
              </a>
            </p>
          </div>
        </div>
        <div className="logos">
          <div className="socials">
            <Link href="https://www.facebook.com/ttcperformance">
              <img src="..\..\iconmonstr-facebook-3.svg" alt="fb logo" />
            </Link>
            <Link href="https://www.instagram.com/ttc_performance/">
              <img
                src="..\..\..\..\iconmonstr-instagram-11.svg"
                alt="ig logo"
              />
            </Link>
          </div>
          <span></span>
          <img
            src="..\..\media\Premium Package\Logos (Vector Format)\Transparent White.svg"
            alt="ttc logo"
          />
          <span></span>
          <p className="width">
            Společnost je zapsaná v obchodním rejstříku vedeném u Krajského
            soudu v Brně, spisová značka C 125704.
          </p>
        </div>
      </div>
      <div className="paryn">
        <p style={{ marginBottom: "0.25rem" }}>
          IČO: 11991356 | DIČ: CZ11991356
        </p>
        <p style={{ marginBottom: "0.25rem" }}>
          TTC Performance s. r. o., Cimburk 563, 768 33 Morkovice-Slížany, +420
          604 892 755
        </p>
        <p style={{ fontWeight: "600" }}>Designed by: paryn design</p>
      </div>
    </StyledFooter>
  );
};

export default Footer;

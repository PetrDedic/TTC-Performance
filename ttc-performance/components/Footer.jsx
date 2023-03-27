import styled from "styled-components";

const StyledFooter = styled.footer`
  .flex {
    background-image: url("../media/foto/footer.jpg");
    background-size: cover;
    background-position: center;
    padding: 8rem;
    height: auto;
    width: 100%;

    display: flex;
    flex-direction: row;
    gap: 8rem;

    @media (max-width: 1280px) {
      flex-direction: column;
      padding: 4rem;
    }

    .map {
      width: 100%;
      max-height: 100%;
    }

    .text {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      width: 50%;
      @media (max-width: 1280px) {
        width: 100%;
        font-size: 1.25rem;
      }
      color: white;
      font-size: 1.5rem;
      font-weight: 100;

      .name {
        font-weight: 600;
      }
    }
  }

  .paryn {
    text-align: center;
    font-size: 1.5rem;
    padding: 2rem;
    @media (max-width: 1280px) {
      width: 100%;
      font-size: 1.25rem;
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter id="contact">
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
            Obchodní oddělení
            <br />
            Zbyněk Pitaš -{" "}
            <a style={{ color: "white" }} href="tel:+420777684498">
              777 684 498
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
      <div className="paryn">
        <p>IČO: 11991356</p>
        <p>DIČ: CZ11991356</p>
        <br />
        <p>
          TTC Performance s. r. o., Cimburk 563, 768 33 Morkovice-Slížany, +420
          604 892 755
        </p>
        <p>Designed by: paryn design</p>
      </div>
    </StyledFooter>
  );
};

export default Footer;

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

    .map {
      width: 100%;
      max-height: 100%;
    }

    .text {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      width: 50%;
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
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="flex">
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2604.797013450115!2d17.206229099999998!3d49.2423376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47130296060c25e1%3A0xe9c2927f66bc5632!2sCimburk%20563%2C%20768%2033%20Morkovice-Sl%C3%AD%C5%BEany-Morkovice!5e0!3m2!1scs!2scz!4v1677508256606!5m2!1scs!2scz"
            width="100%"
            height="100%"
            allowFullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="text">
          <p className="name">TTC Performance s. r. o.</p>
          <p>
            Vlastimil Okálek
            <br />
            Cimburk 563
            <br />
            Morkovice-Slížany 768 33
          </p>
          <p>IČO: 11991356</p>
          <p>DIČ: CZ11991356</p>
          <p>
            +420 604 892 755
            <br />
            info@ttcperformance.cz
          </p>
        </div>
      </div>
      <div className="paryn">
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

import styled from "styled-components";

const Styled6 = styled.div`
  margin: auto;
  margin-top: 6rem;
  width: 75vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;

  .card {
    width: calc(33.3333% - 1rem);
    @media (max-width: 1280px) {
      width: calc(50% - 1rem);
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

const SixGrid = ({ cards }) => {
  return (
    <Styled6>
      {cards.map((card, index) => (
        <div className="card" key={index}>
          <h4>{card.title}</h4>
          <p>{card.description}</p>
          <p className="price">{card.price}</p>
        </div>
      ))}
    </Styled6>
  );
};

export default SixGrid;

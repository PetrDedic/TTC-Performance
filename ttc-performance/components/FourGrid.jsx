import styled from "styled-components";

const Styled30 = styled.div`
  margin: auto;
  margin-top: 6rem;
  width: 75vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;

  .image {
    width: calc(50% - 1rem);
    @media (max-width: 1280px) {
      width: calc(100%);
    }
    aspect-ratio: 16/9;
    border-radius: 1rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 1rem;
    }
  }
`;

const FourGrid = ({ cards }) => {
  return (
    <Styled30>
      {cards.map((card) => (
        <div className="image">
          <img src={card.img} alt={card.img + " name"} />
        </div>
      ))}
    </Styled30>
  );
};

export default FourGrid;

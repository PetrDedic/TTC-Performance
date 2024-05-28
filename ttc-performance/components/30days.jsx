import styled from "styled-components";

const Styled30 = styled.div`
  max-width: 75vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 6rem;

  h3 {
    font-size: 1.75rem;
    text-align: center;
  }

  p {
    text-align: center;
  }
`;

const Thirty = () => {
  return (
    <Styled30>
      <h3>Zdarma 30 dní zkušební lhůta</h3>
      <p>
        Nabízíme zdarma 30 dní zkušební lhůtu na námi provedenou optimalizaci
        výkonu.
      </p>
    </Styled30>
  );
};

export default Thirty;

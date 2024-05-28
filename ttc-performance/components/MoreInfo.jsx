import Link from "next/link";
import styled from "styled-components";

const Styled30 = styled.div`
  margin-top: 4rem;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 4rem 0;
  background-color: #0b1e25;
  color: white;

  h3 {
    font-size: 1.75rem;
    text-align: center;
  }

  p {
    text-align: center;
  }

  a {
    margin-top: 1rem;
    background: #e84048;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    text-decoration: none;
    transition: 250ms;
    border: 1px solid #e84048;
    width: max-content;

    &:hover {
      background: none;
      color: white;
    }
  }
`;

const MoreInfo = () => {
  return (
    <Styled30>
      <h3>Více informací o našich službách?</h3>
      <p>Zjistěte více informací o dané službě pro vaše vozidlo.</p>
      <Link href="/vozidla">Mám zájem</Link>
    </Styled30>
  );
};

export default MoreInfo;

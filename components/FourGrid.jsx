import styles from "./FourGrid.module.css";

const FourGrid = ({ cards }) => {
  return (
    <div className={styles.grid}>
      {cards.map((card, index) => (
        <div key={index} className={styles.image}>
          <img src={card.img} alt={card.img + " name"} />
        </div>
      ))}
    </div>
  );
};

export default FourGrid;

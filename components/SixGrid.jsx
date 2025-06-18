import styles from "./SixGrid.module.css";

const SixGrid = ({ cards }) => {
  return (
    <div className={styles.grid}>
      {cards.map((card, index) => (
        <div className={styles.card} key={index}>
          <h4>{card.title}</h4>
          <p>{card.description}</p>
          <p className={styles.price}>{card.price}</p>
        </div>
      ))}
    </div>
  );
};

export default SixGrid;

import Link from "next/link";
import styles from "./Params.module.css";

const Params = () => {
  return (
    <div className={styles.params}>
      <h3>Parametry výkonu</h3>
      <p>Zjisti více informací o možném navýšení výkonu svého vozidla.</p>
      <Link href="/vozidla">Značky vozidel</Link>
    </div>
  );
};

export default Params;

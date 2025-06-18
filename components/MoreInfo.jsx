import Link from "next/link";
import styles from "./MoreInfo.module.css";

const MoreInfo = () => {
  return (
    <div className={styles.moreInfo}>
      <h3>Více informací o našich službách?</h3>
      <p>Zjistěte více informací o dané službě pro vaše vozidlo.</p>
      <Link href="/vozidla">Mám zájem</Link>
    </div>
  );
};

export default MoreInfo;

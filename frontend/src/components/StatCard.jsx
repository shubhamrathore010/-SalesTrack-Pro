
import styles from "./StatCard.module.css";

const StatCard = ({ title, value, icon, accent = "blue" }) => {
  return (
    <div className={styles.card}>
      <div className={`${styles.icon} ${styles[accent]}`}>
        {icon}
      </div>

      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
};

export default StatCard;


















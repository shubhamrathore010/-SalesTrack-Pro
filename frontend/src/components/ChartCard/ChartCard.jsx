import styles from "./ChartCard.module.css";

const ChartCard = ({ title, subtitle, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
};

export default ChartCard;

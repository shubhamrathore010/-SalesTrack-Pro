import styles from "./LeadSummary.module.css";

const LeadSummary = ({ lead }) => {
  if (!lead) return null;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.name}>{lead.name}</div>

        <span
          className={`${styles.badge} ${styles[lead.status]}`}
        >
          {lead.status.toUpperCase()}
        </span>
      </div>

      <div className={styles.meta}>
        <div>
          <div className={styles.label}>Email</div>
          <div className={styles.value}>{lead.email}</div>
        </div>

        <div>
          <div className={styles.label}>Source</div>
          <div className={styles.value}>{lead.source}</div>
        </div>

        <div>
          <div className={styles.label}>Assigned To</div>
          <div className={styles.value}>
            {lead.assignedTo?.name || "Unassigned"}
          </div>
        </div>

        <div>
          <div className={styles.label}>Lead ID</div>
          <div className={styles.value}>
            {lead._id.slice(-6)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadSummary;

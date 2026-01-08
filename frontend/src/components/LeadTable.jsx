
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./LeadTable.module.css";

const LeadTable = ({ leads, onDelete }) => {
  const navigate = useNavigate();

  if (!Array.isArray(leads) || leads.length === 0) {
    return <div className={styles.empty}>No leads found</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Source</th>
            <th>Status</th>
            <th style={{ width: 180 }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className={styles.row}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.source}</td>
              <td>
                <span className={`${styles.status} ${styles[lead.status]}`}>
                  {lead.status}
                </span>
              </td>
              <td>
                <div className={styles.actions}>
                  <Button
                    variant="secondary"
                    onClick={() => navigate(`/leads/${lead._id}`)}
                  >
                    View
                  </Button>

                  <Button
                    onClick={() => navigate(`/leads/${lead._id}/edit`)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => onDelete(lead._id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;

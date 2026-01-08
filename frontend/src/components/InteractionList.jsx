
import styles from "./InteractionList.module.css"

const typeLabel = {
  call: "📞 Call",
  email: "📧 Email",
  meeting: "🤝 Meeting",
}

const InteractionList = ({ interactions }) => {
  if (!Array.isArray(interactions) || interactions.length === 0) {
    return (
      <div className="styles.card">
        <h3 className={styles.title}>Interactions</h3>
        <p className="styles.empty">No interactions yet</p>
      </div>
    )
  }

  return (
    <div className="styles.card">
      <h3 className="styles.title">Interactions</h3>

      <ul className="styles.list">
        {interactions.map((i) => (
          <li
            key={i._id}
            className={`${styles.item} ${styles[i.type]}`}
          >
            <div className="styles.type">
              {typeLabel[i.type]}
            </div>

            <div className="styles.notes">{i.notes}</div>

            <div className="styles.meta">
              {/* by {i.createBy?.name || "User"} •{" "}
            {new Date(i.createAt).toLocaleDateString()} */}
              <small>
                by {i.createdBy?.name || "User"} •{"   "}
                {i.createdAt
                  ? new Date(i.createdAt).toLocaleDateString()
                  : "—"}
              </small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InteractionList;
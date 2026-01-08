import styles from "./OverdueTasksTable.module.css";

const OverdueTasksTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className={styles.empty}>No overdue follow-ups 🎉</p>;
    }

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Overdue Follow-ups</h3>

            <table className={styles.table}>
                <thead>      
                    <tr>
                        <th>Lead</th>
                        <th>Sales Rep</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((task) => (
                        <tr
                            key={task._id}
                            className={styles.rowOverdue}
                        >

                            <td className={styles.lead}>{task.lead.name}</td>
                            <td className={styles.rep}>{task.assignedTo.name}</td>
                            <td className={styles.overdue}>
                                {new Date(task.dueDate).toDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OverdueTasksTable;

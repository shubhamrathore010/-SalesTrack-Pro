import { useState } from "react";
import Button from "./Button";
import styles from "./TaskForm.module.css";

const TaskForm = ({
  leadId,
  users = [],
  onSubmit,
  isAdmin,
  submitText = "Create Task",
}) => {
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dueDate) {
      setError("Due date is required");
      return;
    }

    onSubmit({
      lead: leadId,
      dueDate,
      ...(isAdmin && assignedTo ? { assignedTo } : {}),
    });

    setDueDate("");
    setAssignedTo("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.card}>
      <h3 className={styles.title}>Create Follow-up Task</h3>

      {/* Due Date */}
      <div className={styles.field}>
        <label className={styles.label}>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      {/* Assign user (Admin only) */}
      {isAdmin && (
        <div className={styles.field}>
          <label className={styles.label}>Assign To</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          >
            <option value="">Select user</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <Button type="submit">{submitText}</Button>
      </div>
    </form>
  );
};

export default TaskForm;

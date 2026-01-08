import { completeTask, updateTask } from "../api/task.api";
import styles from "./TaskList.module.css";

const TaskList = ({ tasks, onRefresh }) => {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return <p className={styles.empty}>No tasks assigned</p>;
  }

  const pendingTasks = tasks.filter(
    (task) => task.status !== "completed"
  );
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  );

  const handleComplete = async (taskId) => {
    await completeTask(taskId);
    onRefresh();
  };

  const handleReschedule = async (taskId, dueDate) => {
    if (!dueDate) return;
    await updateTask(taskId, { dueDate });
    onRefresh();
  };

  const renderTask = (task) => {
    const isOverdue =
      new Date(task.dueDate) < new Date() &&
      task.status !== "completed";

    return (
      <div
        key={task._id}
        className={`${styles.task} ${
          task.status === "completed" ? styles.completed : ""
        }`}
      >
        <div className={styles.left}>
          <div className={styles.title}>{task.title}</div>

          <div className={styles.meta}>
            Due:{" "}
            <span className={isOverdue ? styles.overdue : ""}>
              {new Date(task.dueDate).toDateString()}
            </span>
          </div>
        </div>

        {task.status !== "completed" && (
          <div className={styles.actions}>
            <button
              className={styles.button}
              onClick={() => handleComplete(task._id)}
            >
              Complete
            </button>

            <input
              type="date"
              onChange={(e) =>
                handleReschedule(task._id, e.target.value)
              }
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Pending Tasks</div>
        {pendingTasks.length === 0 ? (
          <p className={styles.empty}>No pending tasks</p>
        ) : (
          pendingTasks.map(renderTask)
        )}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Completed Tasks</div>
        {completedTasks.length === 0 ? (
          <p className={styles.empty}>No completed tasks</p>
        ) : (
          completedTasks.map(renderTask)
        )}
      </div>
    </>
  );
};

export default TaskList;



import { useEffect, useState } from "react";
import { getMyTasks, completeTask } from "../api/task.api";

import { useNavigate } from "react-router-dom";
import styles from "./Tasks.module.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadTasks = async () => {
    const res = await getMyTasks();
    setTasks(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const markComplete = async (id) => {
    await completeTask(id);
    loadTasks();
  };

  if (loading) {
    return <p className={styles.muted}>Loading tasks…</p>;
  }

  return (
    <>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1>Tasks</h1>
      </div>

      {/* Empty State */}
      {tasks.length === 0 ? (
        <p className={styles.muted}>No tasks assigned</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Task</th>
              <th>Lead</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => {
              const isOverdue =
                task.status !== "completed" &&
                new Date(task.dueDate) < new Date();

              return (
                <tr key={task._id}>
                  <td>{task.title}</td>

                  <td>
                    <button
                      className={styles.link}
                      onClick={() => navigate(`/leads/${task.lead?._id}`)}
                    >
                      View Lead
                    </button>
                  </td>

                  <td
                    className={
                      isOverdue ? styles.overdue : undefined
                    }
                  >
                    {new Date(task.dueDate).toDateString()}
                  </td>

                  <td>
                    <span
                      className={`${styles.badge} ${
                        styles[task.status]
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td>
                    {task.status !== "completed" && (
                      <button
                        className={styles.primaryButton}
                        onClick={() => markComplete(task._id)}
                      >
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Tasks;

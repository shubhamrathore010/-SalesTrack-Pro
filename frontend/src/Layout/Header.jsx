

import { useAuth } from "../context/AuthContext";
import styles from "./Header.module.css";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <h2 className={styles.title}>Dashboard</h2>

      <div className={styles.right}>
        <input
          className={styles.search}
          placeholder="Search leads, tasks..."
        />

        <div className={styles.user}>
          <div className={styles.avatar}>
            {user?.name?.[0] || "U"}
          </div>
          <span className={styles.name}>{user?.name}</span>
          <button onClick={logout} className={styles.logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;


import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useAuth } from "../context/AuthContext";


const Sidebar = () => {
    const { user } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        {user?.name?.[0] || "CRM"}
        </div>

      <nav className={styles.nav}>
        {user.role === "admin" && (
        <NavLink
         to="/dashboard" 
         className={({ isActive }) =>
          // isActive ? styles.active : styles.link
         `${styles.link} ${isActive ? styles.active : ""}`
        }>
          {/* 📊 Dashboard */}
          <span className={styles.icon}>📊</span>
          <span className={styles.label}>Dashboard</span>
        </NavLink>
        )}

        <NavLink to="/leads" className={({ isActive }) =>
          // isActive ? styles.active : styles.link
         `${styles.link} ${isActive ? styles.active : ""}`
        }>
          {/* 👥 Leads */}
          <span className={styles.icon}>👥</span>
          <span className={styles.label}>Leads</span>
        </NavLink>

        <NavLink to="/tasks" className={({ isActive }) =>
          // isActive ? styles.active : styles.link
         `${styles.link} ${isActive ? styles.active : ""}`
        }>
          {/* 📝 Tasks */}
         <span className={styles.icon}>📝</span>
          <span className={styles.label}>Tasks</span>
        </NavLink>


        {user?.role === "admin" && (
  <NavLink to="/users" className={styles.link}>
    👤 Users
  </NavLink>
)}

      </nav>

      <div className={styles.footer}>© CRM System</div>
    </aside>
  );
};

export default Sidebar;


// import { useState } from "react";
// import { Link } from "react-router-dom";
// import styles from "./Sidebar.module.css";

// const Sidebar = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <aside
//       className={`${styles.sidebar} ${
//         collapsed ? styles.collapsed : styles.expanded
//       }`}
//     >
//       <Link to="/dashboard" className={styles.navItem}>
//         📊 {!collapsed && <span className={styles.label}>Dashboard</span>}
//       </Link>

//       <Link to="/leads" className={styles.navItem}>
//         👥 {!collapsed && <span className={styles.label}>Leads</span>}
//       </Link>

//       <Link to="/tasks" className={styles.navItem}>
//         ✅ {!collapsed && <span className={styles.label}>Tasks</span>}
//       </Link>
//     </aside>
//   );
// };

// export default Sidebar;

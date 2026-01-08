
import Sidebar from "./Sidebar";
import Header from "./Header";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.app}>
      <Header />

      <div className={styles.layout}>
        <Sidebar />

        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

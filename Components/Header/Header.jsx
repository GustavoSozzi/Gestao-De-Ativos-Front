import styles from "./Header.module.css";
import { FiSearch, FiBell, FiUser } from "react-icons/fi";

const Header = ({ title }) => {
  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.pageTitle}>{title}</h1>

      <div className={styles.headerActions}>
        <button className={styles.iconButton}>
          <FiSearch />
        </button>

        <button className={styles.iconButton}>
          <FiBell />
        </button>

        <div className={styles.userAvatar}>
          <FiUser />
        </div>
      </div>
    </header>
  );
};

export default Header;

import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.brand}>
        Blog<span>Firebase</span>
      </NavLink>
      <ul className={styles.nav_links}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : "")}>
            Sobre
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

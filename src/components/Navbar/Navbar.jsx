import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";
import LogoIcon from "../Icons/LogoIcon";

function Navbar() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.brand}>
        <LogoIcon width={32} height={32} />
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
        <li>
          <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : "")}>
            Cadastre-se
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

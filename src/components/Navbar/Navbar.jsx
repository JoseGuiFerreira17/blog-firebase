import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";
import LogoIcon from "../Icons/LogoIcon";

import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";

function Navbar() {
  const { user } = useAuthValue();

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
        {!user && (
          <>
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
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create-post"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Criar Post
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

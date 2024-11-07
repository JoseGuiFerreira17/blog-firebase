import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <h3>Escreva sobre o que você tem interesse!</h3>
      <p>Blog React & Firebase &copy; {new Date().getFullYear()}</p>
      <p>
        Desenvolvido por{" "}
        <a href="https://www.linkedin.com/in/jose-gui/" target="_blank">
          José Guilherme Mouta Ferreira
        </a>
      </p>
    </footer>
  );
}

export default Footer;

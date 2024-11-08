import styles from "./About.module.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Blog <span>Firebase</span>
      </h2>
      <p>Este projeco consiste em um blog feito com React no front-end e Firebase no back-end</p>
      <Link to="/create-post" className="btn">
        Criar Post
      </Link>
    </div>
  );
}

export default About;

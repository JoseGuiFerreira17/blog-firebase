import styles from "./Register.module.css";
import { useState, useEffect } from "react";

function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = { displayName, email, password };

    if (password !== passwordConfirmation) {
      setError("Senhas não conferem");
      return;
    }

    console.log(user);
  };

  return (
    <div className={styles.register}>
      <h1>Cadastre-se</h1>
      <p>Crie seu usuário e compartilhe suas histórias!</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome do usuário"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label htmlFor="">
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="Email do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="">
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Senha do usuário"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="">
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="passwordConfirmation"
            required
            placeholder="Confirme a sua senha"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </label>
        <button className="btn">Cadastrar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Register;

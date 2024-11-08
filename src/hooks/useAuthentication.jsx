import { db, auth } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(user, {
        displayName: data.name,
      });
      setLoading(false);
      return user;
    } catch (error) {
      let systemError;
      if (error.message.includes("Password")) {
        systemError = "Senha deve ter no mínimo 6 caracteres";
      } else if (error.message.includes("email-already")) {
        systemError = "Email já cadastrado";
      } else {
        systemError = "Erro ao criar usuário";
      }
      setLoading(false);
      setError(systemError);
    }
  };

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  const signIn = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemError;
      if (error.message.includes("user-not-found")) {
        systemError = "Usuário não encontrado";
      } else if (error.message.includes("wrong-password")) {
        systemError = "Senha inválida";
      } else if (error.message.includes("invalid-login")) {
        systemError = "Credenciais inválidas";
      } else {
        systemError = "Erro ao logar";
      }
      setLoading(false);
      setError(systemError);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    signIn,
  };
};

import { db } from "../firebase/config";
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

  const auth = getAuth();

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

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
  };
};

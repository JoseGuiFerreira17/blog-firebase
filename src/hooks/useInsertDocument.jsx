import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "error":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useInsertDocument = (docColection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelledBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (docData) => {
    checkCancelledBeforeDispatch({ type: "LOADING" });
    try {
      const newDocument = { ...docData, createdAt: Timestamp.now() };
      const insertedDocument = await addDoc(collection(db, docColection), newDocument);

      checkCancelledBeforeDispatch({ type: "INSERTED_DOC", payload: insertedDocument });
    } catch (error) {
      checkCancelledBeforeDispatch({ type: "error", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { insertDocument, response };
};

import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "error":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdateDocument = (docColection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelledBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updateDocument = async (docData, id) => {
    checkCancelledBeforeDispatch({ type: "LOADING" });
    try {
      const updatedDocument = await updateDoc(doc(db, docColection, id), docData);

      checkCancelledBeforeDispatch({ type: "UPDATED_DOC", payload: updatedDocument });
    } catch (error) {
      checkCancelledBeforeDispatch({ type: "error", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { updateDocument, response };
};

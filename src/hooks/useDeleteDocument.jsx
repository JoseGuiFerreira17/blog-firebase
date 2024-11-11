import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETD_DOC":
      return { loading: false, error: null };
    case "error":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeleteDocument = (docColection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelledBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const deleteDocument = async (id) => {
    checkCancelledBeforeDispatch({ type: "LOADING" });
    try {
      const deletedDocument = await deleteDoc(doc(db, docColection, id));

      checkCancelledBeforeDispatch({ type: "DELETED_DOC", payload: deletedDocument });
    } catch (error) {
      checkCancelledBeforeDispatch({ type: "error", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { deleteDocument, response };
};

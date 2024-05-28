import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";

export default function useSignin() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const signin = async (email, password) => {
    try {
      setLoading(true);
      let response = await signInWithEmailAndPassword(auth, email, password);
      setError("");
      setLoading(false);

      return response.user;
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };
  return { error, loading, signin };
}

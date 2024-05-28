import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";

export default function useSignup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const signup = async (email, password) => {
    try {
      setLoading(true);
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setError("");
      setLoading(false);

      return response.user;
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };
  return { error, loading, signup };
}

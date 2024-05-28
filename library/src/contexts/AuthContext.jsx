import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, user: action.payload };
    case "USER_LOGOUT":
      return { ...state, user: null };
    case "AUTH_READY":
      return { ...state, authReady: true };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(AuthReducer, {
    user: null,
    authReady: false,
  });
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH_READY" });
      if (user) {
        dispatch({ type: "USER_LOGIN", payload: user });
      } else {
        dispatch({ type: "USER_LOGOUT" });
      }
    });
  }, []);
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthContextProvider };

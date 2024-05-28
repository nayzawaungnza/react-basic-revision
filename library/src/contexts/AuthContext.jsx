import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, user: action.payload };
      break;
    case "USER_LOGOUT":
      return { ...state, user: null };
      break;
    default:
      return state;
      break;
  }
};

const AuthContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(AuthReducer, { user: null });
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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

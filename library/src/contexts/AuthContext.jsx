import { createContext } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ user: "mgmg" }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthContextProvider };

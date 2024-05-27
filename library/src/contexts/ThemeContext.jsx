import { createContext, useReducer } from "react";

const ThemeContext = createContext();
let ThemeReducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, theme: action.payload };

    default:
      return state;
  }
};

const ThemeContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(ThemeReducer, {
    theme: "light",
  });
  let changeTheme = (theme) => {
    //action -> type + payload
    dispatch({ type: "CHANGE_THEME", payload: theme });
  };
  const isDark = state.theme === "dark";
  return (
    <ThemeContext.Provider value={{ ...state, isDark, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeContextProvider };

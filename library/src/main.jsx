import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./router/index";

import { ThemeContextProvider } from "./contexts/ThemeContext.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <Router />
    </ThemeContextProvider>
  </AuthContextProvider>
);

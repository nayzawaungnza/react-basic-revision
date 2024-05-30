import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./style.css";
import useTheme from "../../hooks/useTheme";
export default function Layouts() {
  let location = useLocation();
  let { isDark } = useTheme();

  useEffect(() => {
    let body = document.body;
    if (isDark) {
      body.classList.add("bg-dbg");
    } else {
      body.classList.remove("bg-dbg");
    }
  }, [isDark]);
  return (
    <div className={`${isDark ? "bg-dbg" : "bg-white"}`}>
      <Navbar />
      {/* dynamic router changes content */}
      <SwitchTransition>
        <CSSTransition timeout={200} classNames="fade" key={location.pathname}>
          <div className="md:max-w-6xl max-w-full  mx-auto p-3">
            <Outlet />
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

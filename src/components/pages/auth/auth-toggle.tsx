"use client";
import React from "react";
import { IAuthProps } from "@/interfaces/auth";
import "./styles.css";

const AuthToggle: React.FC<Omit<IAuthProps, "intitial">> = ({
  toggle,
  handleToggle,
}) => {
  return (
    <div className="toggle-container">
      <div className={`toggle-slider ${toggle}`} />
      <button
        className={`toggle-option ${toggle === "login" ? "active" : ""}`}
        onClick={() => handleToggle("login")}
      >
        Login
      </button>
      <button
        className={`toggle-option ${toggle === "signup" ? "active" : ""}`}
        onClick={() => handleToggle("signup")}
      >
        Signup
      </button>
    </div>
  );
};

export { AuthToggle };

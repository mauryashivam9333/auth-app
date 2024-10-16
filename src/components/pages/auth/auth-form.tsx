"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  AuthLoginForm,
  AuthSignupForm,
  AuthToggle,
} from "@/components/pages/auth";
import { IInitialTransitionValues } from "@/interfaces/auth";
import "./styles.css";

const AuthForm: React.FC = () => {
  const [toggle, setToggle] = useState<"login" | "signup">("signup");
  const [intitial, setInitial] = useState<IInitialTransitionValues | boolean>(
    false
  );
  const handleToggle = (value: "login" | "signup") => {
    setToggle(value);
    if (value === "login") {
      setInitial({ opacity: 0, x: 100 });
    } else {
      setInitial({ opacity: 0, x: -100 });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{
        duration: 0.4,
        delay: 0.6,
      }}
      className="auth-form"
    >
      <AuthToggle toggle={toggle} handleToggle={handleToggle} />
      {toggle === "login" ? (
        <AuthLoginForm handleToggle={handleToggle} intitial={intitial} />
      ) : (
        <AuthSignupForm intitial={intitial} />
      )}
    </motion.div>
  );
};

export { AuthForm };

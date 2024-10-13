"use client";
import { useState } from "react";
import {
  AuthLoginForm,
  AuthSignupForm,
  AuthToggle,
} from "@/components/pages/auth";
import "./styles.css";
import { IInitialTransitionValues } from "@/interfaces/auth";

// const authForm = {
//   login: <AuthLoginForm />,
//   signup: <AuthSignupForm />,
// };

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
    <div className={"auth-form"}>
      <AuthToggle toggle={toggle} handleToggle={handleToggle} />
      {toggle === "login" ? (
        <AuthLoginForm handleToggle={handleToggle} intitial={intitial} />
      ) : (
        <AuthSignupForm intitial={intitial} />
      )}
      {/* {authForm[toggle]} */}
    </div>
  );
};

export { AuthForm };

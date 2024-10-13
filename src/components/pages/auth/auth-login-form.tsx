"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import {
  IAuthProps,
  ILoginFormValues,
  ILoginResponse,
} from "@/interfaces/auth";
import { Button, InputField } from "@/components/common";
import { hashPassword, storageLocal } from "@/urils/controller";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const AuthLoginForm: React.FC<Omit<IAuthProps, "toggle">> = ({
  handleToggle,
  intitial,
}) => {
  const router = useRouter();
  const { getData } = storageLocal();

  const handleLoginSubmit = async (
    values: ILoginFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const user: ILoginFormValues = getData("user");
    const cryptPassword = await hashPassword(values.password);

    if (
      user &&
      user.email === values.email &&
      user.password === cryptPassword
    ) {
      await apiLogin(user);
      router.push("/welcome");
    } else {
      alert("Invalid email or password.");
    }

    setSubmitting(false);
  };

  const apiLogin = async (values: ILoginFormValues) => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      onLoginSuccess(data);
    } catch (error) {
      console.log(error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={typeof intitial === "boolean" ? false : { ...intitial }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{
        duration: 0.6,
        ease: [0.68, -0.55, 0.265, 1.55],
      }}
      className="form-wrapper slide-in-right"
    >
      <h1 className="title login-title">Login Form</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLoginSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <InputField
              name="email"
              type="email"
              className=""
              placeholder="Email"
            />

            <InputField
              name="password"
              type="password"
              className=""
              placeholder="Password"
            />

            <p className="forgot-password">Forgot Password?</p>

            <Button
              type="submit"
              text={isSubmitting ? "Logging in..." : "Log In"}
              disabled={isSubmitting || !isValid}
              className="login"
            />
            <p className="be-a-member">
              Not a member?{" "}
              <span onClick={() => handleToggle("signup")}>Signup now</span>
            </p>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export { AuthLoginForm };

const onLoginSuccess = (response: ILoginResponse) => {
  console.log({ response });
  const { fullName } = response.user;
  alert(`${response.message}! \nName: ${fullName}`);
};

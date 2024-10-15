"use client";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { IAuthProps, IFormValues } from "@/interfaces/auth";
import { CONSTANTS } from "@/urils/constants";
import { InputField } from "@/components/common/input";
import { Button } from "@/components/common";
import { hashPassword, storageLocal } from "@/urils/controller";
import { withAuth } from "./with-auth";

// Validation
const validationSchema = Yup.object({
  fullName: Yup.string().required("First name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

const AuthSignupForm: React.FC<Pick<IAuthProps, "intitial">> = ({
  intitial,
}) => {
  const initialValues: IFormValues = CONSTANTS.DEFAULT_INITIAL_VALUES;
  const { setUser } = storageLocal();

  const handleSubmit = async (
    values: IFormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      const cryptPassword = await hashPassword(values.password);
      const cryptConfPassword = await hashPassword(values.confirmPassword);
      const userData = {
        ...values,
        password: cryptPassword,
        confirmPassword: cryptConfPassword,
      };
      setUser(userData, "user");
      alert("Registration successful!\nClick on login to verify.");
      resetForm();
    } catch (error) {
      console.error("Error during form submission", error);
    } finally {
      setSubmitting(false);
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
      className="form-wrapper slide-in-left"
    >
      <h1 className="title login-title">Signup Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="form">
            <InputField name="fullName" type="text" placeholder="Full Name" />
            <InputField name="email" placeholder="E-mail" type="email" />
            <InputField
              name="password"
              placeholder="Password"
              type="password"
            />
            <InputField
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
            />
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              text={isSubmitting ? "Submitting..." : "Sign Up"}
              className="signup"
            />
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default withAuth(AuthSignupForm);

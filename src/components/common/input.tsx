import React from "react";
import { Field, ErrorMessage } from "formik";
import { IInputFieldProps } from "@/interfaces/common";

const InputField: React.FC<IInputFieldProps> = ({
  name,
  type,
  placeholder,
  disabled = false,
  className = "",
}) => {
  return (
    <div className="form-control">
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className={`input ${className}`}
        disabled={disabled}
      />
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export { InputField };

import React from "react";
import { IButtonProps } from "@/interfaces/common";

const Button: React.FC<IButtonProps> = ({
  type,
  onClick,
  disabled = false,
  children,
  className = "",
  text = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button ${className}`}
    >
      {text}
      {children}
    </button>
  );
};

export { Button };

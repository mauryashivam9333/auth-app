export interface IButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  text: string;
}

export interface IInputFieldProps {
  name: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
  className?: string;
}

type TAuthAction = "login" | "signup";

export interface IFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginResponse {
  message: string;
  user: IFormValues;
}

export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IAuthProps {
  intitial: IInitialTransitionValues | boolean;
  toggle: string;
  handleToggle: (value: TAuthAction) => void;
}

export interface IInitialTransitionValues {
  opacity: number;
  x: number;
}

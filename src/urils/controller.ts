import { IFormValues } from "@/interfaces/auth";

export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

export const storageLocal = () => {
  const getData = (name: string) => {
    const user = localStorage.getItem(name);
    return user ? JSON.parse(user) : null;
  };

  const setUser = (userData: IFormValues, name: string) => {
    localStorage.setItem(name, JSON.stringify(userData));
  };

  const removeData = (name: string) => {
    localStorage.removeItem(name);
  };
  return { getData, setUser, removeData };
};

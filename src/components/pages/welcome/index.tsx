"use client";
import { useRouter } from "next/navigation";
import { PowerOffIcon } from "@/icons";
import { storageLocal } from "@/urils/controller";
import { withAuthProtected } from "../auth";

const WelcomePage: React.FC = () => {
  const router = useRouter();
  const { removeData } = storageLocal();

  const handleLogout = () => {
    removeData("user");
    router.push("/");
  };

  return (
    <>
      <div onClick={handleLogout} className="logout-icon">
        <PowerOffIcon />
      </div>
      <div className="welcome-page">
        <h1>Welcome!</h1>
        <p>You have successfully logged in.</p>
      </div>
    </>
  );
};

export default withAuthProtected(WelcomePage);

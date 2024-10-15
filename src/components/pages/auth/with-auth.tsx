"use client";
import { ComponentType, useEffect } from "react";
import { storageLocal } from "@/urils/controller";
import { useRouter } from "next/navigation";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const { getData } = storageLocal();

    useEffect(() => {
      const user = getData("user");
      if (user && user?.fullName) {
        router.replace("/welcome");
      }
    }, [router, getData]);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export { withAuth };

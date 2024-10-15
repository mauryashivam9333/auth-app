"use client";
import { ComponentType, useEffect } from "react";
import { useRouter } from "next/navigation";
import { storageLocal } from "@/urils/controller";

const withAuthProtected = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const WithAuthProtected: React.FC<P> = (props) => {
    const router = useRouter();
    const { getData } = storageLocal();

    useEffect(() => {
      const user = getData("user");
      if (!user) {
        router.replace("/");
      }
    }, [router, getData]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthProtected;
};

export { withAuthProtected };


"use client"
import { LoadingPage } from "@/components/loading-page";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type AuthGuardProps = {
  children: ReactNode;
  redirectTo?: string; // opcional, por defecto /auth
};

export default function AuthGuard({ children, redirectTo = "/auth" }: AuthGuardProps) {
  const { user, loading } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    console.log("AuthGuard: user", user);
    console.log("AuthGuard: loading", loading);
    if (!loading && !user) {
      router.replace(redirectTo); // redirige si no hay usuario

    }
  }, [loading, user, router, redirectTo]);

  if (loading) return <LoadingPage />; 


  if (!user) return null;

  return <>{children}</>;
}

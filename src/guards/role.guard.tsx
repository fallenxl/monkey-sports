"use client";

import { LoadingPage } from "@/components/loading-page";
import { useUserWithRole } from "@/hooks/useUserWithRole";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type RoleGuardProps = {
  children: ReactNode;
  allowedRoles: string[]; // ejemplo: ["admin"]
  redirectTo?: string;
};

export default function RoleGuard({
  children,
  allowedRoles,
  redirectTo = "/",
}: RoleGuardProps) {
  const { user, role, loading } = useUserWithRole();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !role || !allowedRoles.includes(role))) {
      router.replace(redirectTo);
    }
  }, [loading, user, role, allowedRoles, router, redirectTo]);

  if (loading) return <LoadingPage />;

  if (!user || !role || !allowedRoles.includes(role)) return null;

  return <>{children}</>;
}

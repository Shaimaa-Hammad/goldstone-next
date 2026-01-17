"use client";

import { useRouter } from "next/navigation";
import { usePrefetchRoutes } from "@/hooks/use-prefetch-routes";
import { RegisterView } from "./RegisterView";

const AUTH_PREFETCH_ROUTES = ["/dashboard", "/trading/listings"];

export default function RegisterPage() {
  const router = useRouter();
  usePrefetchRoutes(AUTH_PREFETCH_ROUTES);

  const handleRegister = (data) => {
    console.log("Register:", data);
    router.push("/dashboard");
  };

  return <RegisterView onNavigate={router.push} onRegister={handleRegister} />;
}

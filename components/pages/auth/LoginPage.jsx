"use client";

import { useRouter } from "next/navigation";
import { usePrefetchRoutes } from "@/hooks/use-prefetch-routes";
import { LoginView } from "./LoginView";

const AUTH_PREFETCH_ROUTES = ["/dashboard", "/trading/listings"];

export default function LoginPage() {
  const router = useRouter();
  usePrefetchRoutes(AUTH_PREFETCH_ROUTES);

  const handleLogin = (email, password) => {
    console.log("Login:", { email, password });
    router.push("/dashboard");
  };

  return <LoginView onNavigate={router.push} onLogin={handleLogin} />;
}

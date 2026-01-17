"use client";

import { PublicNavbar } from "./PublicNavbar";
import { PublicFooter } from "./PublicFooter";
import { usePrefetchRoutes } from "@/hooks/use-prefetch-routes";

const PUBLIC_PREFETCH_ROUTES = [
  "/market",
  "/merchants",
  "/login",
  "/register",
  "/dashboard",
];
export function PublicShell({ children }) {
    usePrefetchRoutes(PUBLIC_PREFETCH_ROUTES);
    return (<div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        {children}
      </main>
      <PublicFooter />
    </div>);
}

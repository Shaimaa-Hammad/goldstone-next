"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function usePrefetchRoutes(routes = []) {
  const router = useRouter();

  useEffect(() => {
    if (!routes.length) return undefined;
    let cancelled = false;

    const prefetch = () => {
      if (cancelled) return;
      routes.forEach((route) => {
        if (route) router.prefetch(route);
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 1500 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const id = setTimeout(prefetch, 200);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [router, routes]);
}

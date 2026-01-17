"use client";

import { useRouter } from "next/navigation";
import { DashboardView } from "./DashboardView";

export default function DashboardPage() {
  const router = useRouter();

  return <DashboardView onNavigate={router.push} />;
}

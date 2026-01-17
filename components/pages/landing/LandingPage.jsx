"use client";

import { useRouter } from "next/navigation";
import { LandingView } from "./LandingView";

export default function LandingPage() {
  const router = useRouter();

  return <LandingView onNavigate={router.push} />;
}

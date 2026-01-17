"use client";

import { useRouter } from "next/navigation";
import { TradingView } from "./TradingView";

export default function TradingPage() {
  const router = useRouter();

  return <TradingView onNavigate={router.push} />;
}

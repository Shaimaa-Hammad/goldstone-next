"use client";

import { useRouter } from "next/navigation";
import { MarketView } from "./MarketView";

export default function MarketPage() {
  const router = useRouter();

  return <MarketView onNavigate={router.push} />;
}

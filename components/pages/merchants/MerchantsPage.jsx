"use client";

import { useRouter } from "next/navigation";
import { MerchantsView } from "./MerchantsView";

export default function MerchantsPage() {
  const router = useRouter();

  return <MerchantsView onNavigate={router.push} />;
}

"use client";

import { useRouter } from "next/navigation";
import { ReserveView } from "./ReserveView";

export default function ReservePage() {
  const router = useRouter();

  return <ReserveView onNavigate={router.push} />;
}

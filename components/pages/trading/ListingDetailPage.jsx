"use client";

import { useRouter } from "next/navigation";
import { ListingDetailView } from "./ListingDetailView";

export default function ListingDetailPage({ listingId }) {
  const router = useRouter();

  return (
    <ListingDetailView listingId={listingId} onNavigate={router.push} />
  );
}

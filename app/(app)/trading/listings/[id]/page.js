import ListingDetailPage from "@/components/pages/trading/ListingDetailPage";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: "noindex, nofollow",
};

export default function Page({ params }) {
  return <ListingDetailPage listingId={params.id} />;
}

import { KYCView } from "@/components/pages/kyc/KYCView";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: "noindex, nofollow",
};

export default function Page() {
  return <KYCView />;
}

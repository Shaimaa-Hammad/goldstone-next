import { ProfileView } from "@/components/pages/profile/ProfileView";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: "noindex, nofollow",
};

export default function Page() {
  return <ProfileView />;
}

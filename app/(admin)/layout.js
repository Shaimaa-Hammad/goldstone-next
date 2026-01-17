import { AdminShell } from "@/components/layout/AdminShell";

export const metadata = {
  robots: "noindex, nofollow",
};

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}

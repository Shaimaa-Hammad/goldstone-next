"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Shield, Users, CreditCard, FileCheck, Settings, Menu, LogOut, Bell, Search, TrendingUp, } from "lucide-react";
import { usePrefetchRoutes } from "@/hooks/use-prefetch-routes";
import { useState } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
const adminLinks = [
    { href: "/admin/kyc-approvals", label: "KYC Approvals", icon: FileCheck },
    { href: "/admin/payment-approvals", label: "Payment Approvals", icon: CreditCard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/listings", label: "Listings", icon: Shield },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];
const ADMIN_PREFETCH_ROUTES = [
    ...adminLinks.map((link) => link.href),
    "/dashboard",
];
export function AdminShell({ children }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    usePrefetchRoutes(ADMIN_PREFETCH_ROUTES);
    const getBreadcrumbs = () => {
        const pathParts = pathname.split("/").filter(Boolean);
        const crumbParts = pathParts.slice(1);
        return crumbParts.map((part, index) => ({
            label: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "),
            href: index < crumbParts.length - 1 ? `/${pathParts.slice(0, index + 2).join("/")}` : undefined,
        }));
    };
    return (<div className="min-h-screen flex bg-background">
      {/* Sidebar Overlay */}
      {sidebarOpen && (<div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)}/>)}

      {/* Sidebar */}
      <aside className={cn("fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 lg:translate-x-0 lg:static", sidebarOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 px-6 h-16 border-b border-sidebar-border">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-destructive to-red-400">
              <Shield className="h-5 w-5 text-destructive-foreground"/>
            </div>
            <div>
              <span className="font-semibold text-sidebar-foreground">GoldTrade</span>
              <span className="ml-2 text-xs px-2 py-0.5 rounded bg-destructive/20 text-destructive">Admin</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {adminLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (<Link key={link.href} href={link.href} onClick={() => setSidebarOpen(false)} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent")}>
                  <link.icon className="h-5 w-5"/>
                  {link.label}
                </Link>);
        })}
          </nav>

          {/* Back to App */}
          <div className="p-4 border-t border-sidebar-border">
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <Link href="/dashboard">
                <TrendingUp className="h-4 w-4"/>
                Back to App
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 px-4 lg:px-6 h-16 border-b border-border bg-background/80 backdrop-blur-lg">
          <button className="lg:hidden p-2 rounded-lg hover:bg-secondary" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5"/>
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
              <input type="text" placeholder="Search users, transactions..." className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-secondary/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"/>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5"/>
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"/>
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5"/>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="mb-4">
            <Breadcrumbs items={getBreadcrumbs()} homeHref="/admin/kyc-approvals"/>
          </div>
          {children}
        </main>
      </div>
    </div>);
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, User, ShieldCheck, TrendingUp, Package, Clock, Truck, Menu, LogOut, Bell, Search, } from "lucide-react";
import { usePrefetchRoutes } from "@/hooks/use-prefetch-routes";
import { useState } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
const sidebarLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/kyc", label: "KYC Verification", icon: ShieldCheck },
    { href: "/trading/listings", label: "Trading", icon: TrendingUp },
    { href: "/trading/reserve/new", label: "Reserve", icon: Package },
    { href: "/escrow/ESC-2024-4521", label: "Escrow Orders", icon: Clock },
    { href: "/delivery/ESC-2024-4521", label: "Delivery", icon: Truck },
];
const APP_PREFETCH_ROUTES = sidebarLinks.map((link) => link.href);
export function AppShell({ children }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    usePrefetchRoutes(APP_PREFETCH_ROUTES);
    // Generate breadcrumb items from current path
    const getBreadcrumbs = () => {
        const pathParts = pathname.split("/").filter(Boolean);
        return pathParts.map((part, index) => ({
            label: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "),
            href: index < pathParts.length - 1 ? `/${pathParts.slice(0, index + 1).join("/")}` : undefined,
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
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-gold-400 shadow-gold">
              <TrendingUp className="h-5 w-5 text-primary-foreground"/>
            </div>
            <span className="font-semibold text-sidebar-foreground">GoldTrade</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (<Link key={link.href} href={link.href} onClick={() => setSidebarOpen(false)} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent")}>
                  <link.icon className="h-5 w-5"/>
                  {link.label}
                </Link>);
        })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="h-9 w-9 rounded-full bg-sidebar-accent flex items-center justify-center">
                <User className="h-5 w-5 text-sidebar-foreground"/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">john@example.com</p>
              </div>
              <Button variant="ghost" size="icon" className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
                <LogOut className="h-4 w-4"/>
              </Button>
            </div>
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
              <input type="text" placeholder="Search..." className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-secondary/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"/>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5"/>
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"/>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="mb-4">
            <Breadcrumbs items={getBreadcrumbs()} homeHref="/dashboard"/>
          </div>
          {children}
        </main>
      </div>
    </div>);
}

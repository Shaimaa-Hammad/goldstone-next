"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, TrendingUp } from "lucide-react";
import { useState } from "react";
const navLinks = [
    { href: "/", label: "Home" },
    { href: "/market", label: "Market" },
    { href: "/merchants", label: "Merchants" },
];
export function PublicNavbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (<header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-gold-400 shadow-gold">
            <TrendingUp className="h-5 w-5 text-primary-foreground"/>
          </div>
          <span className="hidden sm:inline-block">GoldTrade</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (<Link key={link.href} href={link.href} className={cn("px-4 py-2 text-sm font-medium rounded-lg transition-colors", pathname === link.href
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary")}>
              {link.label}
            </Link>))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button variant="gold" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded-lg hover:bg-secondary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (<div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container py-4 space-y-1">
            {navLinks.map((link) => (<Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className={cn("block px-4 py-3 text-sm font-medium rounded-lg transition-colors", pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary")}>
                {link.label}
              </Link>))}
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
              </Button>
              <Button variant="gold" className="w-full" asChild>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>)}
    </header>);
}

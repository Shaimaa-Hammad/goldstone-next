"use client";

import Link from "next/link";
import { TrendingUp, Twitter, Linkedin, Github, Mail } from "lucide-react";
export function PublicFooter() {
    const currentYear = new Date().getFullYear();
    return (<footer className="border-t border-border bg-secondary/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-gold-400 shadow-gold">
                <TrendingUp className="h-5 w-5 text-primary-foreground"/>
              </div>
              <span>GoldTrade</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              The premier platform for secure gold trading. Trade with confidence.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <Twitter className="h-4 w-4 text-muted-foreground"/>
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <Linkedin className="h-4 w-4 text-muted-foreground"/>
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <Github className="h-4 w-4 text-muted-foreground"/>
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <Mail className="h-4 w-4 text-muted-foreground"/>
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/market" className="text-muted-foreground hover:text-foreground transition-colors">Market</Link></li>
              <li><Link href="/merchants" className="text-muted-foreground hover:text-foreground transition-colors">Merchants</Link></li>
              <li><Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link href="/trading/listings" className="text-muted-foreground hover:text-foreground transition-colors">Trading</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Press</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Compliance</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} GoldTrade. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Secure • Compliant • Trusted
          </p>
        </div>
      </div>
    </footer>);
}

"use client";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { TrendingUp, Wallet, RefreshCw, ArrowUpRight, ArrowDownRight, Lock, Plus, ShoppingBag, Package, FileText, AlertCircle, } from "lucide-react";
// Mock data - API REQUEST HERE
const dashboardData = {
    balance: {
        total: 125430.50,
        available: 98250.00,
        escrow: 27180.50,
        change24h: 2.4,
    },
    gold: {
        holding: 1.25,
        value: 80550.00,
        change24h: 0.62,
    },
    stats: {
        totalTrades: 47,
        activeTrades: 3,
        completedTrades: 44,
        successRate: 98.2,
    },
};
const recentActivity = [
    { id: 1, type: "buy", description: "Purchased 100g Gold", time: "2 hours ago", amount: "+$6,490" },
    { id: 2, type: "sell", description: "Sold 50g Gold", time: "5 hours ago", amount: "-$3,245" },
    { id: 3, type: "deposit", description: "Deposit received", time: "1 day ago", amount: "+$10,000" },
    { id: 4, type: "escrow", description: "Escrow released", time: "2 days ago", amount: "+$15,200" },
];
const quickActions = [
    { label: "New Trade", icon: Plus, href: "/trading/listings", variant: "gold" },
    { label: "Buy Gold", icon: ShoppingBag, href: "/trading/reserve/new", variant: "outline" },
    { label: "View Escrow", icon: Lock, href: "/escrow/ESC-2024-4521", variant: "outline" },
    { label: "Track Delivery", icon: Package, href: "/delivery/ESC-2024-4521", variant: "outline" },
];
export function DashboardView({ onNavigate }) {
    const isKYCVerified = true; // API REQUEST HERE
    return (<div>
      <PageHeader title="Dashboard" subtitle="Welcome back! Here's your trading overview." actions={<Button variant="gold" onClick={() => onNavigate("/trading/listings")}>
            <Plus className="h-4 w-4 mr-2"/>
            New Trade
          </Button>}/>

      {/* KYC Banner */}
      {!isKYCVerified && (<div className="mb-6 p-4 rounded-xl bg-warning/10 border border-warning/20 flex items-center gap-4">
          <AlertCircle className="h-5 w-5 text-warning flex-shrink-0"/>
          <div className="flex-1">
            <p className="font-medium">Complete your verification</p>
            <p className="text-sm text-muted-foreground">
              Verify your identity to unlock higher trading limits
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => onNavigate("/kyc")}>
            <FileText className="h-4 w-4 mr-2"/>
            Start KYC
          </Button>
        </div>)}

      {/* Balance Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-xl bg-card shadow-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Wallet className="h-5 w-5 text-primary"/>
            </div>
            <span className="text-sm text-muted-foreground">Total Balance</span>
          </div>
          <div className="text-2xl font-bold mb-1">
            ${dashboardData.balance.total.toLocaleString()}
          </div>
          <div className={`text-sm flex items-center gap-1 ${dashboardData.balance.change24h >= 0 ? "text-success" : "text-destructive"}`}>
            {dashboardData.balance.change24h >= 0 ? (<ArrowUpRight className="h-3 w-3"/>) : (<ArrowDownRight className="h-3 w-3"/>)}
            {dashboardData.balance.change24h}% today
          </div>
        </div>

        <div className="p-5 rounded-xl bg-card shadow-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-success/10">
              <RefreshCw className="h-5 w-5 text-success"/>
            </div>
            <span className="text-sm text-muted-foreground">Available</span>
          </div>
          <div className="text-2xl font-bold mb-1">
            ${dashboardData.balance.available.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Ready to trade</div>
        </div>

        <div className="p-5 rounded-xl bg-card shadow-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Lock className="h-5 w-5 text-warning"/>
            </div>
            <span className="text-sm text-muted-foreground">In Escrow</span>
          </div>
          <div className="text-2xl font-bold mb-1">
            ${dashboardData.balance.escrow.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">3 active trades</div>
        </div>

        <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-gold-100 border border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <TrendingUp className="h-5 w-5 text-primary"/>
            </div>
            <span className="text-sm text-muted-foreground">Gold Holdings</span>
          </div>
          <div className="text-2xl font-bold gold-gradient-text mb-1">
            {dashboardData.gold.holding} kg
          </div>
          <div className="text-sm text-muted-foreground">
            ≈ ${dashboardData.gold.value.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (<Button key={action.label} variant={action.variant} className="h-auto py-4 flex-col gap-2" onClick={() => onNavigate(action.href)}>
              <action.icon className="h-5 w-5"/>
              {action.label}
            </Button>))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl bg-card shadow-card overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold">Recent Activity</h2>
          <Button variant="ghost" size="sm" onClick={() => onNavigate("/trading/listings")}>
            View All
          </Button>
        </div>
        <div className="divide-y divide-border">
          {recentActivity.map((activity) => (<div key={activity.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.type === "buy" || activity.type === "deposit"
                ? "bg-success/10"
                : activity.type === "sell"
                    ? "bg-destructive/10"
                    : "bg-primary/10"}`}>
                  {activity.type === "buy" || activity.type === "deposit" ? (<ArrowDownRight className="h-5 w-5 text-success"/>) : activity.type === "sell" ? (<ArrowUpRight className="h-5 w-5 text-destructive"/>) : (<Lock className="h-5 w-5 text-primary"/>)}
                </div>
                <div>
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
              <div className={`font-semibold ${activity.amount.startsWith("+") ? "text-success" : "text-destructive"}`}>
                {activity.amount}
              </div>
            </div>))}
        </div>
      </div>
    </div>);
}

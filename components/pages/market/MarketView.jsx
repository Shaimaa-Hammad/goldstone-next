"use client";

import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Clock, ArrowUpRight, RefreshCw, } from "lucide-react";
// Mock market data - API REQUEST HERE
const marketData = {
    spotPrice: 2034.56,
    change24h: 12.45,
    changePercent: 0.62,
    high24h: 2045.00,
    low24h: 2018.32,
    lastUpdated: "2 minutes ago",
};
// Mock listings - API REQUEST HERE
const featuredListings = [
    {
        id: "1",
        type: "sell",
        amount: "500g",
        purity: "999.9",
        price: 32450,
        merchant: "GoldSource Ltd",
        rating: 4.9,
        verified: true,
    },
    {
        id: "2",
        type: "sell",
        amount: "1kg",
        purity: "999.9",
        price: 64800,
        merchant: "Premium Metals",
        rating: 4.8,
        verified: true,
    },
    {
        id: "3",
        type: "buy",
        amount: "250g",
        purity: "995",
        price: 15900,
        merchant: "Metro Gold",
        rating: 4.7,
        verified: true,
    },
    {
        id: "4",
        type: "sell",
        amount: "100g",
        purity: "999.9",
        price: 6520,
        merchant: "Swiss Vault",
        rating: 5.0,
        verified: true,
    },
];
export function MarketView({ onNavigate }) {
    const isPositive = marketData.change24h >= 0;
    return (<div className="py-12 lg:py-20">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Market Overview</h1>
          <p className="text-lg text-muted-foreground">
            Real-time gold prices and market data. Track trends and find the best deals.
          </p>
        </div>

        {/* Price Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="p-6 lg:p-8 rounded-2xl bg-card shadow-card">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <span className="text-sm font-medium">XAU/USD Spot Price</span>
                  <span className="flex items-center gap-1 text-xs">
                    <Clock className="h-3 w-3"/>
                    {marketData.lastUpdated}
                  </span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl lg:text-5xl font-bold">
                    ${marketData.spotPrice.toLocaleString()}
                  </span>
                  <div className={`flex items-center gap-1 text-lg font-medium ${isPositive ? "text-success" : "text-destructive"}`}>
                    {isPositive ? (<TrendingUp className="h-5 w-5"/>) : (<TrendingDown className="h-5 w-5"/>)}
                    <span>
                      {isPositive ? "+" : ""}${marketData.change24h.toFixed(2)} ({marketData.changePercent}%)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 lg:gap-8">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">24h High</div>
                  <div className="text-lg font-semibold text-success">
                    ${marketData.high24h.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">24h Low</div>
                  <div className="text-lg font-semibold text-destructive">
                    ${marketData.low24h.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Price Chart Placeholder */}
            <div className="mt-8 h-48 rounded-xl bg-secondary/50 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <RefreshCw className="h-8 w-8 mx-auto mb-2 animate-pulse"/>
                <p className="text-sm">Price chart will load here</p>
                <p className="text-xs"> API REQUEST HERE - Chart data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Listings */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Listings</h2>
            <Button variant="outline" onClick={() => onNavigate("/trading/listings")}>
              View All
              <ArrowUpRight className="ml-2 h-4 w-4"/>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredListings.map((listing) => (<div key={listing.id} className="p-5 rounded-xl bg-card shadow-card card-hover">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${listing.type === "sell"
                ? "bg-success/10 text-success"
                : "bg-info/10 text-info"}`}>
                    {listing.type === "sell" ? "For Sale" : "Wanted"}
                  </span>
                  {listing.verified && (<span className="text-xs text-primary">Verified</span>)}
                </div>
                <div className="mb-3">
                  <div className="text-lg font-bold">{listing.amount}</div>
                  <div className="text-sm text-muted-foreground">
                    Purity: {listing.purity}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold gold-gradient-text">
                    ${listing.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground truncate">{listing.merchant}</span>
                  <span className="flex items-center gap-1">
                    ⭐ {listing.rating}
                  </span>
                </div>
              </div>))}
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-xl bg-card shadow-card">
            <div className="text-sm text-muted-foreground mb-1">24h Volume</div>
            <div className="text-2xl font-bold">$45.2M</div>
            <div className="text-sm text-success">+12.5% from yesterday</div>
          </div>
          <div className="p-6 rounded-xl bg-card shadow-card">
            <div className="text-sm text-muted-foreground mb-1">Active Listings</div>
            <div className="text-2xl font-bold">1,247</div>
            <div className="text-sm text-muted-foreground">Across 89 merchants</div>
          </div>
          <div className="p-6 rounded-xl bg-card shadow-card">
            <div className="text-sm text-muted-foreground mb-1">Avg. Completion Time</div>
            <div className="text-2xl font-bold">2.4 days</div>
            <div className="text-sm text-success">-8% from last week</div>
          </div>
        </div>
      </div>
    </div>);
}

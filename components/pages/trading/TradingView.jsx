"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/PageHeader";
import { Search, Filter, Grid, List, Star, Shield, MapPin, ArrowUpDown, } from "lucide-react";
// Mock listings data - API REQUEST HERE
const listings = [
    {
        id: "1",
        type: "sell",
        amount: "500g",
        purity: "999.9",
        price: 32450,
        pricePerGram: 64.90,
        merchant: "GoldSource Ltd",
        location: "London, UK",
        rating: 4.9,
        reviews: 342,
        verified: true,
        premium: true,
        createdAt: "2 hours ago",
        description: "LBMA certified gold bar, original packaging with certificate.",
    },
    {
        id: "2",
        type: "sell",
        amount: "1kg",
        purity: "999.9",
        price: 64800,
        pricePerGram: 64.80,
        merchant: "Swiss Vault AG",
        location: "Zurich, Switzerland",
        rating: 5.0,
        reviews: 189,
        verified: true,
        premium: true,
        createdAt: "5 hours ago",
        description: "Premium Swiss refined gold, vault stored, immediate availability.",
    },
    {
        id: "3",
        type: "buy",
        amount: "250g",
        purity: "995",
        price: 15900,
        pricePerGram: 63.60,
        merchant: "Metro Gold Trading",
        location: "Dubai, UAE",
        rating: 4.7,
        reviews: 567,
        verified: true,
        premium: false,
        createdAt: "1 day ago",
        description: "Looking to purchase 995 purity gold, flexible on quantity.",
    },
    {
        id: "4",
        type: "sell",
        amount: "100g",
        purity: "999.9",
        price: 6520,
        pricePerGram: 65.20,
        merchant: "Premium Metals Inc",
        location: "New York, USA",
        rating: 4.8,
        reviews: 234,
        verified: true,
        premium: true,
        createdAt: "3 hours ago",
        description: "Small bars available, perfect for retail buyers. COD available.",
    },
    {
        id: "5",
        type: "sell",
        amount: "2kg",
        purity: "999.9",
        price: 129200,
        pricePerGram: 64.60,
        merchant: "European Bullion Co",
        location: "Frankfurt, Germany",
        rating: 4.9,
        reviews: 156,
        verified: true,
        premium: true,
        createdAt: "6 hours ago",
        description: "Large quantity available, bulk discount for orders over 5kg.",
    },
    {
        id: "6",
        type: "buy",
        amount: "5kg",
        purity: "999.9",
        price: 320000,
        pricePerGram: 64.00,
        merchant: "Asian Gold Exchange",
        location: "Singapore",
        rating: 4.6,
        reviews: 412,
        verified: true,
        premium: false,
        createdAt: "12 hours ago",
        description: "Institutional buyer seeking large quantity. Competitive pricing.",
    },
];
export function TradingView({ onNavigate }) {
    const [viewMode, setViewMode] = useState("grid");
    const [filterType, setFilterType] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const filteredListings = listings.filter((listing) => {
        if (filterType !== "all" && listing.type !== filterType)
            return false;
        if (searchQuery && !listing.merchant.toLowerCase().includes(searchQuery.toLowerCase()))
            return false;
        return true;
    });
    return (<div>
      <PageHeader title="Trading" subtitle="Browse and create gold trading listings" actions={<Button variant="gold" onClick={() => onNavigate("/trading/reserve/new")}>
            Create Listing
          </Button>}/>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
          <Input type="text" placeholder="Search listings..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10"/>
        </div>
        
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-border overflow-hidden">
            {["all", "buy", "sell"].map((type) => (<button key={type} onClick={() => setFilterType(type)} className={`px-4 py-2 text-sm font-medium transition-colors ${filterType === type
                ? "bg-primary text-primary-foreground"
                : "bg-card hover:bg-secondary"}`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>))}
          </div>

          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4"/>
            <span className="hidden sm:inline">Filters</span>
          </Button>

          <Button variant="outline" className="gap-2">
            <ArrowUpDown className="h-4 w-4"/>
            <span className="hidden sm:inline">Sort</span>
          </Button>

          <div className="flex rounded-lg border border-border overflow-hidden">
            <button onClick={() => setViewMode("grid")} className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-secondary"}`}>
              <Grid className="h-4 w-4"/>
            </button>
            <button onClick={() => setViewMode("list")} className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-secondary"}`}>
              <List className="h-4 w-4"/>
            </button>
          </div>
        </div>
      </div>

      {/* Listings */}
      {viewMode === "grid" ? (<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredListings.map((listing) => (<button key={listing.id} onClick={() => onNavigate(`/trading/listings/${listing.id}`)} className="p-5 rounded-xl bg-card shadow-card card-hover block text-left w-full">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${listing.type === "sell"
                    ? "bg-success/10 text-success"
                    : "bg-info/10 text-info"}`}>
                  {listing.type === "sell" ? "For Sale" : "Wanted"}
                </span>
                {listing.premium && (<span className="px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                    Premium
                  </span>)}
              </div>

              <div className="mb-3">
                <div className="text-2xl font-bold">{listing.amount}</div>
                <div className="text-sm text-muted-foreground">
                  Purity: {listing.purity} • ${listing.pricePerGram}/g
                </div>
              </div>

              <div className="text-2xl font-bold gold-gradient-text mb-4">
                ${listing.price.toLocaleString()}
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">
                    {listing.merchant.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-sm truncate">{listing.merchant}</span>
                    {listing.verified && <Shield className="h-3 w-3 text-primary flex-shrink-0"/>}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3"/>
                    {listing.location}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-primary fill-primary"/>
                  <span className="text-sm font-medium">{listing.rating}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>

              <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                Posted {listing.createdAt}
              </div>
            </button>))}
        </div>) : (<div className="rounded-xl bg-card shadow-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground">Type</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Amount</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Price</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Merchant</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Location</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredListings.map((listing) => (<tr key={listing.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${listing.type === "sell"
                    ? "bg-success/10 text-success"
                    : "bg-info/10 text-info"}`}>
                      {listing.type === "sell" ? "Sell" : "Buy"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-medium">{listing.amount}</div>
                    <div className="text-xs text-muted-foreground">{listing.purity} purity</div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold gold-gradient-text">${listing.price.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">${listing.pricePerGram}/g</div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <span>{listing.merchant}</span>
                      {listing.verified && <Shield className="h-3 w-3 text-primary"/>}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 text-primary fill-primary"/>
                      {listing.rating}
                    </div>
                  </td>
                  <td className="p-4 hidden lg:table-cell text-muted-foreground">
                    {listing.location}
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="outline" size="sm" onClick={() => onNavigate(`/trading/listings/${listing.id}`)}>
                      View
                    </Button>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>)}

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline">Load More Listings</Button>
        <p className="text-sm text-muted-foreground mt-2">
          Showing {filteredListings.length} of 156 listings
        </p>
      </div>
    </div>);
}

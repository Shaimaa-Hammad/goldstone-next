"use client";

import { Button } from "@/components/ui/button";
import { Star, MapPin, Shield, Clock, Search, Filter, ChevronDown, } from "lucide-react";
// Mock merchants data - API REQUEST HERE
const merchants = [
    {
        id: "1",
        name: "GoldSource Ltd",
        location: "London, UK",
        rating: 4.9,
        reviews: 342,
        verified: true,
        premium: true,
        trades: 1250,
        volume: "$12.5M",
        responseTime: "< 1 hour",
        specialties: ["Bullion", "Coins", "Bars"],
        description: "Leading gold supplier with over 20 years of experience in precious metals trading.",
    },
    {
        id: "2",
        name: "Swiss Vault AG",
        location: "Zurich, Switzerland",
        rating: 5.0,
        reviews: 189,
        verified: true,
        premium: true,
        trades: 890,
        volume: "$24.8M",
        responseTime: "< 30 min",
        specialties: ["Investment Grade", "Secure Storage"],
        description: "Premium Swiss gold dealer specializing in high-value transactions and secure storage.",
    },
    {
        id: "3",
        name: "Metro Gold Trading",
        location: "Dubai, UAE",
        rating: 4.7,
        reviews: 567,
        verified: true,
        premium: false,
        trades: 2340,
        volume: "$8.2M",
        responseTime: "< 2 hours",
        specialties: ["Jewelry", "Scrap Gold", "Bullion"],
        description: "Dubai-based gold trader with extensive network in the Middle East.",
    },
    {
        id: "4",
        name: "Premium Metals Inc",
        location: "New York, USA",
        rating: 4.8,
        reviews: 234,
        verified: true,
        premium: true,
        trades: 675,
        volume: "$18.3M",
        responseTime: "< 1 hour",
        specialties: ["Institutional", "High Volume"],
        description: "US-based precious metals dealer serving institutional clients and high-net-worth individuals.",
    },
    {
        id: "5",
        name: "Asian Gold Exchange",
        location: "Singapore",
        rating: 4.6,
        reviews: 412,
        verified: true,
        premium: false,
        trades: 1890,
        volume: "$6.7M",
        responseTime: "< 3 hours",
        specialties: ["Regional Trade", "Bullion"],
        description: "Singapore-based exchange connecting buyers and sellers across Asia Pacific.",
    },
    {
        id: "6",
        name: "European Bullion Co",
        location: "Frankfurt, Germany",
        rating: 4.9,
        reviews: 156,
        verified: true,
        premium: true,
        trades: 445,
        volume: "$15.1M",
        responseTime: "< 1 hour",
        specialties: ["LBMA Certified", "Large Orders"],
        description: "German precious metals company with LBMA certification and European-wide delivery.",
    },
];
export function MerchantsView({ onNavigate }) {
    return (<div className="py-12 lg:py-20">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Verified Merchants</h1>
          <p className="text-lg text-muted-foreground">
            Connect with trusted gold dealers worldwide. All merchants are KYC verified 
            and rated by our community.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <input type="text" placeholder="Search merchants..." className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"/>
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4"/>
            Filters
            <ChevronDown className="h-4 w-4"/>
          </Button>
          <Button variant="outline" className="gap-2">
            <MapPin className="h-4 w-4"/>
            Location
            <ChevronDown className="h-4 w-4"/>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-card shadow-card text-center">
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-muted-foreground">Verified Merchants</div>
          </div>
          <div className="p-4 rounded-xl bg-card shadow-card text-center">
            <div className="text-2xl font-bold">52</div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </div>
          <div className="p-4 rounded-xl bg-card shadow-card text-center">
            <div className="text-2xl font-bold">4.8</div>
            <div className="text-sm text-muted-foreground">Avg. Rating</div>
          </div>
        </div>

        {/* Merchants Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {merchants.map((merchant) => (<div key={merchant.id} className="p-6 rounded-2xl bg-card shadow-card card-hover">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-gold-200 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {merchant.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{merchant.name}</h3>
                      {merchant.verified && (<Shield className="h-4 w-4 text-primary"/>)}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3"/>
                      {merchant.location}
                    </div>
                  </div>
                </div>
                {merchant.premium && (<span className="px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                    Premium
                  </span>)}
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {merchant.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 rounded-lg bg-secondary/50">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-3 w-3 text-primary fill-primary"/>
                    <span className="font-semibold text-sm">{merchant.rating}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{merchant.reviews} reviews</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-secondary/50">
                  <div className="font-semibold text-sm">{merchant.trades}</div>
                  <div className="text-xs text-muted-foreground">Trades</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-secondary/50">
                  <div className="font-semibold text-sm">{merchant.volume}</div>
                  <div className="text-xs text-muted-foreground">Volume</div>
                </div>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2 mb-4">
                {merchant.specialties.map((specialty) => (<span key={specialty} className="px-2 py-1 rounded-md text-xs bg-secondary text-secondary-foreground">
                    {specialty}
                  </span>))}
              </div>

              {/* Response Time & CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3"/>
                  {merchant.responseTime}
                </div>
                <Button variant="outline" size="sm" onClick={() => onNavigate(`/trading/listings?merchant=${merchant.id}`)}>
                  View Listings
                </Button>
              </div>
            </div>))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Merchants
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Showing 6 of 156 merchants
          </p>
        </div>
      </div>
    </div>);
}

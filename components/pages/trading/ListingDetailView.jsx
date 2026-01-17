"use client";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { Shield, Star, MapPin, Clock, MessageSquare, Share2, Heart, CheckCircle, Package, Truck, CreditCard, } from "lucide-react";
// Mock listing detail - API REQUEST HERE
const listingDetail = {
    id: "1",
    type: "sell",
    amount: "500g",
    purity: "999.9",
    price: 32450,
    pricePerGram: 64.90,
    merchant: {
        name: "GoldSource Ltd",
        location: "London, UK",
        rating: 4.9,
        reviews: 342,
        verified: true,
        premium: true,
        memberSince: "2020",
        completedTrades: 1250,
        responseTime: "< 1 hour",
    },
    createdAt: "2 hours ago",
    expiresAt: "7 days",
    description: `LBMA certified gold bar, original packaging with certificate of authenticity. 
  
This is a premium quality gold bar from a reputable Swiss refinery. Each bar comes with:
- Original factory sealed packaging
- Certificate of authenticity
- Unique serial number
- Assay certificate

The bar is stored in our secure vault in London and can be shipped worldwide or collected in person.`,
    specifications: {
        weight: "500g",
        purity: "999.9 (24K)",
        refinery: "Swiss Gold Refinery",
        serialNumber: "SGR-2024-XXXXX",
        dimensions: "117.5 x 51 x 8.7 mm",
        certification: "LBMA Good Delivery",
    },
    shipping: {
        options: ["Insured Courier", "Vault Pickup", "Bank Transfer"],
        estimatedDelivery: "3-5 business days",
        insurance: "Included",
    },
    payment: {
        methods: ["Bank Wire", "Crypto", "Escrow"],
        escrowFee: "1%",
    },
};
export function ListingDetailView({ listingId, onNavigate }) {
    // API REQUEST HERE - Fetch listing by ID
    console.log("Fetching listing:", listingId);
    return (<div>
      <PageHeader title="Listing Details" subtitle={`Listing #${listingId}`} actions={<div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4"/>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4"/>
            </Button>
          </div>}/>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Listing Header */}
          <div className="p-6 rounded-xl bg-card shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-success/10 text-success">
                For Sale
              </span>
              {listingDetail.merchant.premium && (<span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/10 text-primary">
                  Premium Listing
                </span>)}
            </div>

            <h1 className="text-3xl font-bold mb-2">{listingDetail.amount} Gold Bar</h1>
            <p className="text-muted-foreground mb-4">
              Purity: {listingDetail.purity} • ${listingDetail.pricePerGram}/gram
            </p>

            <div className="text-4xl font-bold gold-gradient-text mb-6">
              ${listingDetail.price.toLocaleString()}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4"/>
                Posted {listingDetail.createdAt}
              </div>
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4"/>
                Expires in {listingDetail.expiresAt}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-6 rounded-xl bg-card shadow-card">
            <h2 className="font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground whitespace-pre-line">
              {listingDetail.description}
            </p>
          </div>

          {/* Specifications */}
          <div className="p-6 rounded-xl bg-card shadow-card">
            <h2 className="font-semibold mb-4">Specifications</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(listingDetail.specifications).map(([key, value]) => (<div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                  <span className="text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="font-medium">{value}</span>
                </div>))}
            </div>
          </div>

          {/* Shipping & Payment */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-card shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="h-5 w-5 text-primary"/>
                <h2 className="font-semibold">Shipping</h2>
              </div>
              <ul className="space-y-2 text-sm">
                {listingDetail.shipping.options.map((option) => (<li key={option} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success"/>
                    {option}
                  </li>))}
              </ul>
              <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                <p>Delivery: {listingDetail.shipping.estimatedDelivery}</p>
                <p>Insurance: {listingDetail.shipping.insurance}</p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-primary"/>
                <h2 className="font-semibold">Payment</h2>
              </div>
              <ul className="space-y-2 text-sm">
                {listingDetail.payment.methods.map((method) => (<li key={method} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success"/>
                    {method}
                  </li>))}
              </ul>
              <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                <p>Escrow Fee: {listingDetail.payment.escrowFee}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Card */}
          <div className="p-6 rounded-xl bg-card shadow-card sticky top-24">
            <div className="text-3xl font-bold gold-gradient-text mb-4">
              ${listingDetail.price.toLocaleString()}
            </div>

            <Button variant="gold" size="lg" className="w-full mb-3" onClick={() => onNavigate(`/trading/reserve/${listingId}`)}>
              Reserve Now
            </Button>
            <Button variant="outline" size="lg" className="w-full gap-2">
              <MessageSquare className="h-4 w-4"/>
              Contact Seller
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Secure transaction via escrow
            </p>
          </div>

          {/* Merchant Card */}
          <div className="p-6 rounded-xl bg-card shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-gold-200 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">
                  {listingDetail.merchant.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{listingDetail.merchant.name}</h3>
                  {listingDetail.merchant.verified && (<Shield className="h-4 w-4 text-primary"/>)}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3"/>
                  {listingDetail.merchant.location}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-3 w-3 text-primary fill-primary"/>
                  <span className="font-semibold text-sm">{listingDetail.merchant.rating}</span>
                </div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-secondary/50">
                <div className="font-semibold text-sm">{listingDetail.merchant.completedTrades}</div>
                <div className="text-xs text-muted-foreground">Trades</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-secondary/50">
                <div className="font-semibold text-sm">{listingDetail.merchant.responseTime}</div>
                <div className="text-xs text-muted-foreground">Response</div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Member since {listingDetail.merchant.memberSince} • {listingDetail.merchant.reviews} reviews
            </p>

            <Button variant="outline" className="w-full mt-4">
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </div>);
}

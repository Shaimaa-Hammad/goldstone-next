"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { Clock, CheckCircle, AlertCircle, Copy, Download, MessageSquare, Shield, Package, } from "lucide-react";
// Mock escrow order - API REQUEST HERE
const escrowOrder = {
    id: "ESC-2024-4521",
    status: "awaiting_payment",
    createdAt: "2024-01-15T10:30:00Z",
    expiresAt: "2024-01-15T22:30:00Z",
    gold: {
        amount: "500g",
        purity: "999.9",
        price: 32450,
    },
    fees: {
        escrow: 324.50,
        delivery: 150,
        total: 32924.50,
    },
    payment: {
        method: "Bank Wire",
        bankName: "GoldTrade Escrow Ltd",
        accountNumber: "1234567890",
        routingNumber: "021000021",
        reference: "ESC-2024-4521",
        swift: "GTESGB2L",
    },
    seller: {
        name: "GoldSource Ltd",
        verified: true,
    },
};
export function EscrowView() {
    const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 0, seconds: 0 });
    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
                    return prev;
                }
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) {
                    seconds--;
                }
                else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                }
                else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const formatTime = (num) => num.toString().padStart(2, "0");
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Show toast notification
        console.log("Copied:", text);
    };
    return (<div>
      <PageHeader title="Escrow Order" subtitle={`Order ${escrowOrder.id}`} actions={<div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2"/>
              Download Invoice
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2"/>
              Contact Support
            </Button>
          </div>}/>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-gold-100 border border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-6 w-6 text-primary"/>
              <div>
                <h2 className="font-semibold">Awaiting Payment</h2>
                <p className="text-sm text-muted-foreground">
                  Complete payment before the timer expires
                </p>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center justify-center gap-2 py-6">
              <div className="text-center">
                <div className="text-4xl font-bold bg-card rounded-lg px-4 py-3 shadow-sm">
                  {formatTime(timeLeft.hours)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Hours</div>
              </div>
              <span className="text-3xl font-bold text-muted-foreground">:</span>
              <div className="text-center">
                <div className="text-4xl font-bold bg-card rounded-lg px-4 py-3 shadow-sm">
                  {formatTime(timeLeft.minutes)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Minutes</div>
              </div>
              <span className="text-3xl font-bold text-muted-foreground">:</span>
              <div className="text-center">
                <div className="text-4xl font-bold bg-card rounded-lg px-4 py-3 shadow-sm">
                  {formatTime(timeLeft.seconds)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Seconds</div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="p-6 rounded-xl bg-card shadow-card">
            <h2 className="font-semibold mb-4">Payment Details</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Transfer the exact amount to the following bank account. Use the reference number for faster processing.
            </p>

            <div className="space-y-4">
              {[
            { label: "Bank Name", value: escrowOrder.payment.bankName },
            { label: "Account Number", value: escrowOrder.payment.accountNumber },
            { label: "Routing Number", value: escrowOrder.payment.routingNumber },
            { label: "SWIFT Code", value: escrowOrder.payment.swift },
            { label: "Reference", value: escrowOrder.payment.reference, highlight: true },
        ].map((item) => (<div key={item.label} className={`flex items-center justify-between p-3 rounded-lg ${item.highlight ? "bg-primary/10" : "bg-secondary/50"}`}>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className={`font-mono font-medium ${item.highlight ? "text-primary" : ""}`}>
                      {item.value}
                    </div>
                  </div>
                  <button onClick={() => copyToClipboard(item.value)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <Copy className="h-4 w-4 text-muted-foreground"/>
                  </button>
                </div>))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-warning/10 border border-warning/20 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5"/>
              <div className="text-sm">
                <p className="font-medium">Important</p>
                <p className="text-muted-foreground">
                  The reference number must be included in your transfer. Payments without the correct 
                  reference may be delayed or rejected.
                </p>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="p-6 rounded-xl bg-card shadow-card">
            <h2 className="font-semibold mb-4">Order Progress</h2>
            <div className="space-y-4">
              {[
            { status: "completed", title: "Order Created", time: "Jan 15, 10:30 AM" },
            { status: "current", title: "Awaiting Payment", time: "Due in 12 hours" },
            { status: "pending", title: "Payment Verified", time: "" },
            { status: "pending", title: "Gold Reserved", time: "" },
            { status: "pending", title: "Shipped", time: "" },
            { status: "pending", title: "Delivered", time: "" },
        ].map((step, index) => (<div key={index} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    {step.status === "completed" ? (<CheckCircle className="h-6 w-6 text-success"/>) : step.status === "current" ? (<div className="h-6 w-6 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary"/>
                      </div>) : (<div className="h-6 w-6 rounded-full border-2 border-border"/>)}
                    {index < 5 && (<div className={`w-0.5 h-8 ${step.status === "completed" ? "bg-success" : "bg-border"}`}/>)}
                  </div>
                  <div className="pb-8">
                    <p className={`font-medium ${step.status === "pending" ? "text-muted-foreground" : ""}`}>
                      {step.title}
                    </p>
                    {step.time && (<p className="text-sm text-muted-foreground">{step.time}</p>)}
                  </div>
                </div>))}
            </div>
          </div>
        </div>

        {/* Sidebar - Invoice Summary */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-card shadow-card sticky top-24">
            <h2 className="font-semibold mb-4">Order Summary</h2>

            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
              <Package className="h-10 w-10 text-primary"/>
              <div>
                <div className="font-medium">{escrowOrder.gold.amount} Gold</div>
                <div className="text-sm text-muted-foreground">
                  Purity: {escrowOrder.gold.purity}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Gold Value</span>
                <span>${escrowOrder.gold.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Escrow Fee (1%)</span>
                <span>${escrowOrder.fees.escrow.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span>${escrowOrder.fees.delivery.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-border">
              <span className="font-semibold">Total Due</span>
              <span className="text-xl font-bold gold-gradient-text">
                ${escrowOrder.fees.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-success"/>
              Secured by GoldTrade Escrow
            </div>
          </div>

          {/* Seller Info */}
          <div className="p-6 rounded-xl bg-card shadow-card">
            <h3 className="font-semibold mb-3">Seller</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="font-bold text-primary">G</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{escrowOrder.seller.name}</span>
                  {escrowOrder.seller.verified && (<Shield className="h-4 w-4 text-primary"/>)}
                </div>
                <span className="text-sm text-muted-foreground">Verified Merchant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}

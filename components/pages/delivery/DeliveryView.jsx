"use client";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { Package, Truck, CheckCircle, MapPin, Phone, ExternalLink, Copy, } from "lucide-react";
// Mock delivery data - API REQUEST HERE
const deliveryData = {
    orderId: "ESC-2024-4521",
    trackingNumber: "GT-TRK-2024-89012",
    carrier: "SecureGold Logistics",
    status: "in_transit",
    estimatedDelivery: "January 18, 2024",
    origin: "London, UK",
    destination: "New York, USA",
    currentLocation: "In transit - Frankfurt Hub",
    gold: {
        amount: "500g",
        purity: "999.9",
    },
    timeline: [
        {
            status: "completed",
            title: "Order Confirmed",
            description: "Payment verified and order confirmed",
            time: "Jan 15, 10:30 AM",
            location: "London, UK",
        },
        {
            status: "completed",
            title: "Picked Up",
            description: "Package collected from vault",
            time: "Jan 15, 2:00 PM",
            location: "London, UK",
        },
        {
            status: "completed",
            title: "Departed Origin",
            description: "Package left origin facility",
            time: "Jan 15, 6:00 PM",
            location: "London, UK",
        },
        {
            status: "current",
            title: "In Transit",
            description: "Package at transit hub",
            time: "Jan 16, 8:00 AM",
            location: "Frankfurt, Germany",
        },
        {
            status: "pending",
            title: "Arrived at Destination",
            description: "Package arrived at destination facility",
            time: "",
            location: "New York, USA",
        },
        {
            status: "pending",
            title: "Out for Delivery",
            description: "Package out for final delivery",
            time: "",
            location: "New York, USA",
        },
        {
            status: "pending",
            title: "Delivered",
            description: "Package delivered successfully",
            time: "",
            location: "New York, USA",
        },
    ],
    contact: {
        name: "SecureGold Support",
        phone: "+1 (800) 123-4567",
        available: "24/7",
    },
};
export function DeliveryView() {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        console.log("Copied:", text);
    };
    const getProgressPercentage = () => {
        const completedSteps = deliveryData.timeline.filter((step) => step.status === "completed").length;
        const currentStep = deliveryData.timeline.find((step) => step.status === "current") ? 0.5 : 0;
        return ((completedSteps + currentStep) / deliveryData.timeline.length) * 100;
    };
    return (<div>
      <PageHeader title="Delivery Tracking" subtitle={`Order ${deliveryData.orderId}`} actions={<Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2"/>
            Track on Carrier Site
          </Button>}/>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <div className="p-6 rounded-xl bg-card shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Truck className="h-6 w-6 text-primary"/>
                </div>
                <div>
                  <h2 className="font-semibold text-lg">In Transit</h2>
                  <p className="text-sm text-muted-foreground">
                    {deliveryData.currentLocation}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                <p className="font-semibold text-primary">{deliveryData.estimatedDelivery}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-gold-400 rounded-full transition-all duration-500" style={{ width: `${getProgressPercentage()}%` }}/>
            </div>

            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{deliveryData.origin}</span>
              <span>{deliveryData.destination}</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-6 rounded-xl bg-card shadow-card">
            <h2 className="font-semibold mb-6">Shipment History</h2>
            
            <div className="space-y-0">
              {deliveryData.timeline.map((step, index) => (<div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    {step.status === "completed" ? (<div className="h-8 w-8 rounded-full bg-success flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-success-foreground"/>
                      </div>) : step.status === "current" ? (<div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center animate-pulse">
                        <div className="h-3 w-3 rounded-full bg-primary-foreground"/>
                      </div>) : (<div className="h-8 w-8 rounded-full border-2 border-border bg-secondary"/>)}
                    {index < deliveryData.timeline.length - 1 && (<div className={`w-0.5 h-16 ${step.status === "completed"
                    ? "bg-success"
                    : step.status === "current"
                        ? "bg-gradient-to-b from-primary to-border"
                        : "bg-border"}`}/>)}
                  </div>
                  <div className="pb-8 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className={`font-medium ${step.status === "pending" ? "text-muted-foreground" : ""}`}>
                          {step.title}
                        </p>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      {step.time && (<div className="text-right text-sm">
                          <p className="text-muted-foreground">{step.time}</p>
                        </div>)}
                    </div>
                    {step.location && step.status !== "pending" && (<div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3"/>
                        {step.location}
                      </div>)}
                  </div>
                </div>))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tracking Info */}
          <div className="p-6 rounded-xl bg-card shadow-card">
            <h3 className="font-semibold mb-4">Tracking Information</h3>

            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-secondary/50">
                <div className="text-sm text-muted-foreground mb-1">Tracking Number</div>
                <div className="flex items-center justify-between">
                  <code className="font-mono text-sm font-medium">{deliveryData.trackingNumber}</code>
                  <button onClick={() => copyToClipboard(deliveryData.trackingNumber)} className="p-1.5 rounded hover:bg-secondary transition-colors">
                    <Copy className="h-4 w-4 text-muted-foreground"/>
                  </button>
                </div>
              </div>

              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Carrier</span>
                <span className="text-sm font-medium">{deliveryData.carrier}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Order ID</span>
                <span className="text-sm font-medium">{deliveryData.orderId}</span>
              </div>
            </div>
          </div>

          {/* Package Info */}
          <div className="p-6 rounded-xl bg-card shadow-card">
            <h3 className="font-semibold mb-4">Package Details</h3>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-br from-primary/10 to-gold-100">
              <Package className="h-10 w-10 text-primary"/>
              <div>
                <div className="font-medium">{deliveryData.gold.amount} Gold Bar</div>
                <div className="text-sm text-muted-foreground">
                  Purity: {deliveryData.gold.purity}
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Insurance</span>
                <span className="font-medium text-success">Fully Covered</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Signature Required</span>
                <span className="font-medium">Yes</span>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="p-6 rounded-xl bg-card shadow-card">
            <h3 className="font-semibold mb-4">Need Help?</h3>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-secondary">
                <Phone className="h-5 w-5 text-muted-foreground"/>
              </div>
              <div>
                <p className="font-medium">{deliveryData.contact.name}</p>
                <p className="text-sm text-primary">{deliveryData.contact.phone}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Available {deliveryData.contact.available}
            </p>

            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>);
}

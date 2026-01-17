"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/layout/PageHeader";
import { CheckCircle, Package, CreditCard, FileText, ArrowRight, ArrowLeft, Info, } from "lucide-react";
const steps = [
    { id: 1, title: "Select Gold", icon: Package },
    { id: 2, title: "Payment Details", icon: CreditCard },
    { id: 3, title: "Review & Confirm", icon: FileText },
];
export function ReserveView({ onNavigate }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        amount: "500",
        unit: "grams",
        purity: "999.9",
        paymentMethod: "escrow",
        deliveryOption: "courier",
        notes: "",
    });
    const handleNext = () => {
        if (currentStep < 3)
            setCurrentStep(currentStep + 1);
    };
    const handleBack = () => {
        if (currentStep > 1)
            setCurrentStep(currentStep - 1);
    };
    const handleSubmit = () => {
        // API REQUEST HERE - Create reservation
        console.log("Creating reservation:", formData);
        onNavigate("/escrow/new");
    };
    const estimatedPrice = parseFloat(formData.amount) * 64.90;
    return (<div>
      <PageHeader title="Reserve Gold" subtitle="Create a new gold reservation order"/>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((step, index) => (<div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${currentStep > step.id
                ? "bg-success text-success-foreground"
                : currentStep === step.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"}`}>
                  {currentStep > step.id ? (<CheckCircle className="h-6 w-6"/>) : (<step.icon className="h-6 w-6"/>)}
                </div>
                <span className={`mt-2 text-sm font-medium ${currentStep >= step.id ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (<div className={`w-24 h-1 mx-4 rounded ${currentStep > step.id ? "bg-success" : "bg-secondary"}`}/>)}
            </div>))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Step 1: Select Gold */}
        {currentStep === 1 && (<div className="p-6 rounded-xl bg-card shadow-card animate-fade-in">
            <h2 className="text-xl font-semibold mb-6">Select Gold Amount</h2>

            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} placeholder="Enter amount"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <select id="unit" value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-border bg-background">
                    <option value="grams">Grams</option>
                    <option value="kg">Kilograms</option>
                    <option value="oz">Troy Ounces</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Purity</Label>
                <div className="grid grid-cols-3 gap-3">
                  {["999.9", "995", "916"].map((purity) => (<button key={purity} onClick={() => setFormData({ ...formData, purity })} className={`p-3 rounded-lg border text-center transition-colors ${formData.purity === purity
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"}`}>
                      <div className="font-semibold">{purity}</div>
                      <div className="text-xs text-muted-foreground">
                        {purity === "999.9" ? "24K" : purity === "995" ? "23.9K" : "22K"}
                      </div>
                    </button>))}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-primary mt-0.5"/>
                  <div>
                    <p className="font-medium">Estimated Price</p>
                    <p className="text-2xl font-bold gold-gradient-text">
                      ${estimatedPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Based on current market rate of $64.90/g
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>)}

        {/* Step 2: Payment Details */}
        {currentStep === 2 && (<div className="p-6 rounded-xl bg-card shadow-card animate-fade-in">
            <h2 className="text-xl font-semibold mb-6">Payment & Delivery</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="space-y-3">
                  {[
                { id: "escrow", title: "Secure Escrow", description: "Funds held until delivery confirmed", recommended: true },
                { id: "wire", title: "Bank Wire", description: "Direct bank transfer" },
                { id: "crypto", title: "Cryptocurrency", description: "Bitcoin, Ethereum, USDT" },
            ].map((method) => (<button key={method.id} onClick={() => setFormData({ ...formData, paymentMethod: method.id })} className={`w-full p-4 rounded-lg border text-left transition-colors ${formData.paymentMethod === method.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{method.title}</span>
                            {method.recommended && (<span className="px-2 py-0.5 text-xs rounded bg-success/10 text-success">
                                Recommended
                              </span>)}
                          </div>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${formData.paymentMethod === method.id
                    ? "border-primary bg-primary"
                    : "border-border"}`}/>
                      </div>
                    </button>))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Delivery Option</Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                { id: "courier", title: "Insured Courier", eta: "3-5 days" },
                { id: "pickup", title: "Vault Pickup", eta: "Same day" },
            ].map((option) => (<button key={option.id} onClick={() => setFormData({ ...formData, deliveryOption: option.id })} className={`p-4 rounded-lg border text-left transition-colors ${formData.deliveryOption === option.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"}`}>
                      <div className="font-medium">{option.title}</div>
                      <div className="text-sm text-muted-foreground">{option.eta}</div>
                    </button>))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <textarea id="notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={3} placeholder="Any special instructions..." className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"/>
              </div>
            </div>
          </div>)}

        {/* Step 3: Review & Confirm */}
        {currentStep === 3 && (<div className="p-6 rounded-xl bg-card shadow-card animate-fade-in">
            <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Gold Amount</span>
                <span className="font-medium">{formData.amount} {formData.unit}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Purity</span>
                <span className="font-medium">{formData.purity}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium capitalize">{formData.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-medium capitalize">{formData.deliveryOption}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Escrow Fee (1%)</span>
                <span className="font-medium">${(estimatedPrice * 0.01).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold gold-gradient-text">
                  ${(estimatedPrice * 1.01).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-secondary/50 text-sm text-muted-foreground mb-6">
              By confirming this order, you agree to our Terms of Service and understand that 
              funds will be held in escrow until delivery is confirmed.
            </div>
          </div>)}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {currentStep > 1 ? (<Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2"/>
              Back
            </Button>) : (<div />)}

          {currentStep < 3 ? (<Button variant="gold" onClick={handleNext}>
              Continue
              <ArrowRight className="h-4 w-4 ml-2"/>
            </Button>) : (<Button variant="gold" onClick={handleSubmit}>
              Confirm Order
              <CheckCircle className="h-4 w-4 ml-2"/>
            </Button>)}
        </div>
      </div>
    </div>);
}

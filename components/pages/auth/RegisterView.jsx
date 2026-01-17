"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { TrendingUp, Mail, Lock, User, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
const benefits = [
    "Access to verified gold merchants worldwide",
    "Secure escrow for all transactions",
    "Real-time market data and alerts",
    "24/7 customer support",
];
export function RegisterView({ onNavigate, onRegister }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // API REQUEST HERE - Register
        console.log("Registration attempt:", formData);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            onRegister({ name: formData.name, email: formData.email, password: formData.password });
        }, 1000);
    };
    return (<div className="min-h-screen flex">
      {/* Left Panel - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-sidebar to-sidebar/90 items-center justify-center p-12">
        <div className="max-w-md">
          <div className="w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-primary to-gold-400 shadow-gold flex items-center justify-center">
            <TrendingUp className="h-10 w-10 text-primary-foreground"/>
          </div>
          <h2 className="text-3xl font-bold text-sidebar-foreground mb-4">
            Start Your Gold Trading Journey
          </h2>
          <p className="text-sidebar-foreground/70 mb-8">
            Create a free account and join the world's most trusted gold trading platform.
          </p>
          <ul className="space-y-4">
            {benefits.map((benefit) => (<li key={benefit} className="flex items-center gap-3 text-sidebar-foreground/80">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0"/>
                <span>{benefit}</span>
              </li>))}
          </ul>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <button onClick={() => onNavigate("/")} className="flex items-center gap-2 font-semibold text-lg mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-gold-400 shadow-gold">
              <TrendingUp className="h-5 w-5 text-primary-foreground"/>
            </div>
            <span>GoldTrade</span>
          </button>

          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Create your account</h1>
            <p className="text-muted-foreground">
              Start trading gold in minutes. No credit card required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                <Input id="name" type="text" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="pl-10" required/>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="pl-10" required/>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                <Input id="password" type="password" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="pl-10" required/>
              </div>
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters with a number and symbol
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                <Input id="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="pl-10" required/>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox id="terms" checked={formData.agreeTerms} onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked })}/>
              <Label htmlFor="terms" className="text-sm text-muted-foreground leading-tight">
                I agree to the{" "}
                <button type="button" className="text-primary hover:underline">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="text-primary hover:underline">
                  Privacy Policy
                </button>
              </Label>
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isLoading || !formData.agreeTerms}>
              {isLoading ? "Creating account..." : "Create Account"}
              <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button onClick={() => onNavigate("/login")} className="text-primary font-medium hover:underline">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>);
}

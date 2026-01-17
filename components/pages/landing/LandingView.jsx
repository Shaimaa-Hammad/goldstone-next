"use client";

import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Zap, Globe, ArrowRight, Star, Lock, } from "lucide-react";
const features = [
    {
        icon: Shield,
        title: "Secure Escrow",
        description: "Every transaction is protected with bank-grade security and multi-party escrow.",
    },
    {
        icon: Zap,
        title: "Instant Trading",
        description: "Execute trades in seconds with our lightning-fast matching engine.",
    },
    {
        icon: Globe,
        title: "Global Network",
        description: "Access verified merchants and buyers from over 50 countries worldwide.",
    },
    {
        icon: Lock,
        title: "KYC Verified",
        description: "All users undergo thorough verification for maximum trust and compliance.",
    },
];
const stats = [
    { value: "$2.4B+", label: "Trading Volume" },
    { value: "50K+", label: "Active Traders" },
    { value: "99.9%", label: "Uptime" },
    { value: "150+", label: "Countries" },
];
const testimonials = [
    {
        quote: "GoldTrade has transformed how we source gold. The escrow system gives us complete peace of mind.",
        author: "Sarah Chen",
        role: "VP Operations, LuxMetals",
        rating: 5,
    },
    {
        quote: "The verification process is thorough yet seamless. I trust every transaction on this platform.",
        author: "Michael Roberts",
        role: "Independent Trader",
        rating: 5,
    },
    {
        quote: "Best gold trading platform I've used. The UI is clean and the support team is exceptional.",
        author: "Aisha Patel",
        role: "CEO, GoldSource Inc",
        rating: 5,
    },
];
export function LandingView({ onNavigate }) {
    return (<div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-50/50 via-background to-background"/>
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"/>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-200/20 rounded-full blur-3xl"/>

        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <TrendingUp className="h-4 w-4"/>
              Trusted by 50,000+ traders worldwide
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Trade Gold with{" "}
              <span className="gold-gradient-text">Confidence</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The premier platform for secure gold trading. Connect with verified merchants, 
              execute trades instantly, and grow your portfolio with peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gold" size="xl" onClick={() => onNavigate("/register")}>
                Start Trading Free
                <ArrowRight className="ml-2 h-5 w-5"/>
              </Button>
              <Button variant="outline" size="xl" onClick={() => onNavigate("/market")}>
                View Live Market
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up delay-200">
            {stats.map((stat) => (<div key={stat.label} className="text-center p-6 rounded-2xl bg-card shadow-card">
                <div className="text-3xl font-bold gold-gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose GoldTrade?
            </h2>
            <p className="text-lg text-muted-foreground">
              We've built the most secure and efficient gold trading platform, 
              designed for both beginners and professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (<div key={feature.title} className="p-6 rounded-2xl bg-card shadow-card card-hover animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary"/>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Start Trading in Minutes
            </h2>
            <p className="text-lg text-muted-foreground">
              Our streamlined process gets you from signup to your first trade in no time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
            { step: "01", title: "Create Account", description: "Sign up with your email and complete a quick verification process." },
            { step: "02", title: "Complete KYC", description: "Verify your identity to unlock full trading capabilities." },
            { step: "03", title: "Start Trading", description: "Browse listings, make offers, and execute secure trades." },
        ].map((item, index) => (<div key={item.step} className="relative">
                <div className="text-6xl font-bold text-primary/10 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                {index < 2 && (<ArrowRight className="hidden md:block absolute top-8 -right-6 h-6 w-6 text-border"/>)}
              </div>))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Trusted by Traders Worldwide
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our community has to say about their experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (<div key={testimonial.author} className="p-6 rounded-2xl bg-card shadow-card animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (<Star key={i} className="h-4 w-4 fill-primary text-primary"/>))}
                </div>
                <p className="text-foreground mb-6">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-sidebar to-sidebar/90 p-8 lg:p-16">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"/>
            <div className="relative max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-sidebar-foreground mb-4">
                Ready to Start Trading?
              </h2>
              <p className="text-lg text-sidebar-foreground/70 mb-8">
                Join thousands of traders who trust GoldTrade for their gold investments. 
                Create your free account today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gold" size="xl" onClick={() => onNavigate("/register")}>
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5"/>
                </Button>
                <Button variant="outline" size="xl" className="border-sidebar-foreground/20 text-sidebar-foreground hover:bg-sidebar-foreground/10" onClick={() => onNavigate("/merchants")}>
                  Browse Merchants
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>);
}

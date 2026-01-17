"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/layout/PageHeader";
import { User, Mail, Phone, MapPin, Building, Globe, Save, Camera, Shield, } from "lucide-react";
// Mock user data - API REQUEST HERE
const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
    city: "New York",
    company: "Doe Investments LLC",
    website: "https://doeinvestments.com",
    bio: "Professional gold trader with 10+ years of experience in precious metals.",
    avatar: null,
    kycStatus: "verified",
    memberSince: "January 2023",
    tradingTier: "Gold",
};
export function ProfileView() {
    const [formData, setFormData] = useState(userData);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const handleSave = () => {
        setIsSaving(true);
        // API REQUEST HERE - Update profile
        console.log("Updating profile:", formData);
        setTimeout(() => {
            setIsSaving(false);
            setIsEditing(false);
        }, 1000);
    };
    return (<div>
      <PageHeader title="Profile" subtitle="Manage your account settings and preferences" actions={isEditing ? (<div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="gold" onClick={handleSave} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2"/>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>) : (<Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>)}/>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="p-6 rounded-xl bg-card shadow-card">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-gold-200 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">
                    {formData.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                {isEditing && (<button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-lg">
                    <Camera className="h-4 w-4"/>
                  </button>)}
              </div>
              <h2 className="text-xl font-semibold mb-1">{formData.name}</h2>
              <p className="text-muted-foreground mb-4">{formData.email}</p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Shield className="h-4 w-4 text-success"/>
                <span className="text-sm text-success font-medium">KYC Verified</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-medium">{formData.memberSince}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Trading Tier</span>
                <span className="font-medium gold-gradient-text">{formData.tradingTier}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Account Status</span>
                <span className="font-medium text-success">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="p-6 rounded-xl bg-card shadow-card">
            <h3 className="font-semibold mb-6">Personal Information</h3>
            
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                  <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} disabled={!isEditing} className="pl-10"/>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={!isEditing} className="pl-10"/>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                  <Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} disabled={!isEditing} className="pl-10"/>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                  <Input id="country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} disabled={!isEditing} className="pl-10"/>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                  <Input id="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} disabled={!isEditing} className="pl-10"/>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company (Optional)</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                  <Input id="company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} disabled={!isEditing} className="pl-10"/>
                </div>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                  <Input id="website" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} disabled={!isEditing} className="pl-10"/>
                </div>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea id="bio" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} disabled={!isEditing} rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}

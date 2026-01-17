"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Settings as SettingsIcon, Bell, Shield, DollarSign, Mail, } from "lucide-react";
export default function Settings() {
    return (<div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Settings</h1>
        <p className="text-muted-foreground">Configure platform settings and preferences</p>
      </div>

      {/* General Settings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <SettingsIcon className="h-5 w-5 text-primary"/>
          </div>
          <div>
            <h2 className="font-semibold text-foreground">General Settings</h2>
            <p className="text-sm text-muted-foreground">Basic platform configuration</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="platform-name">Platform Name</Label>
            <Input id="platform-name" defaultValue="GoldTrade"/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="support-email">Support Email</Label>
            <Input id="support-email" type="email" defaultValue="support@goldtrade.com"/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select defaultValue="utc">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="est">Eastern Time (EST)</SelectItem>
                <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                <SelectItem value="gmt">GMT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Trading Settings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <DollarSign className="h-5 w-5 text-primary"/>
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Trading Settings</h2>
            <p className="text-sm text-muted-foreground">Configure trading parameters</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="min-trade">Minimum Trade Amount (USD)</Label>
            <Input id="min-trade" type="number" defaultValue="100"/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="max-trade">Maximum Trade Amount (USD)</Label>
            <Input id="max-trade" type="number" defaultValue="1000000"/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="platform-fee">Platform Fee (%)</Label>
            <Input id="platform-fee" type="number" step="0.1" defaultValue="1.5"/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="escrow-period">Escrow Period (days)</Label>
            <Input id="escrow-period" type="number" defaultValue="7"/>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="h-5 w-5 text-primary"/>
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Security Settings</h2>
            <p className="text-sm text-muted-foreground">Platform security configuration</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Require KYC for Trading</p>
              <p className="text-sm text-muted-foreground">Users must complete KYC before trading</p>
            </div>
            <Switch defaultChecked/>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
            </div>
            <Switch defaultChecked/>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Auto-suspend Suspicious Accounts</p>
              <p className="text-sm text-muted-foreground">Automatically suspend accounts with suspicious activity</p>
            </div>
            <Switch defaultChecked/>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Bell className="h-5 w-5 text-primary"/>
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Notification Settings</h2>
            <p className="text-sm text-muted-foreground">Configure admin notifications</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">New KYC Submissions</p>
              <p className="text-sm text-muted-foreground">Get notified when users submit KYC</p>
            </div>
            <Switch defaultChecked/>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Large Transactions</p>
              <p className="text-sm text-muted-foreground">Notify for transactions over $50,000</p>
            </div>
            <Switch defaultChecked/>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Flagged Listings</p>
              <p className="text-sm text-muted-foreground">Get notified when listings are flagged</p>
            </div>
            <Switch defaultChecked/>
          </div>
        </div>
      </div>

      {/* Email Settings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Mail className="h-5 w-5 text-primary"/>
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Email Templates</h2>
            <p className="text-sm text-muted-foreground">Manage system email templates</p>
          </div>
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Mail className="h-4 w-4 mr-2"/>
            Welcome Email
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Mail className="h-4 w-4 mr-2"/>
            KYC Approval Email
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Mail className="h-4 w-4 mr-2"/>
            Trade Confirmation Email
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Mail className="h-4 w-4 mr-2"/>
            Payment Receipt Email
          </Button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>);
}

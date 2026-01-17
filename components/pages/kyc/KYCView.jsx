"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { Shield, Upload, CheckCircle, Clock, AlertCircle, FileText, Camera, CreditCard, MapPin, } from "lucide-react";
// Mock KYC status - API REQUEST HERE
const kycStatus = {
    level: "tier2",
    status: "pending",
    submittedAt: "2024-01-15",
    documents: {
        identity: { status: "verified", name: "Passport" },
        address: { status: "pending", name: "Utility Bill" },
        selfie: { status: "verified", name: "Selfie with ID" },
    },
    limits: {
        current: {
            dailyTrade: 10000,
            monthlyTrade: 50000,
            maxOrder: 5000,
        },
        next: {
            dailyTrade: 100000,
            monthlyTrade: 500000,
            maxOrder: 50000,
        },
    },
};
const verificationSteps = [
    {
        id: "identity",
        title: "Identity Document",
        description: "Passport, National ID, or Driver's License",
        icon: CreditCard,
    },
    {
        id: "address",
        title: "Proof of Address",
        description: "Utility bill or bank statement (less than 3 months old)",
        icon: MapPin,
    },
    {
        id: "selfie",
        title: "Selfie Verification",
        description: "Photo of yourself holding your ID document",
        icon: Camera,
    },
];
export function KYCView() {
    const [uploadingDoc, setUploadingDoc] = useState(null);
    const handleUpload = (docType) => {
        setUploadingDoc(docType);
        // API REQUEST HERE - Upload document
        console.log("Uploading document:", docType);
        setTimeout(() => {
            setUploadingDoc(null);
        }, 2000);
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case "verified":
                return <CheckCircle className="h-5 w-5 text-success"/>;
            case "pending":
                return <Clock className="h-5 w-5 text-primary"/>;
            case "rejected":
                return <AlertCircle className="h-5 w-5 text-destructive"/>;
            default:
                return <FileText className="h-5 w-5 text-muted-foreground"/>;
        }
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case "verified":
                return <span className="px-2 py-1 text-xs font-medium rounded-full bg-success/10 text-success">Verified</span>;
            case "pending":
                return <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Pending</span>;
            case "rejected":
                return <span className="px-2 py-1 text-xs font-medium rounded-full bg-destructive/10 text-destructive">Rejected</span>;
            default:
                return <span className="px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">Not Submitted</span>;
        }
    };
    return (<div>
      <PageHeader title="KYC Verification" subtitle="Complete your verification to unlock higher trading limits"/>

      {/* Status Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-xl bg-card shadow-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary"/>
            </div>
            <span className="text-sm text-muted-foreground">Current Level</span>
          </div>
          <div className="text-2xl font-bold">Tier 2</div>
          <p className="text-sm text-muted-foreground mt-1">Enhanced verification</p>
        </div>

        <div className="p-5 rounded-xl bg-card shadow-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-success/10">
              <CheckCircle className="h-5 w-5 text-success"/>
            </div>
            <span className="text-sm text-muted-foreground">Status</span>
          </div>
          <div className="text-2xl font-bold text-primary">Pending</div>
          <p className="text-sm text-muted-foreground mt-1">1 document awaiting review</p>
        </div>

        <div className="p-5 rounded-xl bg-card shadow-card">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm text-muted-foreground">Daily Limit</span>
          </div>
          <div className="text-2xl font-bold">${kycStatus.limits.current.dailyTrade.toLocaleString()}</div>
          <p className="text-sm text-success mt-1">
            Next tier: ${kycStatus.limits.next.dailyTrade.toLocaleString()}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-card shadow-card">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm text-muted-foreground">Monthly Limit</span>
          </div>
          <div className="text-2xl font-bold">${kycStatus.limits.current.monthlyTrade.toLocaleString()}</div>
          <p className="text-sm text-success mt-1">
            Next tier: ${kycStatus.limits.next.monthlyTrade.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Document Upload */}
      <div className="rounded-xl bg-card shadow-card overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="font-semibold">Required Documents</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Upload clear, readable images of your documents
          </p>
        </div>

        <div className="divide-y divide-border">
          {verificationSteps.map((step) => {
            const docStatus = kycStatus.documents[step.id];
            const isUploading = uploadingDoc === step.id;
            return (<div key={step.id} className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-muted-foreground"/>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{step.title}</h3>
                      {docStatus && getStatusBadge(docStatus.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    {docStatus?.name && docStatus.status !== "not_submitted" && (<p className="text-xs text-muted-foreground mt-1">
                        Uploaded: {docStatus.name}
                      </p>)}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {docStatus && getStatusIcon(docStatus.status)}
                  {docStatus?.status !== "verified" && (<Button variant="outline" size="sm" onClick={() => handleUpload(step.id)} disabled={isUploading}>
                      <Upload className="h-4 w-4 mr-2"/>
                      {isUploading ? "Uploading..." : docStatus?.status === "rejected" ? "Re-upload" : "Upload"}
                    </Button>)}
                </div>
              </div>);
        })}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-5 rounded-xl bg-secondary/50 border border-border">
        <h3 className="font-semibold mb-2">Verification Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0"/>
            Ensure all documents are clearly visible and not blurry
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0"/>
            All four corners of the document should be visible
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0"/>
            Address documents must be dated within the last 3 months
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0"/>
            Verification typically takes 1-2 business days
          </li>
        </ul>
      </div>
    </div>);
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, Eye, Check, X, AlertTriangle, Package, ShieldCheck, ShieldX, } from "lucide-react";
const mockListings = [
    {
        id: "LST001",
        title: "24K Gold Bar - 1oz",
        seller: "John Doe",
        price: 2150,
        weight: "1 oz",
        purity: "99.99%",
        status: "pending",
        createdAt: "2024-01-15",
        flagged: false,
    },
    {
        id: "LST002",
        title: "Gold Coins Collection",
        seller: "Jane Smith",
        price: 8500,
        weight: "4 oz",
        purity: "91.67%",
        status: "pending",
        createdAt: "2024-01-14",
        flagged: true,
    },
    {
        id: "LST003",
        title: "22K Gold Jewelry Set",
        seller: "Mike Johnson",
        price: 3200,
        weight: "1.5 oz",
        purity: "91.67%",
        status: "approved",
        createdAt: "2024-01-13",
        flagged: false,
    },
    {
        id: "LST004",
        title: "Gold Bullion - 10oz",
        seller: "Sarah Williams",
        price: 21000,
        weight: "10 oz",
        purity: "99.99%",
        status: "approved",
        createdAt: "2024-01-12",
        flagged: false,
    },
    {
        id: "LST005",
        title: "Antique Gold Watch",
        seller: "Tom Brown",
        price: 4500,
        weight: "0.5 oz",
        purity: "75%",
        status: "rejected",
        createdAt: "2024-01-11",
        flagged: true,
    },
];
export default function Listings() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedListing, setSelectedListing] = useState(null);
    const [decisionModal, setDecisionModal] = useState({
        open: false,
        action: null,
    });
    const [rejectionReason, setRejectionReason] = useState("");
    const filteredListings = mockListings.filter((listing) => listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.seller.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleDecision = (listing, action) => {
        setSelectedListing(listing);
        setDecisionModal({ open: true, action });
    };
    const confirmDecision = () => {
        console.log(`${decisionModal.action} listing`, selectedListing?.id, rejectionReason);
        setDecisionModal({ open: false, action: null });
        setSelectedListing(null);
        setRejectionReason("");
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case "pending":
                return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">Pending</Badge>;
            case "approved":
                return <Badge variant="outline" className="bg-success/10 text-success border-success/30">Approved</Badge>;
            case "rejected":
                return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">Rejected</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };
    return (<div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Listings Moderation</h1>
        <p className="text-muted-foreground">Review and moderate gold listings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Package className="h-5 w-5 text-warning"/>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">24</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <ShieldCheck className="h-5 w-5 text-success"/>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <ShieldX className="h-5 w-5 text-destructive"/>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <AlertTriangle className="h-5 w-5 text-orange-500"/>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">Flagged</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
        <Input placeholder="Search listings..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10"/>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Listing</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Purity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredListings.map((listing) => (<TableRow key={listing.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{listing.title}</span>
                    {listing.flagged && (<AlertTriangle className="h-4 w-4 text-orange-500"/>)}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{listing.seller}</TableCell>
                <TableCell className="font-semibold text-foreground">
                  {formatCurrency(listing.price)}
                </TableCell>
                <TableCell className="text-muted-foreground">{listing.weight}</TableCell>
                <TableCell className="text-muted-foreground">{listing.purity}</TableCell>
                <TableCell>{getStatusBadge(listing.status)}</TableCell>
                <TableCell className="text-muted-foreground">{listing.createdAt}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4"/>
                    </Button>
                    {listing.status === "pending" && (<>
                        <Button variant="ghost" size="icon" className="text-success hover:text-success hover:bg-success/10" onClick={() => handleDecision(listing, "approve")}>
                          <Check className="h-4 w-4"/>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDecision(listing, "reject")}>
                          <X className="h-4 w-4"/>
                        </Button>
                      </>)}
                  </div>
                </TableCell>
              </TableRow>))}
          </TableBody>
        </Table>
      </div>

      {/* Decision Modal */}
      <Dialog open={decisionModal.open} onOpenChange={(open) => setDecisionModal({ open, action: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5"/>
              {decisionModal.action === "approve" ? "Approve Listing" : "Reject Listing"}
            </DialogTitle>
            <DialogDescription>
              {decisionModal.action === "approve"
            ? `Approve "${selectedListing?.title}" by ${selectedListing?.seller}?`
            : `Please provide a reason for rejecting this listing.`}
            </DialogDescription>
          </DialogHeader>

          {decisionModal.action === "reject" && (<Textarea placeholder="Reason for rejection..." value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} rows={4}/>)}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDecisionModal({ open: false, action: null })}>
              Cancel
            </Button>
            <Button variant={decisionModal.action === "approve" ? "default" : "destructive"} onClick={confirmDecision}>
              {decisionModal.action === "approve" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>);
}

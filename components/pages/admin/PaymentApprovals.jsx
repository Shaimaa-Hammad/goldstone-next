"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Check, X, CreditCard, DollarSign, Clock } from "lucide-react";
const mockPaymentRequests = [
    {
        id: "PAY001",
        user: "John Doe",
        type: "Deposit",
        amount: 50000,
        currency: "USD",
        method: "Bank Transfer",
        submittedAt: "2024-01-15 14:30",
        status: "pending",
    },
    {
        id: "PAY002",
        user: "Jane Smith",
        type: "Withdrawal",
        amount: 25000,
        currency: "USD",
        method: "Wire Transfer",
        submittedAt: "2024-01-15 12:15",
        status: "pending",
    },
    {
        id: "PAY003",
        user: "Mike Johnson",
        type: "Deposit",
        amount: 100000,
        currency: "USD",
        method: "Crypto (BTC)",
        submittedAt: "2024-01-14 18:45",
        status: "pending",
    },
    {
        id: "PAY004",
        user: "Sarah Williams",
        type: "Withdrawal",
        amount: 15000,
        currency: "USD",
        method: "Bank Transfer",
        submittedAt: "2024-01-14 09:20",
        status: "approved",
    },
    {
        id: "PAY005",
        user: "Tom Brown",
        type: "Deposit",
        amount: 75000,
        currency: "USD",
        method: "Wire Transfer",
        submittedAt: "2024-01-13 16:00",
        status: "rejected",
    },
];
export default function PaymentApprovals() {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [decisionModal, setDecisionModal] = useState({
        open: false,
        action: null,
    });
    const [rejectionReason, setRejectionReason] = useState("");
    const handleDecision = (request, action) => {
        setSelectedRequest(request);
        setDecisionModal({ open: true, action });
    };
    const confirmDecision = () => {
        console.log(`${decisionModal.action} payment`, selectedRequest?.id, rejectionReason);
        setDecisionModal({ open: false, action: null });
        setSelectedRequest(null);
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
    const getTypeBadge = (type) => {
        return type === "Deposit" ? (<Badge variant="outline" className="bg-success/10 text-success border-success/30">{type}</Badge>) : (<Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">{type}</Badge>);
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };
    const pendingTotal = mockPaymentRequests
        .filter((r) => r.status === "pending")
        .reduce((sum, r) => sum + r.amount, 0);
    return (<div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Payment Approvals</h1>
        <p className="text-muted-foreground">Review and approve deposit/withdrawal requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Clock className="h-5 w-5 text-warning"/>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">Pending Requests</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign className="h-5 w-5 text-primary"/>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(pendingTotal)}</p>
              <p className="text-sm text-muted-foreground">Pending Volume</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <CreditCard className="h-5 w-5 text-success"/>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Processed Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Request ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPaymentRequests.map((request) => (<TableRow key={request.id}>
                <TableCell className="font-mono text-sm">{request.id}</TableCell>
                <TableCell className="font-medium text-foreground">{request.user}</TableCell>
                <TableCell>{getTypeBadge(request.type)}</TableCell>
                <TableCell className="font-semibold text-foreground">
                  {formatCurrency(request.amount)}
                </TableCell>
                <TableCell className="text-muted-foreground">{request.method}</TableCell>
                <TableCell className="text-muted-foreground">{request.submittedAt}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4"/>
                    </Button>
                    {request.status === "pending" && (<>
                        <Button variant="ghost" size="icon" className="text-success hover:text-success hover:bg-success/10" onClick={() => handleDecision(request, "approve")}>
                          <Check className="h-4 w-4"/>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDecision(request, "reject")}>
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
              <CreditCard className="h-5 w-5"/>
              {decisionModal.action === "approve" ? "Approve Payment" : "Reject Payment"}
            </DialogTitle>
            <DialogDescription>
              {decisionModal.action === "approve"
            ? `Approve ${selectedRequest?.type.toLowerCase()} of ${formatCurrency(selectedRequest?.amount || 0)} for ${selectedRequest?.user}?`
            : `Please provide a reason for rejecting this ${selectedRequest?.type.toLowerCase()}.`}
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

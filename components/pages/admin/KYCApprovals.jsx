"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Check, X, FileText, User } from "lucide-react";
const mockKYCRequests = [
    {
        id: "KYC001",
        user: "John Doe",
        email: "john@example.com",
        submittedAt: "2024-01-15",
        documentType: "Passport",
        status: "pending",
    },
    {
        id: "KYC002",
        user: "Jane Smith",
        email: "jane@example.com",
        submittedAt: "2024-01-14",
        documentType: "Driver's License",
        status: "pending",
    },
    {
        id: "KYC003",
        user: "Mike Johnson",
        email: "mike@example.com",
        submittedAt: "2024-01-13",
        documentType: "National ID",
        status: "pending",
    },
    {
        id: "KYC004",
        user: "Sarah Williams",
        email: "sarah@example.com",
        submittedAt: "2024-01-12",
        documentType: "Passport",
        status: "approved",
    },
    {
        id: "KYC005",
        user: "Tom Brown",
        email: "tom@example.com",
        submittedAt: "2024-01-11",
        documentType: "Driver's License",
        status: "rejected",
    },
];
export default function KYCApprovals() {
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
        // In a real app, this would call an API
        console.log(`${decisionModal.action} KYC for`, selectedRequest?.id, rejectionReason);
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
    return (<div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">KYC Approvals</h1>
        <p className="text-muted-foreground">Review and approve user identity verification requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <FileText className="h-5 w-5 text-warning"/>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <Check className="h-5 w-5 text-success"/>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">1</p>
              <p className="text-sm text-muted-foreground">Approved Today</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <X className="h-5 w-5 text-destructive"/>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">1</p>
              <p className="text-sm text-muted-foreground">Rejected Today</p>
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
              <TableHead>Document Type</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockKYCRequests.map((request) => (<TableRow key={request.id}>
                <TableCell className="font-mono text-sm">{request.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{request.user}</p>
                    <p className="text-sm text-muted-foreground">{request.email}</p>
                  </div>
                </TableCell>
                <TableCell>{request.documentType}</TableCell>
                <TableCell>{request.submittedAt}</TableCell>
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
              <User className="h-5 w-5"/>
              {decisionModal.action === "approve" ? "Approve KYC" : "Reject KYC"}
            </DialogTitle>
            <DialogDescription>
              {decisionModal.action === "approve"
            ? `Are you sure you want to approve the KYC for ${selectedRequest?.user}?`
            : `Please provide a reason for rejecting ${selectedRequest?.user}'s KYC.`}
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

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MoreHorizontal, Eye, Ban, UserCheck, Shield, Users as UsersIcon, UserX, } from "lucide-react";
const mockUsers = [
    {
        id: "USR001",
        name: "John Doe",
        email: "john@example.com",
        kycStatus: "verified",
        accountStatus: "active",
        balance: 125000,
        trades: 47,
        joinedAt: "2023-06-15",
    },
    {
        id: "USR002",
        name: "Jane Smith",
        email: "jane@example.com",
        kycStatus: "verified",
        accountStatus: "active",
        balance: 89500,
        trades: 32,
        joinedAt: "2023-08-22",
    },
    {
        id: "USR003",
        name: "Mike Johnson",
        email: "mike@example.com",
        kycStatus: "pending",
        accountStatus: "active",
        balance: 15000,
        trades: 5,
        joinedAt: "2024-01-10",
    },
    {
        id: "USR004",
        name: "Sarah Williams",
        email: "sarah@example.com",
        kycStatus: "verified",
        accountStatus: "suspended",
        balance: 0,
        trades: 12,
        joinedAt: "2023-11-05",
    },
    {
        id: "USR005",
        name: "Tom Brown",
        email: "tom@example.com",
        kycStatus: "rejected",
        accountStatus: "active",
        balance: 5000,
        trades: 0,
        joinedAt: "2024-01-12",
    },
];
export default function Users() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [actionModal, setActionModal] = useState({
        open: false,
        action: null,
    });
    const filteredUsers = mockUsers.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleAction = (user, action) => {
        setSelectedUser(user);
        setActionModal({ open: true, action });
    };
    const confirmAction = () => {
        console.log(`${actionModal.action} user`, selectedUser?.id);
        setActionModal({ open: false, action: null });
        setSelectedUser(null);
    };
    const getKYCBadge = (status) => {
        switch (status) {
            case "verified":
                return <Badge variant="outline" className="bg-success/10 text-success border-success/30">Verified</Badge>;
            case "pending":
                return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">Pending</Badge>;
            case "rejected":
                return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">Rejected</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };
    const getAccountBadge = (status) => {
        switch (status) {
            case "active":
                return <Badge variant="outline" className="bg-success/10 text-success border-success/30">Active</Badge>;
            case "suspended":
                return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">Suspended</Badge>;
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
        <h1 className="text-2xl font-bold text-foreground">Users Management</h1>
        <p className="text-muted-foreground">View and manage platform users</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <UsersIcon className="h-5 w-5 text-primary"/>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">1,247</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <UserCheck className="h-5 w-5 text-success"/>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">892</p>
              <p className="text-sm text-muted-foreground">Verified</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Shield className="h-5 w-5 text-warning"/>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-sm text-muted-foreground">Pending KYC</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <UserX className="h-5 w-5 text-destructive"/>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">23</p>
              <p className="text-sm text-muted-foreground">Suspended</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
        <Input placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10"/>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>User</TableHead>
              <TableHead>KYC Status</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Trades</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (<TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getKYCBadge(user.kycStatus)}</TableCell>
                <TableCell>{getAccountBadge(user.accountStatus)}</TableCell>
                <TableCell className="font-semibold text-foreground">
                  {formatCurrency(user.balance)}
                </TableCell>
                <TableCell className="text-muted-foreground">{user.trades}</TableCell>
                <TableCell className="text-muted-foreground">{user.joinedAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4"/>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAction(user, "view")}>
                        <Eye className="h-4 w-4 mr-2"/>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.accountStatus === "active" ? (<DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleAction(user, "suspend")}>
                          <Ban className="h-4 w-4 mr-2"/>
                          Suspend User
                        </DropdownMenuItem>) : (<DropdownMenuItem className="text-success focus:text-success" onClick={() => handleAction(user, "activate")}>
                          <UserCheck className="h-4 w-4 mr-2"/>
                          Activate User
                        </DropdownMenuItem>)}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>))}
          </TableBody>
        </Table>
      </div>

      {/* Action Modal */}
      <Dialog open={actionModal.open} onOpenChange={(open) => setActionModal({ open, action: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionModal.action === "suspend" && "Suspend User"}
              {actionModal.action === "activate" && "Activate User"}
              {actionModal.action === "view" && "User Details"}
            </DialogTitle>
            <DialogDescription>
              {actionModal.action === "suspend" &&
            `Are you sure you want to suspend ${selectedUser?.name}? They will lose access to their account.`}
              {actionModal.action === "activate" &&
            `Restore access for ${selectedUser?.name}?`}
            </DialogDescription>
          </DialogHeader>

          {actionModal.action === "view" && selectedUser && (<div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">User ID</p>
                  <p className="font-mono">{selectedUser.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Balance</p>
                  <p className="font-semibold">{formatCurrency(selectedUser.balance)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Trades</p>
                  <p>{selectedUser.trades}</p>
                </div>
              </div>
            </div>)}

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionModal({ open: false, action: null })}>
              {actionModal.action === "view" ? "Close" : "Cancel"}
            </Button>
            {actionModal.action !== "view" && (<Button variant={actionModal.action === "suspend" ? "destructive" : "default"} onClick={confirmAction}>
                {actionModal.action === "suspend" ? "Suspend" : "Activate"}
              </Button>)}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>);
}

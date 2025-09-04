"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { DollarSign, TrendingUp, Calendar, ArrowLeft, Download, Eye, CreditCard, Building, Plus } from "lucide-react"
import Link from "next/link"

interface PayoutAccount {
  id: string
  type: "bank" | "card"
  name: string
  details: string
  isDefault: boolean
}

interface PayoutHistory {
  id: string
  date: string
  amount: string
  status: "completed" | "pending" | "failed"
  period: string
  method: string
}

export default function DriverPayoutsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [showAddAccount, setShowAddAccount] = useState(false)

  const payoutAccounts: PayoutAccount[] = [
    {
      id: "1",
      type: "bank",
      name: "Chase Bank",
      details: "Account ending in 1234",
      isDefault: true,
    },
    {
      id: "2",
      type: "card",
      name: "Debit Card",
      details: "Visa ending in 5678",
      isDefault: false,
    },
  ]

  const currentEarnings = {
    week: {
      available: 892.75,
      pending: 156.5,
      total: 1049.25,
      rides: 67,
      hours: 38.5,
    },
    month: {
      available: 3247.8,
      pending: 892.75,
      total: 4140.55,
      rides: 245,
      hours: 142,
    },
  }

  const payoutHistory: PayoutHistory[] = [
    {
      id: "1",
      date: "Dec 18, 2024",
      amount: "$892.75",
      status: "completed",
      period: "Week of Dec 11-17",
      method: "Chase Bank •••• 1234",
    },
    {
      id: "2",
      date: "Dec 11, 2024",
      amount: "$756.20",
      status: "completed",
      period: "Week of Dec 4-10",
      method: "Chase Bank •••• 1234",
    },
    {
      id: "3",
      date: "Dec 4, 2024",
      amount: "$823.45",
      status: "pending",
      period: "Week of Nov 27-Dec 3",
      method: "Chase Bank •••• 1234",
    },
  ]

  const currentData = currentEarnings[selectedPeriod as keyof typeof currentEarnings]

  const handleInstantPayout = () => {
    // TODO: Implement instant payout logic
    console.log("Processing instant payout...")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card p-4">
        <div className="flex items-center gap-4">
          <Link href="/driver/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">Payouts</span>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Current Earnings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Current Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedPeriod} className="space-y-4 mt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">${currentData.available.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Available for payout</p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-semibold">${currentData.pending.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{currentData.rides}</p>
                    <p className="text-xs text-muted-foreground">Rides</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{currentData.hours}h</p>
                    <p className="text-xs text-muted-foreground">Hours</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={handleInstantPayout} className="flex-1">
                    Instant Payout
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </div>

                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Next automatic payout: Monday, Dec 23</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Payout Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Payout Methods</span>
              <Button variant="outline" size="sm" onClick={() => setShowAddAccount(true)} className="bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Add Method
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {payoutAccounts.map((account, index) => (
              <div key={account.id}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    {account.type === "bank" ? (
                      <Building className="w-6 h-6 text-muted-foreground" />
                    ) : (
                      <CreditCard className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{account.name}</p>
                      {account.isDefault && (
                        <Badge variant="default" className="bg-primary/10 text-primary text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{account.details}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!account.isDefault && (
                      <Button variant="ghost" size="sm">
                        Set Default
                      </Button>
                    )}
                  </div>
                </div>
                {index < payoutAccounts.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Add Account Form */}
        {showAddAccount && (
          <Card>
            <CardHeader>
              <CardTitle>Add Payout Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="bank">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="bank">Bank Account</TabsTrigger>
                  <TabsTrigger value="card">Debit Card</TabsTrigger>
                </TabsList>

                <TabsContent value="bank" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input id="bankName" placeholder="Chase Bank" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input id="accountNumber" placeholder="1234567890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="routingNumber">Routing Number</Label>
                    <Input id="routingNumber" placeholder="021000021" />
                  </div>
                </TabsContent>

                <TabsContent value="card" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowAddAccount(false)}>
                  Cancel
                </Button>
                <Button className="flex-1">Add Method</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payout History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Payout History
              </span>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {payoutHistory.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{payout.amount}</p>
                    <p className="text-sm text-muted-foreground">{payout.period}</p>
                    <p className="text-xs text-muted-foreground">{payout.date}</p>
                    <p className="text-xs text-muted-foreground">{payout.method}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      payout.status === "completed"
                        ? "default"
                        : payout.status === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                    className={payout.status === "completed" ? "bg-primary/10 text-primary" : ""}
                  >
                    {payout.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payout Info */}
        <Card className="border-muted">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Payout Information</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Automatic payouts occur weekly on Mondays</p>
              <p>• Instant payouts are available for a small fee</p>
              <p>• Minimum payout amount is $10.00</p>
              <p>• Bank transfers take 1-3 business days</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

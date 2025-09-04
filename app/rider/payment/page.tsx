"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { CreditCard, Plus, ArrowLeft, Shield, Trash2 } from "lucide-react"
import Link from "next/link"

interface PaymentMethod {
  id: string
  type: "card" | "digital" | "cash"
  name: string
  details: string
  isDefault: boolean
  lastUsed?: string
  icon: string
}

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      name: "Visa ending in 4242",
      details: "Expires 12/26",
      isDefault: true,
      lastUsed: "2 days ago",
      icon: "💳",
    },
    {
      id: "2",
      type: "digital",
      name: "Apple Pay",
      details: "iPhone 12 Pro",
      isDefault: false,
      lastUsed: "1 week ago",
      icon: "📱",
    },
    {
      id: "3",
      type: "cash",
      name: "Cash",
      details: "Pay driver directly",
      isDefault: false,
      icon: "💵",
    },
  ])

  const [showAddCard, setShowAddCard] = useState(false)
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const handleSetDefault = (methodId: string) => {
    setPaymentMethods((methods) =>
      methods.map((method) => ({
        ...method,
        isDefault: method.id === methodId,
      })),
    )
  }

  const handleDeleteMethod = (methodId: string) => {
    setPaymentMethods((methods) => methods.filter((method) => method.id !== methodId))
  }

  const handleAddCard = () => {
    if (newCard.number && newCard.expiry && newCard.cvv && newCard.name) {
      const newMethod: PaymentMethod = {
        id: Date.now().toString(),
        type: "card",
        name: `${newCard.number.slice(0, 4)} ending in ${newCard.number.slice(-4)}`,
        details: `Expires ${newCard.expiry}`,
        isDefault: paymentMethods.length === 0,
        icon: "💳",
      }
      setPaymentMethods([...paymentMethods, newMethod])
      setNewCard({ number: "", expiry: "", cvv: "", name: "" })
      setShowAddCard(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card p-4">
        <div className="flex items-center gap-4">
          <Link href="/rider/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">Payment Methods</span>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Security Notice */}
        <Card className="border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Your payments are secure</p>
                <p className="text-xs text-muted-foreground">All payment information is encrypted and protected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Payment Methods</span>
              <Button variant="outline" size="sm" onClick={() => setShowAddCard(true)} className="bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Add Method
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map((method, index) => (
              <div key={method.id}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-xl">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{method.name}</p>
                      {method.isDefault && (
                        <Badge variant="default" className="bg-primary/10 text-primary text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{method.details}</p>
                    {method.lastUsed && <p className="text-xs text-muted-foreground">Last used: {method.lastUsed}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    {!method.isDefault && method.type !== "cash" && (
                      <Button variant="ghost" size="sm" onClick={() => handleSetDefault(method.id)}>
                        Set Default
                      </Button>
                    )}
                    {method.type !== "cash" && (
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteMethod(method.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </div>
                {index < paymentMethods.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Add Card Form */}
        {showAddCard && (
          <Card>
            <CardHeader>
              <CardTitle>Add Credit/Debit Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={newCard.number}
                  onChange={(e) => setNewCard((prev) => ({ ...prev, number: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={newCard.expiry}
                    onChange={(e) => setNewCard((prev) => ({ ...prev, expiry: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={newCard.cvv}
                    onChange={(e) => setNewCard((prev) => ({ ...prev, cvv: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={newCard.name}
                  onChange={(e) => setNewCard((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowAddCard(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleAddCard}>
                  Add Card
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-pay rides</p>
                <p className="text-sm text-muted-foreground">Automatically charge your default payment method</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Save receipts</p>
                <p className="text-sm text-muted-foreground">Email receipts for all rides</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Tip suggestions</p>
                <p className="text-sm text-muted-foreground">Show tip options after rides</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Transactions</span>
              <Link href="/rider/receipts">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { date: "Today, 2:30 PM", amount: "$8.50", status: "completed", method: "Visa •••• 4242" },
              { date: "Yesterday, 9:15 AM", amount: "$12.00", status: "completed", method: "Apple Pay" },
              { date: "Dec 15, 6:45 PM", amount: "$9.75", status: "completed", method: "Cash" },
            ].map((transaction, index) => (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{transaction.amount}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    <p className="text-xs text-muted-foreground">{transaction.method}</p>
                  </div>
                  <Badge variant="default" className="bg-primary/10 text-primary">
                    {transaction.status}
                  </Badge>
                </div>
                {index < 2 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

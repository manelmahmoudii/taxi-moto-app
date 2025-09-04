"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PowerCircle as Motorcycle, CreditCard, Star, Gift, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface RideDetails {
  driver: string
  driverRating: number
  from: string
  to: string
  distance: string
  duration: string
  baseFare: number
  distanceFare: number
  timeFare: number
  serviceFee: number
  total: number
}

export default function PaymentCheckoutPage() {
  const router = useRouter()
  const [selectedPayment, setSelectedPayment] = useState("card-1")
  const [tipAmount, setTipAmount] = useState(0)
  const [customTip, setCustomTip] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const rideDetails: RideDetails = {
    driver: "Carlos Rodriguez",
    driverRating: 4.9,
    from: "Downtown Plaza",
    to: "Central Mall",
    distance: "3.2 km",
    duration: "12 min",
    baseFare: 3.5,
    distanceFare: 4.2,
    timeFare: 0.8,
    serviceFee: 0.5,
    total: 9.0,
  }

  const paymentMethods = [
    { id: "card-1", name: "Visa ending in 4242", icon: "💳", type: "card" },
    { id: "apple-pay", name: "Apple Pay", icon: "📱", type: "digital" },
    { id: "cash", name: "Cash", icon: "💵", type: "cash" },
  ]

  const tipOptions = [0, 1, 2, 3]

  const finalTotal = rideDetails.total + tipAmount

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      router.push("/payment/success")
    }, 3000)
  }

  const handleTipSelect = (amount: number) => {
    setTipAmount(amount)
    setCustomTip("")
  }

  const handleCustomTip = (value: string) => {
    setCustomTip(value)
    const amount = Number.parseFloat(value) || 0
    setTipAmount(amount)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card p-4">
        <div className="flex items-center gap-4">
          <Link href="/track/ride-123">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">Payment</span>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Ride Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Motorcycle className="w-5 h-5 text-primary" />
              Ride Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <img src="/driver-avatar.jpg" alt={rideDetails.driver} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <h3 className="font-semibold">{rideDetails.driver}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-muted-foreground">{rideDetails.driverRating}</span>
                </div>
              </div>
              <Badge variant="default" className="bg-primary/10 text-primary">
                Completed
              </Badge>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-primary rounded-full mt-1.5" />
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-medium">{rideDetails.from}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-destructive rounded-full mt-1.5" />
                <div>
                  <p className="text-sm text-muted-foreground">To</p>
                  <p className="font-medium">{rideDetails.to}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Distance: {rideDetails.distance}</span>
              <span className="text-muted-foreground">Duration: {rideDetails.duration}</span>
            </div>
          </CardContent>
        </Card>

        {/* Fare Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Fare Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base fare</span>
              <span>${rideDetails.baseFare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Distance ({rideDetails.distance})</span>
              <span>${rideDetails.distanceFare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time ({rideDetails.duration})</span>
              <span>${rideDetails.timeFare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service fee</span>
              <span>${rideDetails.serviceFee.toFixed(2)}</span>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>${rideDetails.total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Tip Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-primary" />
              Add Tip (Optional)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Show your appreciation for great service</p>

            <div className="grid grid-cols-4 gap-2">
              {tipOptions.map((amount) => (
                <Button
                  key={amount}
                  variant={tipAmount === amount ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTipSelect(amount)}
                  className={tipAmount !== amount ? "bg-transparent" : ""}
                >
                  ${amount}
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="customTip">Custom Amount</Label>
              <Input
                id="customTip"
                type="number"
                placeholder="0.00"
                value={customTip}
                onChange={(e) => handleCustomTip(e.target.value)}
              />
            </div>

            {tipAmount > 0 && (
              <div className="bg-primary/10 p-3 rounded-lg">
                <p className="text-sm font-medium text-primary">Tip: ${tipAmount.toFixed(2)}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedPayment === method.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div className="text-xl">{method.icon}</div>
                <span className="font-medium">{method.name}</span>
                {selectedPayment === method.id && (
                  <div className="ml-auto w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Total */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total</span>
              <span className="text-primary">${finalTotal.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Button */}
        <Button className="w-full" size="lg" onClick={handlePayment} disabled={isProcessing}>
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing Payment...
            </div>
          ) : (
            `Pay ${selectedPayment === "cash" ? "with Cash" : `$${finalTotal.toFixed(2)}`}`
          )}
        </Button>

        {selectedPayment === "cash" && (
          <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800">
            <CardContent className="p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Cash Payment:</strong> Please have exact change ready. Total amount: ${finalTotal.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

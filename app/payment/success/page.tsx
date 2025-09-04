"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Download, Share, Star, Home, RotateCcw } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const rideDetails = {
    id: "MR-2024-001234",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    driver: "Carlos Rodriguez",
    driverRating: 4.9,
    from: "Downtown Plaza",
    to: "Central Mall",
    distance: "3.2 km",
    duration: "12 min",
    fare: 9.0,
    tip: 2.0,
    total: 11.0,
    paymentMethod: "Visa ending in 4242",
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="p-4 space-y-6">
        {/* Success Header */}
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground">Thank you for riding with MotoRide</p>
        </div>

        {/* Receipt */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-1">Ride Receipt</h2>
              <p className="text-sm text-muted-foreground">#{rideDetails.id}</p>
              <p className="text-xs text-muted-foreground">
                {rideDetails.date} at {rideDetails.time}
              </p>
            </div>

            <Separator />

            {/* Driver Info */}
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

            {/* Trip Details */}
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

            <Separator />

            {/* Payment Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ride fare</span>
                <span>${rideDetails.fare.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tip</span>
                <span>${rideDetails.tip.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary">${rideDetails.total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Paid with {rideDetails.paymentMethod}</p>
            </div>
          </CardContent>
        </Card>

        {/* Rate Your Ride */}
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Rate Your Ride</h3>
            <p className="text-sm text-muted-foreground mb-4">How was your experience with {rideDetails.driver}?</p>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} className="w-8 h-8 text-2xl hover:scale-110 transition-transform">
                  <Star className="w-full h-full text-yellow-400 fill-yellow-400" />
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="bg-transparent">
              Submit Rating
            </Button>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Share className="w-4 h-4 mr-2" />
              Share Receipt
            </Button>
          </div>

          <Link href="/book">
            <Button className="w-full" size="lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              Book Another Ride
            </Button>
          </Link>

          <Link href="/rider/dashboard">
            <Button variant="outline" className="w-full bg-transparent">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Support */}
        <Card className="border-muted">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">Need help with this ride?</p>
            <Button variant="ghost" size="sm">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Download, Star, PowerCircle as Motorcycle, Share2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function PaymentReceiptPage() {
  const params = useParams()
  const rideId = params.rideId as string
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")

  // Mock ride data
  const rideData = {
    id: rideId,
    driver: {
      name: "Carlos Rodriguez",
      rating: 4.9,
      vehicleModel: "Honda CB 150",
      licensePlate: "ABC-123",
      avatar: "/driver-avatar.jpg",
    },
    pickup: "123 Main Street, Downtown",
    destination: "456 Oak Avenue, Uptown",
    startTime: "2:30 PM",
    endTime: "2:42 PM",
    duration: "12 min",
    distance: "2.1 km",
    fare: {
      base: 3.5,
      distance: 4.2,
      serviceFee: 0.8,
      total: 8.5,
    },
    paymentMethod: "Credit Card •••• 4242",
    status: "completed",
    date: new Date().toLocaleDateString(),
  }

  const handleRating = (stars: number) => {
    setRating(stars)
  }

  return (
    <div className="min-h-screen bg-background animate-in fade-in-0 duration-500">
      {/* Header */}
      <header className="border-b border-border bg-card p-4 animate-in slide-in-from-top-4 duration-500">
        <div className="flex items-center justify-between">
          <Link
            href="/rider/dashboard"
            className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Motorcycle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">MotoRide</span>
          </Link>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Trip Completed
          </Badge>
        </div>
      </header>

      <div className="p-4 max-w-md mx-auto animate-in slide-in-from-bottom-4 duration-500 delay-200">
        {/* Success Message */}
        <div className="text-center mb-6 animate-in zoom-in-95 duration-500 delay-300">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Trip Completed!</h1>
          <p className="text-muted-foreground">Thank you for riding with MotoRide</p>
        </div>

        {/* Receipt Card */}
        <Card className="mb-6 animate-in zoom-in-95 duration-500 delay-400">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Receipt</span>
              <span className="text-sm font-normal text-muted-foreground">#{rideId.slice(-6)}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Trip Details */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-primary rounded-full mt-1.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Pickup</p>
                  <p className="font-medium">{rideData.pickup}</p>
                  <p className="text-xs text-muted-foreground">{rideData.startTime}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-destructive rounded-full mt-1.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Destination</p>
                  <p className="font-medium">{rideData.destination}</p>
                  <p className="text-xs text-muted-foreground">{rideData.endTime}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Driver Info */}
            <div className="flex items-center gap-3">
              <img
                src={rideData.driver.avatar || "/placeholder.svg"}
                alt={rideData.driver.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{rideData.driver.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{rideData.driver.rating}</span>
                  <span>•</span>
                  <span>{rideData.driver.vehicleModel}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Fare Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Base fare</span>
                <span>${rideData.fare.base.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Distance ({rideData.distance})</span>
                <span>${rideData.fare.distance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service fee</span>
                <span>${rideData.fare.serviceFee.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${rideData.fare.total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Paid via {rideData.paymentMethod}</p>
            </div>
          </CardContent>
        </Card>

        {/* Rating Section */}
        <Card className="mb-6 animate-in zoom-in-95 duration-500 delay-500">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Rate your trip</h3>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="sm"
                  className="p-1 transition-all duration-200 hover:scale-110"
                  onClick={() => handleRating(star)}
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                </Button>
              ))}
            </div>
            {rating > 0 && (
              <div className="text-center animate-in slide-in-from-bottom-2 duration-300">
                <p className="text-sm text-muted-foreground mb-2">
                  {rating === 5 ? "Excellent!" : rating === 4 ? "Good!" : rating === 3 ? "Okay" : "Could be better"}
                </p>
                <Button size="sm" className="transition-all duration-200 hover:scale-105">
                  Submit Rating
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 animate-in slide-in-from-bottom-6 duration-500 delay-600">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="transition-all duration-200 hover:scale-105 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" className="transition-all duration-200 hover:scale-105 bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
          <Button asChild className="w-full transition-all duration-200 hover:scale-105" size="lg">
            <Link href="/book">Book Another Ride</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

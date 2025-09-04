"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import InteractiveMap from "@/components/interactive-map"
import { PowerCircle as Motorcycle, Clock, Phone, MessageCircle, Star, ArrowLeft, Share } from "lucide-react"
import Link from "next/link"

interface RideDetails {
  id: string
  status: "accepted" | "pickup" | "in-progress" | "completed"
  driver: {
    name: string
    rating: number
    phone: string
    vehicleModel: string
    licensePlate: string
    photo: string
    lat: number
    lng: number
  }
  pickup: {
    address: string
    lat: number
    lng: number
  }
  destination: {
    address: string
    lat: number
    lng: number
  }
  estimatedArrival: string
  estimatedDuration: string
  fare: string
  startTime?: string
}

export default function TrackRidePage({ params }: { params: { rideId: string } }) {
  const [rideDetails, setRideDetails] = useState<RideDetails>({
    id: params.rideId,
    status: "accepted",
    driver: {
      name: "Carlos Rodriguez",
      rating: 4.9,
      phone: "+1 (555) 123-4567",
      vehicleModel: "Honda CB 150",
      licensePlate: "ABC-123",
      photo: "/driver-avatar.jpg",
      lat: 40.7128,
      lng: -74.006,
    },
    pickup: {
      address: "Downtown Plaza, Main St",
      lat: 40.712,
      lng: -74.005,
    },
    destination: {
      address: "Central Mall, Oak Avenue",
      lat: 40.714,
      lng: -74.007,
    },
    estimatedArrival: "3 min",
    estimatedDuration: "12 min",
    fare: "$8.50",
  })

  const [currentTime, setCurrentTime] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())

      // Simulate status progression
      setRideDetails((prev) => {
        if (prev.status === "accepted" && Math.random() > 0.8) {
          return { ...prev, status: "pickup", estimatedArrival: "Arrived" }
        }
        if (prev.status === "pickup" && Math.random() > 0.9) {
          return { ...prev, status: "in-progress", startTime: new Date().toLocaleTimeString() }
        }
        return prev
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusInfo = () => {
    switch (rideDetails.status) {
      case "accepted":
        return {
          title: "Driver is on the way",
          subtitle: `Arriving in ${rideDetails.estimatedArrival}`,
          color: "bg-blue-500",
        }
      case "pickup":
        return {
          title: "Driver has arrived",
          subtitle: "Please come to the pickup location",
          color: "bg-primary",
        }
      case "in-progress":
        return {
          title: "Ride in progress",
          subtitle: `Started at ${rideDetails.startTime}`,
          color: "bg-green-500",
        }
      case "completed":
        return {
          title: "Ride completed",
          subtitle: "Thank you for riding with us!",
          color: "bg-gray-500",
        }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/book">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold">Track Ride</h1>
              <p className="text-sm text-muted-foreground">Ride #{rideDetails.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Share className="w-4 h-4" />
            </Button>
            <Badge className={statusInfo.color}>{rideDetails.status.replace("-", " ")}</Badge>
          </div>
        </div>
      </header>

      {/* Interactive Map */}
      <div className="h-80">
        <InteractiveMap
          pickup={rideDetails.pickup}
          destination={rideDetails.destination}
          selectedDriver={{
            id: "driver-1",
            name: rideDetails.driver.name,
            lat: rideDetails.driver.lat,
            lng: rideDetails.driver.lng,
            heading: 45,
            isMoving: rideDetails.status === "accepted" || rideDetails.status === "in-progress",
          }}
          showRoute={rideDetails.status === "in-progress"}
          className="h-full"
        />
      </div>

      <div className="p-4 space-y-4">
        {/* Status Card */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <div
                className={`w-16 h-16 ${statusInfo.color} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <Motorcycle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold">{statusInfo.title}</h3>
              <p className="text-muted-foreground">{statusInfo.subtitle}</p>
            </div>
          </CardContent>
        </Card>

        {/* Driver Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={rideDetails.driver.photo || "/placeholder.svg"}
                alt={rideDetails.driver.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{rideDetails.driver.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{rideDetails.driver.rating}</span>
                  <span>•</span>
                  <span>{rideDetails.driver.vehicleModel}</span>
                </div>
                <p className="text-sm text-muted-foreground">{rideDetails.driver.licensePlate}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Phone className="w-4 h-4 mr-2" />
                Call Driver
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trip Details */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Trip Details</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-primary rounded-full mt-1.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Pickup</p>
                  <p className="font-medium">{rideDetails.pickup.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-destructive rounded-full mt-1.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Destination</p>
                  <p className="font-medium">{rideDetails.destination.address}</p>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{rideDetails.estimatedDuration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">💰</span>
                <div>
                  <p className="text-sm text-muted-foreground">Fare</p>
                  <p className="font-medium">{rideDetails.fare}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Updates */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">Live updates</span>
              </div>
              <span className="text-xs text-muted-foreground">Last updated: {currentTime.toLocaleTimeString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="border-destructive/20">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Need help?</p>
              <Button variant="outline" size="sm" className="text-destructive border-destructive bg-transparent">
                <Phone className="w-4 h-4 mr-2" />
                Emergency Contact
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

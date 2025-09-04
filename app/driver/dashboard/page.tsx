"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import InteractiveMap from "@/components/interactive-map"
import {
  PowerCircle as Motorcycle,
  MapPin,
  Navigation,
  DollarSign,
  Star,
  User,
  Phone,
  MessageCircle,
  CheckCircle,
  X,
  TrendingUp,
  Calendar,
} from "lucide-react"
import Link from "next/link"

interface RideRequest {
  id: string
  passengerName: string
  passengerRating: number
  pickupLocation: string
  destination: string
  distance: string
  estimatedEarnings: string
  estimatedTime: string
  requestTime: string
}

interface CompletedRide {
  id: string
  date: string
  passenger: string
  from: string
  to: string
  earnings: string
  rating: number
  duration: string
}

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(true)
  const [activeRide, setActiveRide] = useState<RideRequest | null>(null)
  const [currentLocation] = useState({ lat: 40.7128, lng: -74.006 })
  const [rideRequests, setRideRequests] = useState<RideRequest[]>([
    {
      id: "1",
      passengerName: "Sarah Johnson",
      passengerRating: 4.8,
      pickupLocation: "Downtown Plaza, Main St",
      destination: "Central Mall, Oak Avenue",
      distance: "3.2 km",
      estimatedEarnings: "$8.50",
      estimatedTime: "12 min",
      requestTime: "2 min ago",
    },
    {
      id: "2",
      passengerName: "Mike Chen",
      passengerRating: 4.9,
      pickupLocation: "Tech District, Innovation Blvd",
      destination: "Airport Terminal 1",
      distance: "8.5 km",
      estimatedEarnings: "$18.00",
      estimatedTime: "25 min",
      requestTime: "1 min ago",
    },
  ])

  const todayStats = {
    ridesCompleted: 12,
    earnings: "$156.50",
    hoursOnline: "6.5h",
    rating: 4.9,
  }

  const recentRides: CompletedRide[] = [
    {
      id: "1",
      date: "Today, 3:45 PM",
      passenger: "Emma Wilson",
      from: "Business District",
      to: "Residential Area",
      earnings: "$12.00",
      rating: 5,
      duration: "18 min",
    },
    {
      id: "2",
      date: "Today, 2:30 PM",
      passenger: "David Rodriguez",
      from: "Shopping Center",
      to: "University Campus",
      earnings: "$9.75",
      rating: 4,
      duration: "15 min",
    },
  ]

  const handleAcceptRide = (request: RideRequest) => {
    setActiveRide(request)
    setRideRequests(rideRequests.filter((r) => r.id !== request.id))
  }

  const handleDeclineRide = (requestId: string) => {
    setRideRequests(rideRequests.filter((r) => r.id !== requestId))
  }

  const handleCompleteRide = () => {
    setActiveRide(null)
    // In a real app, this would update the completed rides list
  }

  if (activeRide) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Motorcycle className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">MotoRide Driver</span>
            </div>
            <Badge className="bg-primary/10 text-primary">Active Ride</Badge>
          </div>
        </header>

        <div className="h-64">
          <InteractiveMap
            currentLocation={currentLocation}
            pickup={{ lat: 40.712, lng: -74.005, address: activeRide.pickupLocation }}
            destination={{ lat: 40.714, lng: -74.007, address: activeRide.destination }}
            selectedDriver={{
              id: "current-driver",
              name: "You",
              lat: currentLocation.lat,
              lng: currentLocation.lng,
              heading: 45,
              isMoving: true,
            }}
            showRoute={true}
            className="h-full"
          />
        </div>

        {/* Active Ride Details */}
        <div className="p-4 space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/placeholder.svg?key=90py9"
                  alt={activeRide.passengerName}
                  className="w-15 h-15 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{activeRide.passengerName}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{activeRide.passengerRating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-primary">{activeRide.estimatedEarnings}</p>
                  <p className="text-sm text-muted-foreground">{activeRide.estimatedTime}</p>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Pickup</p>
                    <p className="font-medium">{activeRide.pickupLocation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-destructive rounded-full mt-1.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Destination</p>
                    <p className="font-medium">{activeRide.destination}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="bg-transparent">
              <Navigation className="w-4 h-4 mr-2" />
              Navigate
            </Button>
            <Button onClick={handleCompleteRide}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete Ride
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Motorcycle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">MotoRide Driver</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{isOnline ? "Online" : "Offline"}</span>
            <Switch checked={isOnline} onCheckedChange={setIsOnline} />
          </div>
        </div>
      </header>

      {isOnline && (
        <div className="h-48 border-b">
          <InteractiveMap currentLocation={currentLocation} drivers={[]} showDrivers={false} className="h-full" />
        </div>
      )}

      {/* Status Card */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isOnline ? "bg-primary/10" : "bg-muted"
              }`}
            >
              <Motorcycle className={`w-8 h-8 ${isOnline ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <h3 className="text-lg font-semibold mb-2">{isOnline ? "You're Online!" : "You're Offline"}</h3>
            <p className="text-muted-foreground text-sm">
              {isOnline ? "Ready to receive ride requests" : "Turn on to start receiving ride requests"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Today's Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Today's Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{todayStats.ridesCompleted}</p>
              <p className="text-sm text-muted-foreground">Rides Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{todayStats.earnings}</p>
              <p className="text-sm text-muted-foreground">Earnings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{todayStats.hoursOnline}</p>
              <p className="text-sm text-muted-foreground">Hours Online</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{todayStats.rating}</p>
              <p className="text-sm text-muted-foreground">Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ride Requests */}
      {isOnline && rideRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Ride Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {rideRequests.map((request) => (
              <Card key={request.id} className="border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src="/placeholder-o6qha.png"
                        alt={request.passengerName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium">{request.passengerName}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-muted-foreground">{request.passengerRating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{request.estimatedEarnings}</p>
                      <p className="text-sm text-muted-foreground">{request.requestTime}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div>
                        <p className="text-sm text-muted-foreground">Pickup</p>
                        <p className="text-sm font-medium">{request.pickupLocation}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-2" />
                      <div>
                        <p className="text-sm text-muted-foreground">Destination</p>
                        <p className="text-sm font-medium">{request.destination}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{request.distance}</span>
                      <span>{request.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleDeclineRide(request.id)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Decline
                    </Button>
                    <Button size="sm" className="flex-1" onClick={() => handleAcceptRide(request)}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recent Rides */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Recent Rides
            </span>
            <Link href="/driver/history">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentRides.map((ride, index) => (
            <div key={ride.id}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">{ride.passenger}</p>
                    <span className="text-sm font-semibold text-primary">{ride.earnings}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {ride.from} → {ride.to}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{ride.date}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{ride.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{ride.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
              {index < recentRides.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/driver/earnings">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Earnings</p>
              <p className="text-xs text-muted-foreground">View details</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/driver/profile">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <User className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Profile</p>
              <p className="text-xs text-muted-foreground">Edit details</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

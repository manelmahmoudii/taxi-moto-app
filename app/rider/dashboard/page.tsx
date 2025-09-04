"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import NotificationCenter from "@/components/notification-center"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Clock, PowerCircle as Motorcycle, Star, User, History, CreditCard, Settings, Bell } from "lucide-react"
import Link from "next/link"

interface RideHistory {
  id: string
  date: string
  from: string
  to: string
  driver: string
  amount: string
  status: "completed" | "cancelled"
  rating?: number
}

export default function RiderDashboard() {
  const [activeRides] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true)
  const { toast } = useToast()

  const recentRides: RideHistory[] = [
    {
      id: "1",
      date: "Today, 2:30 PM",
      from: "Downtown Plaza",
      to: "Central Mall",
      driver: "Carlos Rodriguez",
      amount: "$8.50",
      status: "completed",
      rating: 5,
    },
    {
      id: "2",
      date: "Yesterday, 9:15 AM",
      from: "Home",
      to: "Office Building",
      driver: "Maria Santos",
      amount: "$12.00",
      status: "completed",
      rating: 4,
    },
    {
      id: "3",
      date: "Dec 15, 6:45 PM",
      from: "Restaurant District",
      to: "Home",
      driver: "Juan Perez",
      amount: "$9.75",
      status: "completed",
      rating: 5,
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Welcome back!",
        description: "Ready for your next ride? Book now for fast pickup.",
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const notifications = [
          {
            title: "Special Offer Available",
            description: "Get 15% off your next ride with code SAVE15",
          },
          {
            title: "New Driver in Your Area",
            description: "More drivers are now available for faster pickups",
          },
        ]
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)]
        toast(randomNotification)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [toast])

  return (
    <div className="min-h-screen bg-background animate-in fade-in-0 duration-500">
      {/* Header */}
      <header className="border-b border-border bg-card p-4 animate-in slide-in-from-top-4 duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse">
              <Motorcycle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">MotoRide</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(true)}
              className="relative transition-all duration-200 hover:scale-110"
            >
              <Bell className="w-4 h-4" />
              {hasUnreadNotifications && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
              )}
            </Button>
            <Button variant="ghost" size="sm" className="transition-all duration-200 hover:scale-110">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6 animate-in slide-in-from-bottom-4 duration-500 delay-200">
        {/* Welcome Section */}
        <div className="animate-in slide-in-from-left-4 duration-500 delay-300">
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">Ready for your next ride?</p>
        </div>

        {/* Quick Book Ride */}
        <Card className="animate-in zoom-in-95 duration-500 delay-400">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Book Your Next Ride</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Fast, reliable motorcycle taxi service at your fingertips
                </p>
              </div>
              <Link href="/book">
                <Button size="lg" className="w-full transition-all duration-200 hover:scale-105 active:scale-95">
                  <MapPin className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Active Rides */}
        {activeRides > 0 ? (
          <Card className="animate-in zoom-in-95 duration-500 delay-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary animate-pulse" />
                Active Ride
              </CardTitle>
            </CardHeader>
            <CardContent>{/* Active ride content would go here */}</CardContent>
          </Card>
        ) : (
          <Card className="animate-in zoom-in-95 duration-500 delay-500">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No active rides</p>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-bottom-6 duration-500 delay-600">
          <Card className="transition-all duration-200 hover:scale-105 cursor-pointer">
            <CardContent className="p-4 text-center">
              <History className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{recentRides.length}</p>
              <p className="text-sm text-muted-foreground">Total Rides</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-200 hover:scale-105 cursor-pointer">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">4.9</p>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Rides */}
        <Card className="animate-in zoom-in-95 duration-500 delay-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                Recent Rides
              </span>
              <Link href="/rider/history">
                <Button variant="ghost" size="sm" className="transition-all duration-200 hover:scale-105">
                  View All
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentRides.map((ride, index) => (
              <div
                key={ride.id}
                className="animate-in slide-in-from-left-4 duration-300"
                style={{ animationDelay: `${800 + index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110">
                    <Motorcycle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium truncate">
                        {ride.from} → {ride.to}
                      </p>
                      <Badge variant={ride.status === "completed" ? "default" : "destructive"} className="ml-2">
                        {ride.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{ride.date}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Driver: {ride.driver}</p>
                      <div className="flex items-center gap-2">
                        {ride.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{ride.rating}</span>
                          </div>
                        )}
                        <span className="text-sm font-semibold">{ride.amount}</span>
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
        <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-bottom-8 duration-500 delay-900">
          <Link href="/rider/payment">
            <Card className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95">
              <CardContent className="p-4 text-center">
                <CreditCard className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Payment</p>
                <p className="text-xs text-muted-foreground">Manage methods</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/rider/profile">
            <Card className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95">
              <CardContent className="p-4 text-center">
                <User className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Profile</p>
                <p className="text-xs text-muted-foreground">Edit details</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Notification Center */}
      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => {
          setShowNotifications(false)
          setHasUnreadNotifications(false)
        }}
      />
    </div>
  )
}

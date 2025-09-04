"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Bell, X, MapPin, DollarSign, Star, PowerCircle as Motorcycle } from "lucide-react"

interface Notification {
  id: string
  type: "ride_update" | "payment" | "driver_arrival" | "promotion" | "system"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "driver_arrival",
      title: "Driver Arriving Soon",
      message: "Carlos Rodriguez will arrive in 2 minutes at Downtown Plaza",
      timestamp: "2 min ago",
      read: false,
    },
    {
      id: "2",
      type: "ride_update",
      title: "Ride Completed",
      message: "Your ride to Central Mall has been completed. Rate your experience!",
      timestamp: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      type: "payment",
      title: "Payment Successful",
      message: "Payment of $8.50 has been processed successfully",
      timestamp: "1 hour ago",
      read: true,
    },
    {
      id: "4",
      type: "promotion",
      title: "Special Offer",
      message: "Get 20% off your next 3 rides! Use code SAVE20",
      timestamp: "3 hours ago",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "driver_arrival":
        return <Motorcycle className="w-4 h-4 text-primary" />
      case "ride_update":
        return <MapPin className="w-4 h-4 text-blue-500" />
      case "payment":
        return <DollarSign className="w-4 h-4 text-green-500" />
      case "promotion":
        return <Star className="w-4 h-4 text-yellow-500" />
      default:
        return <Bell className="w-4 h-4 text-muted-foreground" />
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 animate-in fade-in-0 duration-300 pt-16">
      <Card className="w-full max-w-md mx-4 animate-in slide-in-from-top-4 duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="transition-all duration-200 hover:scale-110"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted/50 ${
                      !notification.read ? "bg-primary/5 border border-primary/20" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-sm">{notification.title}</p>
                          {!notification.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                      </div>
                    </div>
                  </div>
                  {index < notifications.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Bell, Smartphone, Mail, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function NotificationSettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    rideUpdates: true,
    driverArrival: true,
    paymentConfirmations: true,
    promotionalOffers: false,
    systemUpdates: true,
  })

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    toast({
      title: "Settings Updated",
      description: `${key.replace(/([A-Z])/g, " $1").toLowerCase()} ${value ? "enabled" : "disabled"}`,
    })
  }

  return (
    <div className="min-h-screen bg-background animate-in fade-in-0 duration-500">
      {/* Header */}
      <header className="border-b border-border bg-card p-4 animate-in slide-in-from-top-4 duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/rider/dashboard"
              className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">Notification Settings</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 max-w-md mx-auto animate-in slide-in-from-bottom-4 duration-500 delay-200">
        {/* Notification Channels */}
        <Card className="mb-6 animate-in zoom-in-95 duration-500 delay-300">
          <CardHeader>
            <CardTitle>Notification Channels</CardTitle>
            <CardDescription>Choose how you want to receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-primary" />
                <div>
                  <Label htmlFor="push">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                </div>
              </div>
              <Switch
                id="push"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <Label htmlFor="email">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
              </div>
              <Switch
                id="email"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-primary" />
                <div>
                  <Label htmlFor="sms">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                </div>
              </div>
              <Switch
                id="sms"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Types */}
        <Card className="animate-in zoom-in-95 duration-500 delay-400">
          <CardHeader>
            <CardTitle>Notification Types</CardTitle>
            <CardDescription>Customize what notifications you receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="ride-updates">Ride Updates</Label>
                <p className="text-sm text-muted-foreground">Driver assigned, pickup, completion</p>
              </div>
              <Switch
                id="ride-updates"
                checked={settings.rideUpdates}
                onCheckedChange={(checked) => handleSettingChange("rideUpdates", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="driver-arrival">Driver Arrival</Label>
                <p className="text-sm text-muted-foreground">When your driver is approaching</p>
              </div>
              <Switch
                id="driver-arrival"
                checked={settings.driverArrival}
                onCheckedChange={(checked) => handleSettingChange("driverArrival", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="payment">Payment Confirmations</Label>
                <p className="text-sm text-muted-foreground">Payment processed, receipts</p>
              </div>
              <Switch
                id="payment"
                checked={settings.paymentConfirmations}
                onCheckedChange={(checked) => handleSettingChange("paymentConfirmations", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="promotions">Promotional Offers</Label>
                <p className="text-sm text-muted-foreground">Discounts, special deals</p>
              </div>
              <Switch
                id="promotions"
                checked={settings.promotionalOffers}
                onCheckedChange={(checked) => handleSettingChange("promotionalOffers", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="system">System Updates</Label>
                <p className="text-sm text-muted-foreground">App updates, maintenance</p>
              </div>
              <Switch
                id="system"
                checked={settings.systemUpdates}
                onCheckedChange={(checked) => handleSettingChange("systemUpdates", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="mt-6 animate-in slide-in-from-bottom-6 duration-500 delay-500">
          <Button
            className="w-full transition-all duration-200 hover:scale-105 active:scale-95"
            size="lg"
            onClick={() =>
              toast({
                title: "Settings Saved",
                description: "Your notification preferences have been updated successfully.",
              })
            }
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  )
}

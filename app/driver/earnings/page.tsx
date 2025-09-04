"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Calendar, Clock, ArrowLeft, Download, Eye } from "lucide-react"
import Link from "next/link"

interface EarningsData {
  period: string
  totalEarnings: string
  totalRides: number
  averagePerRide: string
  hoursWorked: string
  breakdown: {
    rides: string
    tips: string
    bonuses: string
  }
}

export default function DriverEarnings() {
  const [selectedPeriod, setSelectedPeriod] = useState("today")

  const earningsData: Record<string, EarningsData> = {
    today: {
      period: "Today",
      totalEarnings: "$156.50",
      totalRides: 12,
      averagePerRide: "$13.04",
      hoursWorked: "6.5h",
      breakdown: {
        rides: "$142.50",
        tips: "$14.00",
        bonuses: "$0.00",
      },
    },
    week: {
      period: "This Week",
      totalEarnings: "$892.75",
      totalRides: 67,
      averagePerRide: "$13.32",
      hoursWorked: "38.5h",
      breakdown: {
        rides: "$825.75",
        tips: "$67.00",
        bonuses: "$0.00",
      },
    },
    month: {
      period: "This Month",
      totalEarnings: "$3,247.80",
      totalRides: 245,
      averagePerRide: "$13.26",
      hoursWorked: "142h",
      breakdown: {
        rides: "$2,987.80",
        tips: "$260.00",
        bonuses: "$0.00",
      },
    },
  }

  const recentPayouts = [
    {
      id: "1",
      date: "Dec 18, 2024",
      amount: "$892.75",
      status: "completed",
      period: "Week of Dec 11-17",
    },
    {
      id: "2",
      date: "Dec 11, 2024",
      amount: "$756.20",
      status: "completed",
      period: "Week of Dec 4-10",
    },
    {
      id: "3",
      date: "Dec 4, 2024",
      amount: "$823.45",
      status: "completed",
      period: "Week of Nov 27-Dec 3",
    },
  ]

  const currentData = earningsData[selectedPeriod]

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
            <span className="text-lg font-bold">Earnings</span>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Period Selector */}
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedPeriod} className="space-y-6 mt-6">
            {/* Main Earnings Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{currentData.period} Earnings</p>
                    <p className="text-4xl font-bold text-primary">{currentData.totalEarnings}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-lg font-semibold">{currentData.totalRides}</p>
                      <p className="text-sm text-muted-foreground">Rides</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold">{currentData.averagePerRide}</p>
                      <p className="text-sm text-muted-foreground">Avg/Ride</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold">{currentData.hoursWorked}</p>
                      <p className="text-sm text-muted-foreground">Hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Earnings Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Earnings Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ride Earnings</span>
                  <span className="font-semibold">{currentData.breakdown.rides}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tips</span>
                  <span className="font-semibold">{currentData.breakdown.tips}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Bonuses</span>
                  <span className="font-semibold">{currentData.breakdown.bonuses}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary">{currentData.totalEarnings}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Payouts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Recent Payouts
              </span>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPayouts.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{payout.amount}</p>
                    <p className="text-sm text-muted-foreground">{payout.period}</p>
                    <p className="text-xs text-muted-foreground">{payout.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-primary/10 text-primary">
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

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Work Hours</p>
              <p className="text-xs text-muted-foreground">Track time</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Analytics</p>
              <p className="text-xs text-muted-foreground">View trends</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

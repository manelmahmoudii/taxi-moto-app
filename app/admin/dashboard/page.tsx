"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PowerCircle as Motorcycle,
  Users,
  DollarSign,
  TrendingUp,
  MapPin,
  Clock,
  Star,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Eye,
  Ban,
  UserCheck,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock data
  const stats = {
    totalRides: 1247,
    activeDrivers: 89,
    totalRevenue: 15420.5,
    avgRating: 4.8,
    ridesGrowth: 12.5,
    driversGrowth: 8.3,
    revenueGrowth: 15.2,
  }

  const recentRides = [
    {
      id: "R001",
      rider: "John Doe",
      driver: "Carlos Rodriguez",
      pickup: "Downtown Plaza",
      destination: "Airport Terminal",
      fare: 12.5,
      status: "completed",
      time: "2 min ago",
    },
    {
      id: "R002",
      rider: "Sarah Wilson",
      driver: "Maria Santos",
      pickup: "Mall Center",
      destination: "University Campus",
      fare: 8.75,
      status: "in-progress",
      time: "5 min ago",
    },
    {
      id: "R003",
      rider: "Mike Johnson",
      driver: "Juan Perez",
      pickup: "Business District",
      destination: "Residential Area",
      fare: 15.2,
      status: "cancelled",
      time: "8 min ago",
    },
  ]

  const drivers = [
    {
      id: "D001",
      name: "Carlos Rodriguez",
      email: "carlos@email.com",
      phone: "+1234567890",
      rating: 4.9,
      totalRides: 156,
      status: "active",
      vehicle: "Honda CB 150",
      license: "ABC-123",
      joinDate: "2024-01-15",
    },
    {
      id: "D002",
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "+1234567891",
      rating: 4.8,
      totalRides: 142,
      status: "active",
      vehicle: "Yamaha YBR 125",
      license: "XYZ-789",
      joinDate: "2024-01-20",
    },
    {
      id: "D003",
      name: "Juan Perez",
      email: "juan@email.com",
      phone: "+1234567892",
      rating: 4.7,
      totalRides: 98,
      status: "pending",
      vehicle: "Suzuki GN 125",
      license: "DEF-456",
      joinDate: "2024-02-01",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Completed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            In Progress
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-700">
            Cancelled
          </Badge>
        )
      case "active":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Active
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
            Pending
          </Badge>
        )
      case "suspended":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-700">
            Suspended
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleDriverAction = (driverId: string, action: string) => {
    console.log(`[v0] Admin action: ${action} for driver ${driverId}`)
    // In a real app, this would make an API call
  }

  return (
    <div className="min-h-screen bg-background animate-in fade-in-0 duration-500">
      {/* Header */}
      <header className="border-b border-border bg-card p-4 animate-in slide-in-from-top-4 duration-500">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Motorcycle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">MotoRide Admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Administrator
            </Badge>
            <Button variant="outline" size="sm" className="bg-transparent">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 animate-in slide-in-from-bottom-4 duration-500 delay-200">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="animate-in zoom-in-95 duration-500 delay-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRides.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />+{stats.ridesGrowth}% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="animate-in zoom-in-95 duration-500 delay-400">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeDrivers}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />+{stats.driversGrowth}% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="animate-in zoom-in-95 duration-500 delay-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />+{stats.revenueGrowth}% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="animate-in zoom-in-95 duration-500 delay-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgRating}</div>
              <p className="text-xs text-muted-foreground">
                <Star className="inline w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                Excellent service quality
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="animate-in slide-in-from-bottom-6 duration-500 delay-700">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="transition-all duration-200 hover:scale-105">
              Overview
            </TabsTrigger>
            <TabsTrigger value="drivers" className="transition-all duration-200 hover:scale-105">
              Drivers
            </TabsTrigger>
            <TabsTrigger value="rides" className="transition-all duration-200 hover:scale-105">
              Rides
            </TabsTrigger>
            <TabsTrigger value="analytics" className="transition-all duration-200 hover:scale-105">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 animate-in fade-in-0 duration-300">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Rides</CardTitle>
                <CardDescription>Latest ride activity on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRides.map((ride, index) => (
                    <div
                      key={ride.id}
                      className="flex items-center justify-between p-4 border rounded-lg animate-in slide-in-from-left-4 duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {ride.rider} → {ride.driver}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {ride.pickup} to {ride.destination}
                          </p>
                          <p className="text-xs text-muted-foreground">{ride.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${ride.fare}</p>
                        {getStatusBadge(ride.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Pending Approvals</h3>
                  <p className="text-2xl font-bold text-yellow-600">3</p>
                  <p className="text-sm text-muted-foreground">Driver applications</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Active Rides</h3>
                  <p className="text-2xl font-bold text-blue-600">12</p>
                  <p className="text-sm text-muted-foreground">Currently in progress</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Today's Revenue</h3>
                  <p className="text-2xl font-bold text-green-600">$1,247</p>
                  <p className="text-sm text-muted-foreground">From 89 rides</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="drivers" className="space-y-6 animate-in fade-in-0 duration-300">
            {/* Driver Management */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Driver Management</CardTitle>
                    <CardDescription>Manage driver accounts and applications</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search drivers..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Driver List */}
                <div className="space-y-4">
                  {drivers.map((driver, index) => (
                    <div
                      key={driver.id}
                      className="flex items-center justify-between p-4 border rounded-lg animate-in slide-in-from-left-4 duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{driver.name}</p>
                          <p className="text-sm text-muted-foreground">{driver.email}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <span>
                              {driver.vehicle} • {driver.license}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              {driver.rating}
                            </span>
                            <span>{driver.totalRides} rides</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(driver.status)}
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent transition-all duration-200 hover:scale-110"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {driver.status === "pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent text-green-600 hover:bg-green-50 transition-all duration-200 hover:scale-110"
                              onClick={() => handleDriverAction(driver.id, "approve")}
                            >
                              <UserCheck className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent text-red-600 hover:bg-red-50 transition-all duration-200 hover:scale-110"
                            onClick={() => handleDriverAction(driver.id, "suspend")}
                          >
                            <Ban className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rides" className="space-y-6 animate-in fade-in-0 duration-300">
            {/* Ride Monitoring */}
            <Card>
              <CardHeader>
                <CardTitle>Ride Monitoring</CardTitle>
                <CardDescription>Monitor all rides and handle disputes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRides.map((ride, index) => (
                    <div
                      key={ride.id}
                      className="flex items-center justify-between p-4 border rounded-lg animate-in slide-in-from-left-4 duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">#{ride.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {ride.rider} → {ride.driver}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {ride.pickup} to {ride.destination}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${ride.fare}</p>
                        {getStatusBadge(ride.status)}
                        <p className="text-xs text-muted-foreground mt-1">{ride.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 animate-in fade-in-0 duration-300">
            {/* Analytics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Monthly revenue breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground">Revenue Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ride Statistics</CardTitle>
                  <CardDescription>Daily ride volume trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground">Rides Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

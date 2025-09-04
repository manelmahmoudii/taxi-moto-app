"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  PowerCircle as Motorcycle,
  ArrowLeft,
  Star,
  MapPin,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Camera,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function DriverDetailPage() {
  const params = useParams()
  const driverId = params.driverId as string
  const [driverStatus, setDriverStatus] = useState("pending")

  // Mock driver data
  const driver = {
    id: driverId,
    name: "Carlos Rodriguez",
    email: "carlos@email.com",
    phone: "+1234567890",
    rating: 4.9,
    totalRides: 156,
    totalEarnings: 2340.5,
    status: driverStatus,
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
    vehicle: {
      model: "Honda CB 150",
      year: 2022,
      color: "Red",
      licensePlate: "ABC-123",
    },
    documents: {
      driverLicense: { status: "verified", uploadDate: "2024-01-15" },
      vehicleRegistration: { status: "verified", uploadDate: "2024-01-15" },
      insurance: { status: "pending", uploadDate: "2024-01-16" },
      profilePhoto: { status: "verified", uploadDate: "2024-01-15" },
    },
    recentRides: [
      {
        id: "R001",
        rider: "John Doe",
        pickup: "Downtown Plaza",
        destination: "Airport Terminal",
        fare: 12.5,
        status: "completed",
        date: "2024-01-20",
        rating: 5,
      },
      {
        id: "R002",
        rider: "Sarah Wilson",
        pickup: "Mall Center",
        destination: "University Campus",
        fare: 8.75,
        status: "completed",
        date: "2024-01-19",
        rating: 4,
      },
    ],
  }

  const handleStatusChange = (newStatus: string) => {
    setDriverStatus(newStatus)
    console.log(`[v0] Driver status changed to: ${newStatus}`)
  }

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-700">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background animate-in fade-in-0 duration-500">
      {/* Header */}
      <header className="border-b border-border bg-card p-4 animate-in slide-in-from-top-4 duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Motorcycle className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">Driver Details</span>
            </div>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            Administrator
          </Badge>
        </div>
      </header>

      <div className="p-6 animate-in slide-in-from-bottom-4 duration-500 delay-200">
        {/* Driver Profile Header */}
        <Card className="mb-6 animate-in zoom-in-95 duration-500 delay-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{driver.name}</h1>
                  <p className="text-muted-foreground">{driver.email}</p>
                  <p className="text-muted-foreground">{driver.phone}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{driver.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{driver.totalRides} rides completed</span>
                    <span className="text-sm text-muted-foreground">Last active: {driver.lastActive}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge
                  variant={driver.status === "active" ? "secondary" : "outline"}
                  className={
                    driver.status === "active"
                      ? "bg-green-100 text-green-700"
                      : driver.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }
                >
                  {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Joined: {new Date(driver.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {driver.status === "pending" && (
              <Alert className="mt-4 animate-in slide-in-from-bottom-2 duration-300">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  This driver application is pending approval. Review all documents before making a decision.
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              {driver.status === "pending" && (
                <>
                  <Button
                    onClick={() => handleStatusChange("active")}
                    className="transition-all duration-200 hover:scale-105"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Driver
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleStatusChange("rejected")}
                    className="transition-all duration-200 hover:scale-105"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Application
                  </Button>
                </>
              )}
              {driver.status === "active" && (
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange("suspended")}
                  className="bg-transparent text-red-600 hover:bg-red-50 transition-all duration-200 hover:scale-105"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Suspend Driver
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="animate-in slide-in-from-bottom-6 duration-500 delay-400">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="rides">Ride History</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 animate-in fade-in-0 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vehicle Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Model:</span>
                    <span className="font-medium">{driver.vehicle.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year:</span>
                    <span className="font-medium">{driver.vehicle.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Color:</span>
                    <span className="font-medium">{driver.vehicle.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">License Plate:</span>
                    <span className="font-medium">{driver.vehicle.licensePlate}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Rides:</span>
                    <span className="font-medium">{driver.totalRides}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Rating:</span>
                    <span className="font-medium flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {driver.rating}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Earnings:</span>
                    <span className="font-medium">${driver.totalEarnings.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completion Rate:</span>
                    <span className="font-medium">98.5%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6 animate-in fade-in-0 duration-300">
            <Card>
              <CardHeader>
                <CardTitle>Document Verification</CardTitle>
                <CardDescription>Review and verify driver documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(driver.documents).map(([docType, doc]) => (
                    <div key={docType} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium capitalize">{docType.replace(/([A-Z])/g, " $1").trim()}</p>
                          <p className="text-sm text-muted-foreground">
                            Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getDocumentStatusBadge(doc.status)}
                        <Button variant="outline" size="sm" className="bg-transparent">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rides" className="space-y-6 animate-in fade-in-0 duration-300">
            <Card>
              <CardHeader>
                <CardTitle>Recent Rides</CardTitle>
                <CardDescription>Driver's ride history and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {driver.recentRides.map((ride, index) => (
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
                            #{ride.id} - {ride.rider}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {ride.pickup} → {ride.destination}
                          </p>
                          <p className="text-xs text-muted-foreground">{ride.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${ride.fare}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{ride.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6 animate-in fade-in-0 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Total Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">${driver.totalEarnings.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">All time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">$487.50</p>
                  <p className="text-sm text-muted-foreground">32 rides</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Average per Ride</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">$15.20</p>
                  <p className="text-sm text-muted-foreground">Including tips</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Earnings Chart</CardTitle>
                <CardDescription>Monthly earnings breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                  <p className="text-muted-foreground">Earnings Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

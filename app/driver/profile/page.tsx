"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  PowerCircle as Motorcycle,
  User,
  Phone,
  Mail,
  Camera,
  FileText,
  Shield,
  Star,
  ArrowLeft,
  Upload,
} from "lucide-react"
import Link from "next/link"

export default function DriverProfile() {
  const [profileData, setProfileData] = useState({
    firstName: "Carlos",
    lastName: "Rodriguez",
    email: "carlos.rodriguez@email.com",
    phone: "+1 (555) 123-4567",
    bio: "Experienced motorcycle taxi driver with 5+ years of safe driving. I know the city like the back of my hand and always take the fastest routes.",
    licenseNumber: "DL123456789",
    motorcycleModel: "Honda CB 150",
    motorcyclePlate: "ABC-123",
    motorcycleYear: "2022",
    motorcycleColor: "Red",
  })

  const driverStats = {
    rating: 4.9,
    totalRides: 1247,
    yearsActive: 3,
    completionRate: 98.5,
  }

  const documents = [
    { name: "Driver's License", status: "verified", uploadDate: "2024-01-15" },
    { name: "Motorcycle Registration", status: "verified", uploadDate: "2024-01-15" },
    { name: "Insurance Certificate", status: "verified", uploadDate: "2024-01-20" },
    { name: "Background Check", status: "verified", uploadDate: "2024-01-10" },
  ]

  const handleSave = () => {
    // TODO: Implement profile update logic
    console.log("Profile updated:", profileData)
  }

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
              <Motorcycle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">Driver Profile</span>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Profile Photo & Stats */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <img src="/driver-avatar.jpg" alt="Driver Profile" className="w-24 h-24 rounded-full object-cover" />
                <Button size="sm" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-muted-foreground">Professional Driver</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-bold">{driverStats.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{driverStats.totalRides}</p>
                  <p className="text-sm text-muted-foreground">Total Rides</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  value={profileData.email}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  className="pl-10"
                  value={profileData.phone}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell passengers about yourself..."
                value={profileData.bio}
                onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Motorcycle className="w-5 h-5 text-primary" />
              Vehicle Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="motorcycleModel">Model</Label>
                <Input
                  id="motorcycleModel"
                  value={profileData.motorcycleModel}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, motorcycleModel: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motorcycleYear">Year</Label>
                <Input
                  id="motorcycleYear"
                  value={profileData.motorcycleYear}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, motorcycleYear: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="motorcyclePlate">License Plate</Label>
                <Input
                  id="motorcyclePlate"
                  value={profileData.motorcyclePlate}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, motorcyclePlate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motorcycleColor">Color</Label>
                <Input
                  id="motorcycleColor"
                  value={profileData.motorcycleColor}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, motorcycleColor: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseNumber">Driver's License Number</Label>
              <Input
                id="licenseNumber"
                value={profileData.licenseNumber}
                onChange={(e) => setProfileData((prev) => ({ ...prev, licenseNumber: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {documents.map((doc, index) => (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">Uploaded: {doc.uploadDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-primary/10 text-primary">
                      {doc.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {index < documents.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{driverStats.completionRate}%</p>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{driverStats.yearsActive}</p>
                <p className="text-sm text-muted-foreground">Years Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-full" size="lg">
          Save Changes
        </Button>
      </div>
    </div>
  )
}

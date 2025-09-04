"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import InteractiveMap from "@/components/interactive-map"
import {
  MapPin,
  Navigation,
  Clock,
  DollarSign,
  PowerCircle as Motorcycle,
  ArrowUpDown,
  Star,
  User,
  Phone,
  Locate,
  AlertTriangle,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Driver {
  id: string
  name: string
  rating: number
  distance: string
  eta: string
  vehicleModel: string
  licensePlate: string
  avatar: string
  lat: number
  lng: number
}

export default function BookRidePage() {
  const router = useRouter()
  const [pickupLocation, setPickupLocation] = useState("")
  const [destination, setDestination] = useState("")
  const [rideRequested, setRideRequested] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)
  const [estimatedPrice, setEstimatedPrice] = useState("$8.50")
  const [estimatedTime, setEstimatedTime] = useState("12 min")
  const [currentLocation, setCurrentLocation] = useState({ lat: 40.7128, lng: -74.006 })
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash")
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const nearbyDrivers: Driver[] = [
    {
      id: "1",
      name: "Carlos Rodriguez",
      rating: 4.9,
      distance: "0.3 km",
      eta: "2 min",
      vehicleModel: "Honda CB 150",
      licensePlate: "ABC-123",
      avatar: "/driver-avatar.jpg",
      lat: 40.713,
      lng: -74.0055,
    },
    {
      id: "2",
      name: "Maria Santos",
      rating: 4.8,
      distance: "0.5 km",
      eta: "3 min",
      vehicleModel: "Yamaha YBR 125",
      licensePlate: "XYZ-789",
      avatar: "/female-driver-avatar.png",
      lat: 40.7125,
      lng: -74.0065,
    },
    {
      id: "3",
      name: "Juan Perez",
      rating: 4.7,
      distance: "0.8 km",
      eta: "4 min",
      vehicleModel: "Suzuki GN 125",
      licensePlate: "DEF-456",
      avatar: "/male-driver-avatar.png",
      lat: 40.7135,
      lng: -74.0045,
    },
  ]

  const handleLocationSwap = () => {
    const temp = pickupLocation
    setPickupLocation(destination)
    setDestination(temp)
  }

  const handleRequestRide = (driver: Driver) => {
    setSelectedDriver(driver)
    setShowPaymentModal(true)
  }

  const handleConfirmPayment = async () => {
    if (!selectedDriver) return

    setIsProcessingPayment(true)

    try {
      console.log("[v0] Processing payment:", selectedPaymentMethod)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      setShowPaymentModal(false)
      setRideRequested(true)
      setIsProcessingPayment(false)

      setTimeout(() => {
        router.push(`/track/ride-${Date.now()}`)
      }, 1500)
    } catch (error) {
      console.log("[v0] Payment error:", error)
      setIsProcessingPayment(false)
    }
  }

  const handleCancelRide = () => {
    setRideRequested(false)
    setSelectedDriver(null)
  }

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser")
      return
    }

    setIsGettingLocation(true)
    setLocationError(null)

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("[v0] Location obtained successfully")
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setPickupLocation("Current Location")
        setLocationError(null)
        setIsGettingLocation(false)
      },
      (error) => {
        let errorMessage = "Unable to get your location"

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location services."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable."
            break
          case error.TIMEOUT:
            errorMessage = "Location request timed out."
            break
        }

        console.log("[v0] Geolocation error:", errorMessage)
        setLocationError(errorMessage)
        setIsGettingLocation(false)
      },
      options,
    )
  }

  const handleLocationError = (error: string) => {
    setLocationError(error)
  }

  if (rideRequested && selectedDriver) {
    return (
      <div className="min-h-screen bg-background animate-in fade-in-0 duration-500">
        <header className="border-b border-border bg-card p-4 animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse">
                <Motorcycle className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">MotoRide</span>
            </Link>
            <Badge variant="secondary" className="bg-primary/10 text-primary animate-pulse">
              Ride Requested
            </Badge>
          </div>
        </header>

        <div className="h-64 animate-in slide-in-from-top-6 duration-500 delay-200">
          <InteractiveMap
            pickup={{ lat: currentLocation.lat, lng: currentLocation.lng, address: pickupLocation }}
            destination={{ lat: 40.714, lng: -74.007, address: destination }}
            selectedDriver={{
              id: selectedDriver.id,
              name: selectedDriver.name,
              lat: selectedDriver.lat,
              lng: selectedDriver.lng,
              heading: 45,
              isMoving: true,
            }}
            showRoute={true}
            onLocationError={handleLocationError}
            className="h-full"
          />
        </div>

        <div className="p-4 animate-in slide-in-from-bottom-4 duration-500 delay-300">
          {locationError && (
            <Alert variant="destructive" className="mb-4 animate-in slide-in-from-top-2 duration-300">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{locationError}</AlertDescription>
            </Alert>
          )}

          <Card className="animate-in zoom-in-95 duration-500 delay-400">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={selectedDriver.avatar || "/placeholder.svg"}
                  alt={selectedDriver.name}
                  className="w-16 h-16 rounded-full object-cover transition-transform hover:scale-110 duration-200"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedDriver.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{selectedDriver.rating}</span>
                    <span>•</span>
                    <span>{selectedDriver.vehicleModel}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedDriver.licensePlate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Arriving in</p>
                  <p className="text-lg font-semibold text-primary animate-pulse">{selectedDriver.eta}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Driver
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <User className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 animate-in zoom-in-95 duration-500 delay-500">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Trip Details</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 animate-in slide-in-from-left-4 duration-300 delay-600">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1.5 animate-pulse" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Pickup</p>
                    <p className="font-medium">{pickupLocation || "Current Location"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 animate-in slide-in-from-left-4 duration-300 delay-700">
                  <div className="w-3 h-3 bg-destructive rounded-full mt-1.5 animate-pulse" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Destination</p>
                    <p className="font-medium">{destination}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">{estimatedPrice}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 text-center animate-in slide-in-from-bottom-4 duration-500 delay-800">
            <p className="text-sm text-muted-foreground mb-2 animate-pulse">Connecting you to your driver...</p>
            <Button
              variant="destructive"
              onClick={handleCancelRide}
              className="transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Cancel Ride
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background animate-in fade-in-0 duration-500">
      <header className="border-b border-border bg-card p-4 animate-in slide-in-from-top-4 duration-500">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse">
              <Motorcycle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">MotoRide</span>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="transition-all duration-200 hover:scale-105 active:scale-95 bg-transparent"
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </Button>
        </div>
      </header>

      <div className="h-64 animate-in slide-in-from-top-6 duration-500 delay-200">
        <InteractiveMap
          currentLocation={currentLocation}
          pickup={
            pickupLocation ? { lat: currentLocation.lat, lng: currentLocation.lng, address: pickupLocation } : undefined
          }
          destination={destination ? { lat: 40.714, lng: -74.007, address: destination } : undefined}
          drivers={nearbyDrivers}
          showDrivers={true}
          showRoute={pickupLocation && destination ? true : false}
          onLocationError={handleLocationError}
          className="h-full"
        />
      </div>

      <div className="p-4 animate-in slide-in-from-bottom-4 duration-500 delay-300">
        {locationError && (
          <Alert variant="destructive" className="mb-4 animate-in slide-in-from-top-2 duration-300">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{locationError}</AlertDescription>
          </Alert>
        )}

        <Card className="animate-in zoom-in-95 duration-500 delay-400">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Location</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-primary" />
                    <Input
                      id="pickup"
                      placeholder="Enter pickup location"
                      className="pl-10 transition-all duration-200 focus:scale-105"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGetCurrentLocation}
                    className="bg-transparent transition-all duration-200 hover:scale-110 active:scale-95"
                    disabled={isGettingLocation}
                  >
                    {isGettingLocation ? <Loader2 className="w-4 h-4 animate-spin" /> : <Locate className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLocationSwap}
                  className="p-2 transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-3 h-4 w-4 text-destructive" />
                  <Input
                    id="destination"
                    placeholder="Where to?"
                    className="pl-10 transition-all duration-200 focus:scale-105"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>

              {pickupLocation && destination && (
                <div className="bg-muted/50 p-4 rounded-lg animate-in slide-in-from-bottom-2 duration-300">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Estimated time: {estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold">{estimatedPrice}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {pickupLocation && destination && (
          <div className="mt-6 animate-in slide-in-from-bottom-6 duration-500 delay-500">
            <h3 className="text-lg font-semibold mb-4">Available Drivers</h3>
            <div className="space-y-3">
              {nearbyDrivers.map((driver, index) => (
                <Card
                  key={driver.id}
                  className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95 animate-in slide-in-from-left-4 duration-300"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={driver.avatar || "/placeholder.svg"}
                        alt={driver.name}
                        className="w-12 h-12 rounded-full object-cover transition-transform hover:scale-110 duration-200"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{driver.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{driver.rating}</span>
                          <span>•</span>
                          <span>{driver.distance} away</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{driver.vehicleModel}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{driver.eta}</p>
                        <Button
                          size="sm"
                          onClick={() => handleRequestRide(driver)}
                          className="mt-1 transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                          Select
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {pickupLocation && destination && (
          <div className="mt-6 animate-in slide-in-from-bottom-8 duration-500 delay-700">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-auto p-4 flex-col gap-2 bg-transparent transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <MapPin className="w-6 h-6 text-primary" />
                <span className="text-sm">Saved Places</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex-col gap-2 bg-transparent transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Clock className="w-6 h-6 text-primary" />
                <span className="text-sm">Schedule Ride</span>
              </Button>
            </div>
          </div>
        )}

        {showPaymentModal && selectedDriver && (
          <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-in fade-in-0 duration-300">
            <div className="bg-background rounded-t-xl w-full max-w-md p-6 animate-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Confirm Payment</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPaymentModal(false)}
                  className="transition-all duration-200 hover:scale-110"
                >
                  ✕
                </Button>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg mb-4">
                <img
                  src={selectedDriver.avatar || "/placeholder.svg"}
                  alt={selectedDriver.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{selectedDriver.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedDriver.vehicleModel}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">{estimatedPrice}</p>
                  <p className="text-sm text-muted-foreground">{estimatedTime}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <Label>Payment Method</Label>
                <div className="space-y-2">
                  <Button
                    variant={selectedPaymentMethod === "cash" ? "default" : "outline"}
                    className="w-full justify-start transition-all duration-200 hover:scale-105"
                    onClick={() => setSelectedPaymentMethod("cash")}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Cash Payment
                  </Button>
                  <Button
                    variant={selectedPaymentMethod === "card" ? "default" : "outline"}
                    className="w-full justify-start transition-all duration-200 hover:scale-105"
                    onClick={() => setSelectedPaymentMethod("card")}
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                    </svg>
                    Credit Card •••• 4242
                  </Button>
                  <Button
                    variant={selectedPaymentMethod === "digital" ? "default" : "outline"}
                    className="w-full justify-start transition-all duration-200 hover:scale-105"
                    onClick={() => setSelectedPaymentMethod("digital")}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Digital Wallet
                  </Button>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Base fare</span>
                  <span>$3.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Distance (2.1 km)</span>
                  <span>$4.20</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service fee</span>
                  <span>$0.80</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{estimatedPrice}</span>
                </div>
              </div>

              <Button
                onClick={handleConfirmPayment}
                disabled={isProcessingPayment}
                className="w-full transition-all duration-200 hover:scale-105 active:scale-95"
                size="lg"
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  `Confirm & Pay ${estimatedPrice}`
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

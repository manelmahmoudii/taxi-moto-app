"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  MapPin,
  Navigation,
  Locate,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  PowerCircle as Motorcycle,
  AlertTriangle,
} from "lucide-react"

interface MapLocation {
  lat: number
  lng: number
  address?: string
}

interface Driver {
  id: string
  name: string
  lat: number
  lng: number
  heading: number
  isMoving: boolean
}

interface InteractiveMapProps {
  pickup?: MapLocation
  destination?: MapLocation
  currentLocation?: MapLocation
  drivers?: Driver[]
  selectedDriver?: Driver
  showRoute?: boolean
  showDrivers?: boolean
  onLocationSelect?: (location: MapLocation) => void
  onLocationError?: (error: string) => void
  className?: string
}

export default function InteractiveMap({
  pickup,
  destination,
  currentLocation,
  drivers = [],
  selectedDriver,
  showRoute = false,
  showDrivers = false,
  onLocationSelect,
  onLocationError,
  className = "",
}: InteractiveMapProps) {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 }) // Default to NYC
  const [zoomLevel, setZoomLevel] = useState(13)
  const [isTracking, setIsTracking] = useState(false)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null)

  useEffect(() => {
    checkLocationPermission()
  }, [])

  const checkLocationPermission = async () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser")
      setHasLocationPermission(false)
      return
    }

    try {
      const permission = await navigator.permissions.query({ name: "geolocation" })
      setHasLocationPermission(permission.state === "granted")

      permission.addEventListener("change", () => {
        setHasLocationPermission(permission.state === "granted")
        if (permission.state === "denied") {
          setLocationError("Location access denied. Please enable location services.")
        } else if (permission.state === "granted") {
          setLocationError(null)
        }
      })
    } catch (error) {
      console.log("[v0] Permission check failed:", error)
    }
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      const error = "Geolocation is not supported by this browser"
      setLocationError(error)
      onLocationError?.(error)
      return
    }

    setIsGettingLocation(true)
    setLocationError(null)

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000, // Cache for 1 minute
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("[v0] Location obtained successfully")
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setMapCenter(location)
        setLocationError(null)
        setHasLocationPermission(true)
        onLocationSelect?.(location)
        setIsGettingLocation(false)
      },
      (error) => {
        let errorMessage = "Unable to get your location"

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location services and refresh the page."
            setHasLocationPermission(false)
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable. Please try again."
            break
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again."
            break
          default:
            errorMessage = "An unknown error occurred while getting your location."
            break
        }

        console.log("[v0] Geolocation error:", errorMessage)
        setLocationError(errorMessage)
        onLocationError?.(errorMessage)
        setIsGettingLocation(false)
      },
      options,
    )
  }

  useEffect(() => {
    if (!selectedDriver || !isTracking) return

    const interval = setInterval(() => {
      if (selectedDriver && Math.random() > 0.7) {
        selectedDriver.lat += (Math.random() - 0.5) * 0.001
        selectedDriver.lng += (Math.random() - 0.5) * 0.001
        selectedDriver.heading = Math.random() * 360
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [selectedDriver, isTracking])

  const handleRecenter = () => {
    if (currentLocation) {
      setMapCenter({ lat: currentLocation.lat, lng: currentLocation.lng })
    } else {
      getCurrentLocation()
    }
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 1, 18))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 1, 8))
  }

  return (
    <div className={`relative bg-muted rounded-lg overflow-hidden ${className}`}>
      {locationError && (
        <div className="absolute top-4 left-4 right-4 z-40 animate-in slide-in-from-top-2 duration-300">
          <Alert variant="destructive" className="bg-destructive/90 text-destructive-foreground border-destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {locationError}
              {hasLocationPermission === false && (
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2 h-6 text-xs bg-transparent"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </Button>
              )}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="h-full min-h-[300px] relative bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="text-muted-foreground">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {currentLocation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 animate-in zoom-in-50 duration-500">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
            <div className="absolute -top-1 -left-1 w-6 h-6 bg-blue-500/30 rounded-full animate-ping" />
          </div>
        )}

        {pickup && (
          <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-10 animate-in zoom-in-50 duration-500 delay-200">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform hover:scale-110">
                <MapPin className="w-3 h-3 text-white" />
              </div>
              <div className="mt-1 px-2 py-1 bg-white rounded shadow-sm text-xs font-medium animate-in slide-in-from-bottom-2 duration-300 delay-300">
                Pickup
              </div>
            </div>
          </div>
        )}

        {destination && (
          <div className="absolute top-3/4 right-1/3 transform -translate-x-1/2 -translate-y-1/2 z-10 animate-in zoom-in-50 duration-500 delay-400">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-destructive rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform hover:scale-110">
                <Navigation className="w-3 h-3 text-white" />
              </div>
              <div className="mt-1 px-2 py-1 bg-white rounded shadow-sm text-xs font-medium animate-in slide-in-from-bottom-2 duration-300 delay-500">
                Destination
              </div>
            </div>
          </div>
        )}

        {showRoute && pickup && destination && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
            <path
              d="M 33% 25% Q 50% 40% 67% 75%"
              stroke="#22c55e"
              strokeWidth="3"
              strokeDasharray="8,4"
              fill="none"
              className="animate-pulse"
              style={{
                animation: "dash 2s linear infinite, pulse 2s ease-in-out infinite",
              }}
            />
          </svg>
        )}

        {showDrivers &&
          drivers.map((driver, index) => (
            <div
              key={driver.id}
              className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-50 duration-500"
              style={{
                top: `${30 + Math.random() * 40}%`,
                left: `${20 + Math.random() * 60}%`,
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-secondary rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer">
                  <Motorcycle className="w-4 h-4 text-white" />
                </div>
                {driver.isMoving && (
                  <div className="absolute -top-1 -left-1 w-10 h-10 bg-secondary/30 rounded-full animate-ping" />
                )}
              </div>
            </div>
          ))}

        {selectedDriver && (
          <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 z-20 animate-in zoom-in-50 duration-500">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-10 h-10 bg-primary rounded-full border-3 border-white shadow-lg flex items-center justify-center transition-transform hover:scale-110">
                  <Motorcycle className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -left-1 w-12 h-12 bg-primary/30 rounded-full animate-pulse" />
              </div>
              <div className="mt-2 px-2 py-1 bg-primary text-primary-foreground rounded shadow-sm text-xs font-medium animate-in slide-in-from-bottom-2 duration-300 delay-200">
                {selectedDriver.name}
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
          <Button
            variant="outline"
            size="sm"
            className="w-10 h-10 p-0 bg-white shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
            onClick={handleZoomIn}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-10 h-10 p-0 bg-white shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
            onClick={handleZoomOut}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-10 h-10 p-0 bg-white shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
            onClick={handleRecenter}
            disabled={isGettingLocation}
          >
            <Locate className={`w-4 h-4 ${isGettingLocation ? "animate-spin" : ""}`} />
          </Button>
        </div>

        <div className="absolute bottom-4 left-4 flex gap-2 z-30">
          {isTracking && (
            <Badge variant="default" className="bg-primary/90 text-white animate-pulse">
              Live Tracking
            </Badge>
          )}
          {showRoute && (
            <Badge variant="secondary" className="bg-white/90">
              Route Active
            </Badge>
          )}
          {isGettingLocation && (
            <Badge variant="outline" className="bg-white/90 animate-pulse">
              Getting Location...
            </Badge>
          )}
        </div>

        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded">
          Interactive Map • Google Maps Integration Ready
        </div>
      </div>

      {selectedDriver && (
        <div className="absolute top-4 left-4 z-30">
          <Button
            variant={isTracking ? "default" : "outline"}
            size="sm"
            className="bg-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={() => setIsTracking(!isTracking)}
          >
            <RotateCcw className={`w-4 h-4 mr-2 ${isTracking ? "animate-spin" : ""}`} />
            {isTracking ? "Tracking" : "Start Tracking"}
          </Button>
        </div>
      )}
    </div>
  )
}

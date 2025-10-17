import CurrentWeather from "@/components/current-weather"
import { WeatherSkeleton } from "@/components/loading-skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useReverseGeocodeQuery, useForecastQuery, useWeatherQuery } from "@/hooks/use-weather"
import { AlertCircleIcon, MapPin, RefreshCw } from "lucide-react"

const WeatherDashboard = () => {
const{coordinates, 
    error: locationError, 
    getLocation, 
    isLoading : locationLoading
} = useGeolocation()


const weatherQuery = useWeatherQuery(coordinates)
const forecastQuery = useForecastQuery(coordinates)
const locationQuery = useReverseGeocodeQuery(coordinates)



const handleRefresh = () => {
    getLocation()
    if(coordinates){
        weatherQuery.refetch()
        forecastQuery.refetch()
        locationQuery.refetch()
    }
}

if(locationLoading){
    return<WeatherSkeleton/>
}
if(locationError){
    return(
    <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
            <p>{locationError}</p>
            <Button onClick={getLocation} variant={"outline"} className="w-fit">
                <MapPin className="mr-2 h-4 w-4 "/>
                Enable Location
            </Button>
        </AlertDescription>
      </Alert>)
}
if(!coordinates){
    return(
    <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Please enable location</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
            <p>please enable location access to see your local weather</p>
            <Button onClick={getLocation} variant={"outline"} className="w-fit">
                <MapPin className="mr-2 h-4 w-4 "/>
                Enable Location
            </Button>
        </AlertDescription>
      </Alert>)
}

const locationName = locationQuery.data?.[0]

if(weatherQuery.error||forecastQuery.error){
     return(
    <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
            <p>{locationError}</p>
            <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
                <RefreshCw className="mr-2 h-4 w-4 "/>
                retry
            </Button>
        </AlertDescription>
      </Alert>)
}

if(!weatherQuery.data || !forecastQuery.data){
    return <WeatherSkeleton/>
}

  return (
    <div className="space-y-4">
    {/*fav */}
    <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
    </div>
    <div className="grid gap-6">
        <div>
        {<CurrentWeather
          data={weatherQuery.data}
          locationName={locationName}/>}
        {/*curremt weather */}
        {/*hourly temp */} 
        </div>
        <div>
        {/*forecast */}
        {/*detail*/}
        </div>
    </div>
    </div>
  )
}

export default WeatherDashboard

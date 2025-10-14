import { WeatherSkeleton } from "@/components/loading-skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useReverseGeocodeQuery } from "@/hooks/use-weather"
import { AlertCircleIcon, MapPin, RefreshCw } from "lucide-react"

const WeatherDashboard = () => {
const{coordinates, 
    error: locationError, 
    getLocation, 
    isLoading : locationLoading
} = useGeolocation()


const locationQuery = useReverseGeocodeQuery(coordinates)
console.log(coordinates)
console.log(locationQuery);


const handleRefresh = () => {
    getLocation()
    if(coordinates){

    }
}

if(locationLoading){
    return<WeatherSkeleton/>
}
if(!coordinates){
    return(
    <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Please enable location</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
            <p>{locationError}</p>
            <Button onClick={getLocation} variant={"outline"} className="w-fit">
                <MapPin className="mr-2 h-4 w-4 "/>
                Enable Location
            </Button>
        </AlertDescription>
      </Alert>)
}
  return (
    <div className="space-y-4">
    {/*fav */}
    <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button variant={'outline'}
         size={"icon"}
         onClick={handleRefresh}
         //disabled={}
         >
            <RefreshCw className="h-4 w-4"/>
        </Button>
    </div>
    {/*current weather */}
    </div>
  )
}

export default WeatherDashboard
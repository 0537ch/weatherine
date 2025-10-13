import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface GeolocationState{
    coordinates: Coordinates | null
    error: string | null
    isLoading: boolean
}

export function useGeolocation() {
    const[locationData,setLocationData] = useState<GeolocationState>({
        coordinates: null,
        error: null,
        isLoading: true,
    })

    const getLocation=()=>{
        setLocationData((prev) => ({...prev,isLoading: true, error: null}))

        if(!navigator.geolocation){
            setLocationData({
                coordinates: null,
                error: "Geolocation is not supported by your browser",
                isLoading: false,
            })
            return
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            setLocationData({
                coordinates:{
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                },
                error: null,
                isLoading: false,
            })
        })
    }
    useEffect(() => {
        getLocation()
    }, [])
    return{
    ...locationData,
    getLocation,
    }
}
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import React, { useEffect, useRef } from 'react'

const center = {
    lat: 44.377712763375946,
    lng: 25.94379911654975
}
const containerStyle = {
    width: '100%',
    height: '100%',
}

export default function GoogleMapComponent() {
    const mapRef = useRef(null)
    
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['marker']
    })

    useEffect(() => {
        if (!isLoaded || !mapRef.current || !window.google?.maps?.marker?.AdvancedMarkerElement) return

        const map = mapRef.current
        const {AdvancedMarkerElement} = window.google.maps.marker

        new AdvancedMarkerElement({
            position: center,
            map: map,
            title: 'Pizzeria Clinceni'
        })
    }, [isLoaded])

    if(!isLoaded) return <p>Se incarca harta...</p>

  return (
    <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        onLoad={map => mapRef.current = map}
    >
        <Marker position={center} />
    </GoogleMap>
  )
}

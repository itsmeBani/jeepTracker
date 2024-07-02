

import React, { useState, useEffect } from 'react';
import Map, { FullscreenControl, Marker, NavigationControl, Popup, GeolocateControl } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css';

function App() {
    const [popupInfo, setPopupInfo] = useState(null);

    const [location, setLocation] = useState({
        longitude: 120.51759851277455,
        latitude: 16.899876727154616,
    });
    const [error, setError] = useState(null);
    const [viewState, setViewState] = useState({
        longitude: 120.51759851277455,
        latitude: 16.899876727154616,
        zoom: 18,
        pitch: 60,
        bearing: 130.6,
    });

    const goToMarkerLocation = () => {
        setPopupInfo({
            lng: location.longitude,
            lat: location.latitude,
            description: 'Passenger: 18 Geolocation is not supported by this browserGeolocation is not supported by this browser'
        });
    };

    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const newLocation = {
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude,
                    };
                    setLocation(newLocation);
                    setViewState((prevState) => ({
                        ...prevState,
                        ...newLocation,
                    }));
                },
                (err) => {
                    setError(err.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []);

    return (
        <div className="w-full">
            <Map
                mapLib={maplibregl}
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                style={{ width: '100%', height: '80vh' }}
                mapStyle="https://api.maptiler.com/maps/streets/style.json?key=3rAPapsQl0WHV7XcyCSi"
            >
                <NavigationControl position="top-left" />
                <GeolocateControl position="top-left" trackUserLocation />
                <FullscreenControl position="top-left" />

                <Marker

                    longitude={location.longitude}
                    latitude={location.latitude}
                    anchor="bottom"
                    color="red"
                    onClick={goToMarkerLocation}
                >

                    <div className="flex items-center justify-center border border-1- w-10 h-10 bg-blue-500 rounded-full">
                        <img
                            className="h-7 rounded-full hover:cursor-pointer "
                            src="https://scontent.fcrk2-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=b224c7&_nc_eui2=AeEI643PBX48OjXz_zRlWsFZso2H55p0AlGyjYfnmnQCUYt1RIFnFnw0X4YmxWjrLkNhvxtdSIVre3vbOT8ZaddB&_nc_ohc=yRzq9EMlBT0Q7kNvgEiWT8A&_nc_ht=scontent.fcrk2-2.fna&oh=00_AYCZOvpE76KcgzxzrScGjXCmYNOuuGuDw4pSjHg1KrFZbQ&oe=66AB69B8"
                            alt="Marker Icon"
                        />   </div>

                </Marker>

                {popupInfo && (
                    <Popup

                        longitude={popupInfo.lng}
                        latitude={popupInfo.lat}
                        anchor="top"
                        closeOnClick={false}
                        onClose={() => setPopupInfo(null)}
                    >
                        <div>{popupInfo.description}</div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}

export default App;

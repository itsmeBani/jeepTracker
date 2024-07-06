import React, { useState, useEffect } from 'react';
import Map, { FullscreenControl, Marker, NavigationControl, Popup, GeolocateControl, Source, Layer } from 'react-map-gl';
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

    const geojson = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [120.51889173862918, 16.89851127413688],
                    [120.51725063934344, 16.89978801631753],
                    [120.5161804567876, 16.900644693245653],
                    [120.51616076801133, 16.900601422427243],
                    [120.51616418677247, 16.900598151321503],
                    [120.51610264909499, 16.90070609777294],
                    [120.51611290537454, 16.900984141378302],
                    [120.51631461220688, 16.901602378043137]
                ]
            },
            "id": "e76271dc-c912-4d1a-8eac-8bcfe441a172",
            "properties": {}
        }]
    };

    const endPoint = geojson.features[0].geometry.coordinates[geojson.features[0].geometry.coordinates.length - 1];

    return (
        <div className="w-full">
            <Map
                mapLib={maplibregl}
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                style={{ width: '100%', height: '80vh' }}
                mapStyle="https://api.maptiler.com/maps/streets/style.json?key=3rAPapsQl0WHV7XcyCSi" // Replace with your actual MapTiler API key
            >
                <NavigationControl position="top-left" />
                <GeolocateControl position="top-left" trackUserLocation />
                <FullscreenControl position="top-left" />

                <Source id="route" type="geojson" data={geojson}>
                    <Layer
                        id="route"
                        type="line"
                        source="route"
                        layout={{
                            'line-join': 'round',
                            'line-cap': 'round'
                        }}
                        paint={{
                            'line-color': '#f56a6a',
                            'line-width': 7
                        }}
                    />
                </Source>

                <Marker
                    longitude={location.longitude}
                    latitude={location.latitude}
                    anchor="bottom"
                    color="red"
                    onClick={goToMarkerLocation}
                >
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
                        <img
                            className="h-7 rounded-full hover:cursor-pointer"
                            src="https://scontent.fcrk2-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=b224c7&_nc_eui2=AeEI643PBX48OjXz_zRlWsFZso2H55p0AlGyjYfnmnQCUYt1RIFnFnw0X4YmxWjrLkNhvxtdSIVre3vbOT8ZaddB&_nc_ohc=yRzq9EMlBT0Q7kNvgEiWT8A&_nc_ht=scontent.fcrk2-2.fna&oh=00_AYCZOvpE76KcgzxzrScGjXCmYNOuuGuDw4pSjHg1KrFZbQ&oe=66AB69B8"
                            alt="Marker Icon"
                        />
                    </div>
                </Marker>

                <Marker longitude={120.51759851277455} latitude={16.899876727154616} anchor="bottom">
                    <div className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.134 2 5 5.134 5 9c0 2.235 1.2 5.355 3.073 8.349.58.948 1.209 1.862 1.877 2.733a18.973 18.973 0 003.1-2.732C17.8 14.355 19 11.235 19 9c0-3.866-3.134-7-7-7z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z" />
                        </svg>
                    </div>
                </Marker>

                <Marker longitude={endPoint[0]} latitude={endPoint[1]} anchor="bottom">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.134 2 5 5.134 5 9c0 2.235 1.2 5.355 3.073 8.349.58.948 1.209 1.862 1.877 2.733a18.973 18.973 0 003.1-2.732C17.8 14.355 19 11.235 19 9c0-3.866-3.134-7-7-7z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z" />
                        </svg>
                    </div>
                </Marker>

                {popupInfo && (
                    <Popup
                        longitude={popupInfo.lng}
                        latitude={popupInfo.lat}
                        anchor="top"
                        closeOnClick={false}
                        onClose={() => setPopupInfo(null)}
                    >
                        <div className="relative p-2 bg-white rounded shadow-lg">
                            <button className="absolute top-0 right-0 m-1 text-gray-500" onClick={() => setPopupInfo(null)}>x</button>
                            <div>{popupInfo.description}</div>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}

export default App;

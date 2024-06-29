import React, { useState, useEffect } from 'react';
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css';

function App() {
    const [showPopup, setShowPopup] = useState(true);
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
        setLocation({
            longitude: 120.51759851277455,
            latitude: 16.899876727154616,
        });
        setShowPopup(false); // Close the popup after navigating
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

                <Marker
                    longitude={location.longitude}
                    latitude={location.latitude}
                    anchor="bottom"
                    color="red"
                    onClick={() => setShowPopup(true)}
                />

                {showPopup && (
                    <Popup
                        longitude={location.longitude}
                        latitude={location.latitude}
                        anchor="bottom"
                        onClose={() => setShowPopup(false)}
                    >
                        You are here
                    </Popup>
                )}

                {error && (
                    <div className="error">
                        <p>{error}</p>
                    </div>
                )}

                {showPopup && (
                    <Popup
                        longitude={location.longitude}
                        latitude={location.latitude}
                        anchor="bottom"
                        onClose={() => setShowPopup(false)}
                    >
                        <div>
                            <p>You are here</p>
                            <button onClick={goToMarkerLocation}>Go to Marker Location</button>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}

export default App;

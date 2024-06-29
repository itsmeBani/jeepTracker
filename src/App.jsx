import { useState, useEffect } from 'react';
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

    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    setLocation({
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude,
                    });
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
                initialViewState={{
                    longitude: location.longitude,
                    latitude: location.latitude,
                    zoom: 18,
                    pitch: 60, // Adjust the pitch to tilt the map
                    bearing: 130.6, // Adjust the bearing to rotate the map
                }}
                style={{ width: '100%', height: '80vh' }}
                mapStyle="https://api.maptiler.com/maps/streets/style.json?key=3rAPapsQl0WHV7XcyCSi"
            >
                <NavigationControl position="top-left" />

                <div onClick={() => setShowPopup(true)}>
                    <Marker
                        longitude={location.longitude}
                        latitude={location.latitude}
                        anchor="bottom"
                        color="red"
                    />
                </div>

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
            </Map>
        </div>
    );
}

export default App;

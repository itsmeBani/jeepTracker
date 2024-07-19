import "leaflet/dist/leaflet.css";
import {MapContainer, TileLayer, Marker, Popup, Polyline,useMapEvents , useMap,LayersControl} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import {Icon, divIcon, point} from "leaflet";
import RoutingMachine from "./Components/Routing.jsx";
import jeep1 from "../src/assets/449809310_443755698627655_2173414877061037872_n.jpg"
import jeep from "../src/assets/truck-front.svg"
import {useEffect, useRef, useState} from "react";
import L from "leaflet";
// create custom icon
const customIcon = new Icon({
    iconUrl: "https://scontent.fcrk2-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=b224c7&_nc_eui2=AeEI643PBX48OjXz_zRlWsFZso2H55p0AlGyjYfnmnQCUYt1RIFnFnw0X4YmxWjrLkNhvxtdSIVre3vbOT8ZaddB&_nc_ohc=yRzq9EMlBT0Q7kNvgEiWT8A&_nc_ht=scontent.fcrk2-2.fna&oh=00_AYCZOvpE76KcgzxzrScGjXCmYNOuuGuDw4pSjHg1KrFZbQ&oe=66AB69B8",
    className:"rounded-full border-4 border-blue-700",
    iconSize: [38, 38] // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
    return new divIcon({
        html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
        className: "",
        iconSize: point(44, 44, true)
    });
};

// markers
const markers = [
    {
        geocode: [16.902086350083458, 120.51778658331939],
        popUp: "Hello, I am pop up 1"
    },
    {
        geocode: [16.899435389947758, 120.51760679616561],
        popUp: "Hello, I am pop up 2"
    },
    {
        geocode: [16.899511098191375, 120.51790988579272],
        popUp: "Hello, I am pop up 3"
    }
];
const positions = [[51.505, -0.09], [51.51, -0.1], [51.515, -0.11]];
export default function App() {




    const GotoJeeplocation = ({ coordinates }) => {
        const map = useMap();

        const flyToLocation = () => {
            map.flyTo(coordinates, 18); // Adjust the zoom level as needed
        };

        return (
            <div className="w-full bg-white shadow-sm h-auto rounded-lg p-5 flex place-items-center px-5" onClick={flyToLocation}>
                <img src={jeep} className="h-7  w-7 opacity-80" alt=""/>

            </div>
        );
    };


    function LocationMarker() {
        const [position, setPosition] = useState(null);
        const [bbox, setBbox] = useState([]);
        const map = useMap();

        useEffect(() => {

            map.locate().on("locationfound", function (e) {
                setPosition(e.latlng);
                console.log(e.latlng)
                // map.flyTo(e.latlng, map.getZoom());
                const radius = e.accuracy;

            });
        }, [map]);

        return position === null ? null : (
            <Marker position={position} icon={customIcon}>
                <Popup>
                    You are here. <br />
                    Map bbox: <br />
                    <b>Southwest lng</b>: {bbox[0]} <br />
                    <b>Southwest lat</b>: {bbox[1]} <br />
                    <b>Northeast lng</b>: {bbox[2]} <br />
                    <b>Northeast lat</b>: {bbox[3]}
                </Popup>
            </Marker>
        );
    }

    return (
   <div className="flex">
       <MapContainer center={[16.899876727154616, 120.51759851277455
       ]} zoom={18} className="w-full h-screen"


       >
           {/* OPEN STREEN MAPS TILES */}
           <LayersControl position="topleft">
               <LayersControl.BaseLayer checked name="Google Maps">
                   <TileLayer
                       attribution="Google Maps"
                       url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                       maxZoom={20}
                       subdomains={["mt0", "mt1", "mt2", "mt3"]}
                   />
               </LayersControl.BaseLayer>
               <LayersControl.BaseLayer checked name="Satellite">
                   <TileLayer
                       attribution="Satellite   "
                       url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                       maxZoom={20}
                       subdomains={["mt0", "mt1", "mt2", "mt3"]}
                   />
               </LayersControl.BaseLayer>
               {/* Add more layers here as needed */}
           </LayersControl>

           <TileLayer
               attribution="Google Maps"
               // url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular

               url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
               // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
               //  url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
               maxZoom={20}

               subdomains={["mt0", "mt1", "mt2", "mt3"]}
           />

           <MarkerClusterGroup

               chunkedLoading
               iconCreateFunction={createClusterCustomIcon}
           >
               {/* Mapping through the markers */}
               {markers.map((marker, index) => (
                   <Marker key={index} position={marker.geocode} icon={customIcon}>
                       <Popup >
                           <div className="w-[300px] bg-blue-700">
                           <img src={jeep1} />
                           </div>
                           {marker.popUp}

                       </Popup>






                   </Marker>
               ))}


               <LocationMarker/>

               {/*<RoutingMachine/>*/}
           </MarkerClusterGroup>


           <div className="absolute h-auto rounded-t-[1.5rem] bg-white z-[10000] bottom-0 gap-2 flex flex-col w-full p-2 px-2">
               <GotoJeeplocation coordinates={[16.899876727154616, 120.51759851277455]} />
               <GotoJeeplocation coordinates={[16.899876727154616, 120.51759851277455]} />
               <GotoJeeplocation coordinates={[16.899876727154616, 120.51759851277455]} />


           </div>



       </MapContainer>


   </div>    );
}

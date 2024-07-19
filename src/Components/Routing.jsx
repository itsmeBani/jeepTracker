import L, {Icon} from "leaflet";
import {createControlComponent} from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {

    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",

        iconSize: [38, 38] // size of the icon
    });

 const RouteControl= L.Routing.control({
        waypoints: [
            L.latLng(16.894603933575684, 120.52405154260532),
            L.latLng(16.934356001989094, 120.4484544539206)
        ],
        addWaypoints: false,
        draggableWaypoints: false,

     lineOptions: {
         styles: [{ color: '#5384fe', weight: 5}],
         className: 'glowing-route'// Change the color and weight of the route line
     },
     createMarker: function(i, waypoint) {
         return L.marker(waypoint.latLng, { icon: customIcon }).bindPopup(`Waypoint ${i + 1}`);
     }
    });
    console.log(RouteControl)
 return RouteControl
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
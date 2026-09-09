import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

// Vite doesn't automatically resolve Leaflet's default marker images,
// so we rebuild the icon using images loaded from a CDN instead.
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Special green icon for delivery location
const deliveryIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "delivery-marker",
});

function FitToRoute({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length === 0) return;
    if (positions.length === 1) {
      map.setView(positions[0], 5);
    } else {
      map.fitBounds(positions, { padding: [40, 40] });
    }
  }, [positions, map]);
  return null;
}

export default function ShipmentMap({ events }) {
  const positions = events.map((e) => [e.latitude, e.longitude]);

  return (
    <MapContainer
      center={positions[0] || [0, 0]}
      zoom={4}
      scrollWheelZoom={false}
      className="h-80 w-full rounded-md"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={positions} pathOptions={{ color: "#2563eb", weight: 3 }} />
      {events.map((e, i) => {
        // Check if this event is "out_for_delivery"
        const isDelivery = e.status === "out_for_delivery";
        const icon = isDelivery ? deliveryIcon : defaultIcon;
        
        return (
          <Marker key={i} position={[e.latitude, e.longitude]} icon={icon}>
            <Popup>
              <strong>{e.location_name}</strong>
              <br />
              {e.status_display}
              <br />
              {new Date(e.timestamp).toLocaleString()}
              {isDelivery && <><br /><span className="text-green-400 font-bold">📍 DELIVERY LOCATION</span></>}
            </Popup>
          </Marker>
        );
      })}
      <FitToRoute positions={positions} />
    </MapContainer>
  );
}
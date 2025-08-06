// "use client";

// import { useEffect, useRef, useState } from "react";

// const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your actual key

// const GoogleMap = () => {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const [mapLoaded, setMapLoaded] = useState(false);

//   useEffect(() => {
//     if (typeof window.google === "object" && typeof window.google.maps === "object") {
//       initMap();
//     } else {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
//       script.async = true;
//       script.defer = true;
//       script.onload = initMap;
//       document.head.appendChild(script);
//     }
//   }, []);

//   const initMap = () => {
//     if (mapRef.current && !mapLoaded) {
//       const map = new window.google.maps.Map(mapRef.current, {
//         center: { lat: 39.8283, lng: -98.5795 }, // Center of USA
//         zoom: 4,
//       });
//       setMapLoaded(true);
//     }
//   };

//   return <div ref={mapRef} className="h-[calc(100vh-4rem)] w-full rounded-lg" />;
// };

// export default GoogleMap;
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for marker icons not showing
import L from 'leaflet';

L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const center: LatLngExpression = [39.8283, -98.5795]; // USA center

const GoogleMap = () => {
  return (
    <MapContainer center={center} zoom={4} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>USA Center</Popup>
      </Marker>
    </MapContainer>
  );
};

export default GoogleMap;


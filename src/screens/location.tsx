import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./UserLocationMap.css";

// Import marker images explicitly
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Properly configure the default icon for Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const UserLocationMap = () => {
  const [locations, setLocations] = useState<any[]>([]);

  // Fetch all user locations
  const fetchLocations = async () => {
    try {
      const response = await fetch("https://tonchi-backend-56d1c8d21716.herokuapp.com/api/pratybos/user-locations");
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="map-container">
      <h2>Vartotojų lokacijos žemėlapyje</h2>
      <MapContainer center={[54.6872, 25.2797]} zoom={6} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((user, index) => (
          <Marker
            key={index}
            position={[user.location.latitude, user.location.longitude]}
          >
            <Popup>
              Vartotojo lokacija: <br /> Latitude: {user.location.latitude}, Longitude: {user.location.longitude}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default UserLocationMap;

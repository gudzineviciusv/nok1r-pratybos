import React, { useEffect, useState } from "react";
import UserForm from "./form";
import { MapContainer } from "react-leaflet";

const UserDeviceDataCollector = () => {
  const [location, setLocation] = useState<any>(null);
  const [deviceData, setDeviceData] = useState<any>({});
  const [locationPermissionDenied, setLocationPermissionDenied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Function to get location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
          setLocationPermissionDenied(false); // Permission granted
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            console.error("Location access denied by user.");
            setLocationPermissionDenied(true);
          } else {
            console.error("Error getting location: ", error);
          }
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  // Function to get device data
  const getDeviceData = () => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    setDeviceData({
      userAgent,
      platform,
      language: navigator.language,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
    });
  };

  // Send data to backend
  const sendDataToBackend = async (data: any, isInitial = false) => {
    try {
      const response = await fetch(`https://tonchi-backend-56d1c8d21716.herokuapp.com/api/pratybos/collect-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log(`Data successfully sent to the backend`);
        setErrorMessage(""); // Clear any error messages
      } else if (response.status === 400) {
        const errorText = await response.text();
        if (errorText.includes("already been stored")) {
          setErrorMessage("This device has already been submitted.");
          console.error("This device has already been stored.");
        } else {
          setErrorMessage("An error occurred while submitting your data.");
        }
      } else {
        console.error("Error sending data to the backend");
        setErrorMessage("Error sending data to the backend.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred.");
    }
  };

  // Send device data immediately on app load
  useEffect(() => {
    getDeviceData();

    // Send the device data to backend without waiting for location
    const initialData = { deviceData, timestamp: new Date() };
    sendDataToBackend(initialData, true); // 'true' indicates initial collection

    // Now try to get the location
    getLocation();
  }, []);

  // Send data when both location and device data are available (location update)
  useEffect(() => {
    if (location && deviceData.userAgent) {
      const data = { location, deviceData, timestamp: new Date() };
      sendDataToBackend(data); // Normal data collection when location is available
    }
  }, [location, deviceData]);

  // Retry getting location every 60 seconds if permission was denied
  useEffect(() => {
    const retryInterval = setInterval(() => {
      if (locationPermissionDenied) {
        getLocation();
      }
    }, 60000); // Retry every 60 seconds

    return () => clearInterval(retryInterval); // Clear the interval on unmount
  }, [locationPermissionDenied]);

  return (
    <div>
            <MapContainer center={[54.6872, 25.2797]} zoom={6} style={{ height: "500px", width: "100%" }}/>
      {/* <UserForm /> */}
    </div>
  );
};

export default UserDeviceDataCollector;

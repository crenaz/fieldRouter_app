// app/javascript/google_maps.js

// Replace with your actual API key
const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY";

// Function to initialize the map
window.initMap = function () {
  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  const map = new google.maps.Map(mapElement, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  // Example marker
  new google.maps.Marker({
    position: { lat: -34.397, lng: 150.644 },
    map: map,
    title: "Hello World!",
  });
};

// Dynamically load the Google Maps script
const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
script.async = true;
script.defer = true;
document.head.appendChild(script);

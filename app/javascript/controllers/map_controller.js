// app/javascript/controllers/map_controller.js
import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    apiKey: String,
    lat: Number,
    lng: Number,
    zoom: Number,
  };

  connect() {
    if (!this.hasApiKeyValue) {
      console.error("Google Maps API key is missing!");
      return;
    }

    // Dynamically load Google Maps script if not already loaded
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKeyValue}&callback=initMap_${this.element.id}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      // Define callback globally for this specific map
      window[`initMap_${this.element.id}`] = () => this.initMap();
    } else {
      this.initMap();
    }
  }

  initMap() {
    const map = new google.maps.Map(this.element, {
      center: { lat: this.latValue || -34.397, lng: this.lngValue || 150.644 },
      zoom: this.zoomValue || 8,
    });

    // Example marker at center
    new google.maps.Marker({
      position: map.getCenter(),
      map: map,
      title: "Hello World!",
    });
  }
}

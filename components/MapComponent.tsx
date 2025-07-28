import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

interface MapLocation {
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  address?: string;
  phone?: string;
  type?: string;
}

interface MapComponentProps {
  locations: MapLocation[];
  initialRegion?: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  onMarkerPress?: (location: MapLocation) => void;
}

const MapComponent = forwardRef<any, MapComponentProps>(
  (
    {
      locations,
      initialRegion = { latitude: 29.7604, longitude: -95.3698, zoom: 10 },
      onMarkerPress,
    },
    ref
  ) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const markersRef = useRef<any[]>([]);

    // Replace with your Google Maps API key
    const GOOGLE_MAPS_API_KEY = "AIzaSyBYm2yHZ1eJ_XZ5pf2r4RlSqplYWxEE6u0";

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      zoomToLocation: (latitude: number, longitude: number) => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setCenter({ lat: latitude, lng: longitude });
          mapInstanceRef.current.setZoom(15);
        }
      },
    }));

    const getServiceTypeColor = (type?: string) => {
      switch (type) {
        case "hospital":
          return "#e74c3c";
        case "clinic":
          return "#3498db";
        case "support":
          return "#2ecc71";
        default:
          return "#95a5a6";
      }
    };

    const getServiceTypeIcon = (type?: string) => {
      switch (type) {
        case "hospital":
          return "🏥";
        case "clinic":
          return "🏢";
        case "support":
          return "🤝";
        default:
          return "📍";
      }
    };

    const getServiceTypeName = (type?: string) => {
      switch (type) {
        case "hospital":
          return "VA Medical Center";
        case "clinic":
          return "VA Clinic";
        case "support":
          return "Vet Center";
        default:
          return "Veteran Service";
      }
    };

    useEffect(() => {
      if (Platform.OS !== "web") return;

      const initializeMap = () => {
        if (!mapRef.current || !window.google) return;

        // Create map
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          zoom: initialRegion.zoom,
          center: { lat: initialRegion.latitude, lng: initialRegion.longitude },
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
        });

        // Clear existing markers
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        // Add markers
        locations.forEach((location) => {
          const marker = new window.google.maps.Marker({
            position: { lat: location.latitude, lng: location.longitude },
            map: mapInstanceRef.current,
            title: location.title,
          });

          // Create enhanced info window content
          const infoWindowContent = `
            <div style="
              padding: 16px; 
              max-width: 320px; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.4;
            ">
              <div style="
                display: flex; 
                align-items: center; 
                margin-bottom: 12px;
                padding-bottom: 8px;
                border-bottom: 2px solid ${getServiceTypeColor(location.type)};
              ">
                <span style="font-size: 24px; margin-right: 8px;">
                  ${getServiceTypeIcon(location.type)}
                </span>
                <div>
                  <h3 style="
                    margin: 0; 
                    color: #13345c; 
                    font-size: 18px; 
                    font-weight: bold;
                  ">${location.title}</h3>
                  <span style="
                    color: ${getServiceTypeColor(location.type)}; 
                    font-size: 12px; 
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                  ">${getServiceTypeName(location.type)}</span>
                </div>
              </div>
            
              <div style="margin-bottom: 12px;">
                <p style="
                  margin: 0 0 8px 0; 
                  color: #666; 
                  font-size: 14px;
                  font-style: italic;
                ">${location.description}</p>
              </div>

              ${
                location.address
                  ? `
                <div style="
                  display: flex; 
                  align-items: flex-start; 
                  margin-bottom: 8px;
                ">
                  <span style="
                    color: #666; 
                    margin-right: 8px; 
                    font-size: 16px;
                  ">📍</span>
                  <span style="
                    color: #444; 
                    font-size: 13px; 
                    line-height: 1.3;
                  ">${location.address}</span>
                </div>
              `
                  : ""
              }

              ${
                location.phone
                  ? `
                <div style="
                  display: flex; 
                  align-items: center; 
                  margin-bottom: 12px;
                ">
                  <span style="
                    color: #666; 
                    margin-right: 8px; 
                    font-size: 16px;
                  ">📞</span>
                  <a href="tel:${location.phone}" style="
                    color: #3498db; 
                    text-decoration: none; 
                    font-size: 14px;
                    font-weight: 500;
                  ">${location.phone}</a>
                </div>
              `
                  : ""
              }

              <div style="
                display: flex; 
                gap: 8px; 
                margin-top: 12px;
                padding-top: 8px;
                border-top: 1px solid #eee;
              ">
                <button onclick="window.open('https://maps.google.com/maps?daddr=${
                  location.latitude
                },${location.longitude}', '_blank')" style="
                  background: #3498db;
                  color: white;
                  border: none;
                  padding: 6px 12px;
                  border-radius: 4px;
                  font-size: 12px;
                  cursor: pointer;
                  font-weight: 500;
                ">🧭 Directions</button>
                
                ${
                  location.phone
                    ? `
                  <button onclick="window.open('tel:${location.phone}')" style="
                    background: #2ecc71;
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 4px;
                    font-size: 12px;
                    cursor: pointer;
                    font-weight: 500;
                  ">📞 Call</button>
                `
                    : ""
                }
              </div>
            </div>
          `;

          const infoWindow = new window.google.maps.InfoWindow({
            content: infoWindowContent,
            maxWidth: 350,
          });

          // Add click listener to show info window
          marker.addListener("click", () => {
            // Close all other info windows
            markersRef.current.forEach((m) => {
              if (m.infoWindow) {
                m.infoWindow.close();
              }
            });

            infoWindow.open(mapInstanceRef.current, marker);
          });

          // Add hover listeners for additional interactivity
          marker.addListener("mouseover", () => {
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            setTimeout(() => {
              marker.setAnimation(null);
            }, 750);
          });

          markersRef.current.push({ marker, infoWindow });
        });

        // Fit map to show all markers if there are any
        if (locations.length > 0) {
          const bounds = new window.google.maps.LatLngBounds();
          locations.forEach((location) => {
            bounds.extend({ lat: location.latitude, lng: location.longitude });
          });
          mapInstanceRef.current.fitBounds(bounds);

          // Set a reasonable zoom level for Houston area
          window.google.maps.event.addListenerOnce(
            mapInstanceRef.current,
            "bounds_changed",
            function () {
              if (mapInstanceRef.current.getZoom() > 12) {
                mapInstanceRef.current.setZoom(12);
              }
            }
          );
        }
      };

      // Load Google Maps API if not already loaded
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initializeMap;
        document.head.appendChild(script);
      } else {
        initializeMap();
      }

      return () => {
        // Cleanup markers on unmount
        markersRef.current.forEach((item) => {
          if (item.marker) {
            item.marker.setMap(null);
          }
        });
      };
    }, [locations, initialRegion, onMarkerPress]);

    if (Platform.OS !== "web") {
      return (
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>
            Maps are only available on web platform for this demo
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <div
          ref={mapRef}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 8,
          }}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    margin: 16,
  },
  fallbackText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

MapComponent.displayName = "MapComponent";

export default MapComponent;

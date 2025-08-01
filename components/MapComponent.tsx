import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity } from "react-native";

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
  const userLocationMarkerRef = useRef<any>(null);

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
      zoomToLocationAndShowInfo: (latitude: number, longitude: number) => {
        if (mapInstanceRef.current) {
          // Center and zoom the map
          mapInstanceRef.current.setCenter({ lat: latitude, lng: longitude });
          if (mapInstanceRef.current.getZoom() < 12) {
            mapInstanceRef.current.setZoom(12);
          }
          
          // Find the marker at this location and open its info window
          const matchingMarker = markersRef.current.find(item => {
            const markerPos = item.marker.getPosition();
            return markerPos && 
                   Math.abs(markerPos.lat() - latitude) < 0.0001 && 
                   Math.abs(markerPos.lng() - longitude) < 0.0001;
          });
          
          if (matchingMarker) {
            // Close all other info windows
            markersRef.current.forEach((m) => {
              if (m.infoWindow) {
                m.infoWindow.close();
              }
            });
            
            // Open the info window for this marker
            matchingMarker.infoWindow.open(mapInstanceRef.current, matchingMarker.marker);
          }
        }
      },
      centerOnUserLocation: () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              if (mapInstanceRef.current) {
                // Center map on user location
                mapInstanceRef.current.setCenter({ lat: latitude, lng: longitude });
                mapInstanceRef.current.setZoom(12);
                
                // Remove existing user location marker
                if (userLocationMarkerRef.current) {
                  userLocationMarkerRef.current.setMap(null);
                }
                
                // Add user location marker
                userLocationMarkerRef.current = new window.google.maps.Marker({
                  position: { lat: latitude, lng: longitude },
                  map: mapInstanceRef.current,
                  title: "Your Location",
                  icon: {
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="8" fill="#4285f4" stroke="#fff" stroke-width="2"/>
                        <circle cx="10" cy="10" r="3" fill="#fff"/>
                      </svg>
                    `)}`,
                    scaledSize: new window.google.maps.Size(20, 20),
                    anchor: new window.google.maps.Point(10, 10),
                  },
                });
              }
            },
            (error) => {
              console.warn('Geolocation error:', error);
              alert('Unable to get your location. Please check location permissions.');
            }
          );
        } else {
          alert('Geolocation is not supported by this browser.');
        }
      },
    }));

    const getServiceTypeColor = (type?: string) => {
      switch (type) {
        case "vso_office":
          return "#2ecc71";
        case "cpfs_dropoff":
          return "#3498db";
        case "homeless_shelter":
          return "#e74c3c";
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
        case "vso_office":
          return "🏢";
        case "cpfs_dropoff":
          return "📱";
        case "homeless_shelter":
          return "🏠";
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
        case "vso_office":
          return "VSO Office";
        case "cpfs_dropoff":
          return "CPFS Drop-off Location";
        case "homeless_shelter":
          return "Homeless Shelter";
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
          fullscreenControl: false,
          zoomControl: true,
        });

        // Clear existing markers
        markersRef.current.forEach((item) => {
          if (item.marker) {
            item.marker.setMap(null);
          }
        });
        markersRef.current = [];

        // Add markers
        locations.forEach((location) => {
          const marker = new window.google.maps.Marker({
            position: { lat: location.latitude, lng: location.longitude },
            map: mapInstanceRef.current,
            title: location.title,
            icon: {
              url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0.5" dy="0.5" stdDeviation="1" flood-opacity="0.3"/>
                    </filter>
                  </defs>
                  <circle cx="10" cy="10" r="9" fill="${getServiceTypeColor(location.type)}" 
                          stroke="#fff" stroke-width="1.5" filter="url(#shadow)"/>
                </svg>
              `)}`,
              scaledSize: new window.google.maps.Size(20, 20),
              anchor: new window.google.maps.Point(10, 10),
            },
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

            // Center the map on the clicked marker
            mapInstanceRef.current.setCenter({ 
              lat: location.latitude, 
              lng: location.longitude 
            });
            
            // Set appropriate zoom level if too zoomed out
            if (mapInstanceRef.current.getZoom() < 12) {
              mapInstanceRef.current.setZoom(12);
            }

            infoWindow.open(mapInstanceRef.current, marker);
          });

          // Create hover info window with basic info
          const hoverInfoWindow = new window.google.maps.InfoWindow({
            content: `
              <style>
                .gm-ui-hover-effect { display: none !important; }
                .gm-style-iw-chr { display: none !important; }
                .gm-style-iw-tc { display: none !important; }
                [class*="gm-style-iw"] {
                  border: none !important; 
                  border-color: transparent !important;
                  border-width: 0 !important;
                  background: white !important;
                  outline: none !important;
                }
                div[style*="border"] {
                  border: none !important;
                }
              </style>
              <div style="
                padding: 8px 12px; 
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.3;
                min-width: 180px;
              ">
                <div style="
                  display: flex; 
                  align-items: center; 
                  margin-bottom: 4px;
                ">
                  <span style="font-size: 14px; margin-right: 6px;">
                    ${getServiceTypeIcon(location.type)}
                  </span>
                  <span style="
                    color: ${getServiceTypeColor(location.type)}; 
                    font-size: 10px; 
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                  ">${getServiceTypeName(location.type)}</span>
                </div>
                <h4 style="
                  margin: 0; 
                  color: #13345c; 
                  font-size: 14px; 
                  font-weight: bold;
                ">${location.title}</h4>
              </div>
            `,
            maxWidth: 250,
            disableAutoPan: true,
          });

          // Add hover listeners for info window
          marker.addListener("mouseover", () => {
            // Close any other hover windows
            markersRef.current.forEach((m) => {
              if (m.hoverInfoWindow) {
                m.hoverInfoWindow.close();
              }
            });
            
            // Add bounce animation
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            setTimeout(() => {
              marker.setAnimation(null);
            }, 400);
            
            hoverInfoWindow.open(mapInstanceRef.current, marker);
          });

          marker.addListener("mouseout", () => {
            hoverInfoWindow.close();
          });

          markersRef.current.push({ marker, infoWindow, hoverInfoWindow });
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
        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  if (mapInstanceRef.current) {
                    // Center map on user location
                    mapInstanceRef.current.setCenter({ lat: latitude, lng: longitude });
                    mapInstanceRef.current.setZoom(12);
                    
                    // Remove existing user location marker
                    if (userLocationMarkerRef.current) {
                      userLocationMarkerRef.current.setMap(null);
                    }
                    
                    // Add user location marker
                    userLocationMarkerRef.current = new window.google.maps.Marker({
                      position: { lat: latitude, lng: longitude },
                      map: mapInstanceRef.current,
                      title: "Your Location",
                      icon: {
                        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                          <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="8" fill="#4285f4" stroke="#fff" stroke-width="2"/>
                            <circle cx="10" cy="10" r="3" fill="#fff"/>
                          </svg>
                        `)}`,
                        scaledSize: new window.google.maps.Size(20, 20),
                        anchor: new window.google.maps.Point(10, 10),
                      },
                    });
                  }
                },
                (error) => {
                  console.warn('Geolocation error:', error);
                  alert('Unable to get your location. Please check location permissions.');
                }
              );
            } else {
              alert('Geolocation is not supported by this browser.');
            }
          }}
        >
          <Text style={styles.locationButtonText}>📍</Text>
        </TouchableOpacity>
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
  locationButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  locationButtonText: {
    fontSize: 16,
  },
});

MapComponent.displayName = "MapComponent";

export default MapComponent;

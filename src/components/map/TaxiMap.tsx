import React, { useEffect, useMemo, useState } from "react";
import { Layer, Map, Marker, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { HoveredRoute, Trip } from "../../types/map";
import { fetchTrips } from "../../api/trips";
import { createRoutesGeoJSON } from "../../utils/geojson";

export default function TaxiMap({
  MAPBOX_ACCESS_TOKEN,
  filterData
}: {
  MAPBOX_ACCESS_TOKEN: string;
  filterData: any;
}) {
  const [viewport, setViewport] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 10
  });
  const [tripData, setTripData] = useState<Trip[]>([]);
  const [hoveredRoute, setHoveredRoute] = useState<HoveredRoute | null>(null);
  const [hoveredRouteId, setHoveredRouteId] = useState<string | null>(null);

  useEffect(() => {
    async function loadTrips() {
      try {
        const trips = await fetchTrips(filterData);
        setTripData(trips);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadTrips();
  }, [filterData]);

  const routesGeoJSON = useMemo(
    () => createRoutesGeoJSON(tripData),
    [tripData]
  );

  return (
    <>
      <Map
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        style={{ width: "100%", height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        interactiveLayerIds={["route-lines"]}
        onMouseMove={(event) => {
          const feature = event.features && event.features[0];
          if (feature) {
            const route = tripData.find(
              (trip) => trip.id === feature.properties?.id
            );
            if (route) {
              setHoveredRoute({
                id: route.id,
                fare: route.fare,
                distance: route.distance,
                time: route.time,
                x: event.point.x,
                y: event.point.y
              });
              setHoveredRouteId(route.id);
            } else {
              setHoveredRoute(null);
              setHoveredRouteId(null);
            }
          } else {
            setHoveredRoute(null);
            setHoveredRouteId(null);
          }
        }}
      >
        <Source id="routes" type="geojson" data={routesGeoJSON}>
          <Layer
            id="route-lines"
            type="line"
            layout={{
              "line-join": "round",
              "line-cap": "round"
            }}
            paint={{
              "line-color": [
                "case",
                ["==", ["get", "id"], hoveredRouteId],
                "#ff0000",
                "#007cbf"
              ],
              "line-width": 5
            }}
          />
        </Source>

        {tripData.map((trip, index) => (
          <React.Fragment key={index}>
            <Marker
              longitude={trip.pickup[0]}
              latitude={trip.pickup[1]}
              color="green"
            />
            <Marker
              longitude={trip.dropoff[0]}
              latitude={trip.dropoff[1]}
              color="red"
            />
          </React.Fragment>
        ))}
      </Map>

      {hoveredRoute && (
        <div
          className="absolute bg-white p-2 shadow-md"
          style={{ left: `${hoveredRoute.x}px`, top: `${hoveredRoute.y}px` }}
        >
          <div>ID: {hoveredRoute.id}</div>
          <div>Fare: ${hoveredRoute.fare}</div>
          <div>Distance: {hoveredRoute.distance} km</div>
          <div>Time: {new Date(hoveredRoute.time).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</div>
        </div>
      )}
    </>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import { Layer, Map, Marker, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { tripData } from "../../data/tripData";
import useFetchRoutes from '@/hooks/useFetchRoutes'

export default function TaxiMap({ MAPBOX_ACCESS_TOKEN }: { MAPBOX_ACCESS_TOKEN: string }) {
  const [viewport, setViewport] = useState({
    latitude: tripData[0].pickup[1],
    longitude: tripData[0].pickup[0],
    zoom: 15
  });
  const [hoveredRoute, setHoveredRoute] = useState<any>(null);
  const routes = useFetchRoutes(MAPBOX_ACCESS_TOKEN)


  const routesGeoJSON = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: routes.map((route, index) => ({
        type: "Feature",
        properties: {
          id: tripData[index].id
        },
        geometry: route
      }))
    };
  }, [routes]);
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
            setHoveredRoute(
              tripData.find((trip) => trip.id === feature.properties?.id)
            );
          } else {
            setHoveredRoute(null);
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
              "line-color": "#007cbf",
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
        <div className="absolute bg-white p-2 shadow-md">
          <div>ID: {hoveredRoute.id}</div>
          <div>Fare: {hoveredRoute.fare}</div>
          <div>Distance: {hoveredRoute.distance} km</div>
          <div>Time: {hoveredRoute.time}</div>
        </div>
      )}
    </>
  );
}

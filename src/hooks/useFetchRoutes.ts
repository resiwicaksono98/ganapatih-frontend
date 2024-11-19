import { tripData } from './../data/tripData';
import React, { useEffect, useState } from 'react'

export default function useFetchRoutes(MAPBOX_ACCESS_TOKEN: string) {
    const [routes, setRoutes] = useState<any[]>([])

    useEffect(() => {
        const fetchRoutes = async () => {
          const newRoutes = await Promise.all(
            tripData.map(async (trip) => {
              const response = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${trip.pickup[0]}%2C${trip.pickup[1]}%3B${trip.dropoff[0]}%2C${trip.dropoff[1]}?alternatives=true&exclude=motorway&geometries=geojson&language=en&overview=full&steps=true&access_token=${MAPBOX_ACCESS_TOKEN}`
              );
              const data = await response.json();
              return data.routes[0].geometry;
            })
          );
          setRoutes(newRoutes);
        };

        fetchRoutes();
      }, [MAPBOX_ACCESS_TOKEN]);
  return routes;
}

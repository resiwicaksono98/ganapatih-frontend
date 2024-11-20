import { Trip } from "../types/map";

export function createRoutesGeoJSON(tripData: Trip[]) {
  return {
    type: "FeatureCollection",
    features: tripData.map((trip: Trip) => ({
      type: "Feature",
      properties: {
        id: trip.id
      },
      geometry: {
        type: "LineString",
        coordinates: [trip.pickup, trip.dropoff]
      }
    }))
  };
}

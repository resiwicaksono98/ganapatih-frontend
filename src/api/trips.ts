import { Trip } from "../types/map";

const APIURL = import.meta.env.VITE_API_URL;

export const fetchTrips = async (filter: {
  fareAmount?: number;
  minDistance?: number;
  maxDistance?: number;
  pickupDatetime?: number;
  pickoffDatetime?: number;
  page?: number;
  paymentType?: string;
}): Promise<Trip[]> => {
  let url = `${APIURL}/trips?`;

  if (filter?.fareAmount) {
    url += `fareAmount=${filter.fareAmount}&`;
  }
  if (filter?.minDistance) {
    url += `minDistance=${filter.minDistance}&`;
  }
  if (filter?.maxDistance) {
    url += `maxDistance=${filter.maxDistance}&`;
  }
  if (filter?.pickupDatetime) {
    url += `pickupDatetime=${filter.pickupDatetime}&`;
  }
  if (filter?.pickoffDatetime) {
    url += `pickoffDatetime=${filter.pickoffDatetime}&`;
  }
  if (filter?.page) {
    url += `page=${filter.page}&`;
  }
  if (filter?.paymentType) {
    url += `paymentType=${filter.paymentType}&`;
  }

  const response = await fetch(url.slice(0, -1));
  const data = await response.json();

  return data.data.map((trip: any) => ({
    id: trip.id,
    pickup: [
      parseFloat(trip.pickup_longitude),
      parseFloat(trip.pickup_latitude)
    ],
    dropoff: [
      parseFloat(trip.dropoff_longitude),
      parseFloat(trip.dropoff_latitude)
    ],
    fare: parseFloat(trip.fare_amount),
    distance: parseFloat(trip.trip_distance),
    time: trip.pickup_datetime
  }));
};

export const fetchDiagramMonthlyTrip = async () => {
  const response = await fetch(`${APIURL}/trips/monthly-trips`);
  const data = await response.json();

  return data;
};

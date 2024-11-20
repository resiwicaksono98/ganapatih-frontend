export interface Trip {
    id: string;
    pickup: [number, number];
    dropoff: [number, number];
    fare: number;
    distance: number;
    time: string;
    color: string;
  }

  export interface HoveredRoute {
    id: string;
    fare: number;
    distance: number;
    time: string;
    x: number;
    y: number;
  }

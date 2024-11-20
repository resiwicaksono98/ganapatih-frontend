import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import TaxiMap from "@/components/map/TaxiMap";
import TripFilter from "@/components/filter/TripFilter";
import TripAnalysisChart from "@/components/chart/TripAnalysisChart";
import { useState } from "react";

const MAPBOX_ACESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

function App() {
  const [filterData, setFilterData] = useState(null);

  const handleFilterChange = (data: any) => {
    setFilterData(data);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">
          Visualisasi Perjalanan Taksi
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Peta Perjalanan</CardTitle>
              <CardDescription>Visualisasi rute perjalanan</CardDescription>
            </CardHeader>
            <CardContent>
              <TaxiMap
                MAPBOX_ACCESS_TOKEN={MAPBOX_ACESS_TOKEN}
                filterData={filterData}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filter Perjalanan</CardTitle>
              <CardDescription>
                Sesuaikan parameter untuk melihat perjalanan tertentu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TripFilter onFilterChange={handleFilterChange} />
            </CardContent>
          </Card>
        </div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Analisis Total Perjalanan </CardTitle>
            <CardDescription>
              Total Perjalanan Perbulan Beserta total pembayaran perbulan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TripAnalysisChart />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
export default App;

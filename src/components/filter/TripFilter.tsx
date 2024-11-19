import { useState } from "react";

import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default function TripFilter() {
  const [fareRange, setFareRange] = useState([0, 200000]);
  const [paymentType, setPaymentType] = useState("all");
  const [timeRange, setTimeRange] = useState(["00:00", "23:59"]);
  const [distanceRange, setDistanceRange] = useState([0, 50]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Rentang Tarif</label>
        <Slider
          value={fareRange}
          onValueChange={setFareRange}
          min={0}
          max={200000}
          step={1}
        />
        <div className="text-sm text-gray-500 mt-1">
          Rp.{fareRange[0]} - Rp.{fareRange[1]}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Rentang Waktu</label>
        <Slider
          value={timeRange.map((time) => parseInt(time.split(":")[0], 10))}
          onValueChange={(values) =>
            setTimeRange(values.map((value) => `${value}:00`))
          }
          min={0}
          max={23}
          step={1}
        />
        <div className="text-sm text-gray-500 mt-1">
          {timeRange[0]} - {timeRange[1]}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Rentang Jarak (km)
        </label>
        <Slider
          value={distanceRange}
          onValueChange={setDistanceRange}
          min={0}
          max={50}
          step={1}
        />
        <div className="text-sm text-gray-500 mt-1">
          {distanceRange[0]} - {distanceRange[1]} km
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Jenis Pembayaran
        </label>
        <Select value={paymentType} onValueChange={setPaymentType}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih jenis pembayaran" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="cash">Tunai</SelectItem>
            <SelectItem value="card">Kartu</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

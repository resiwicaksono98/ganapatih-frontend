import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../components/ui/select";
import { Input } from "../ui/input";
import useTripFilter from "../../hooks/useTripFilter";

interface Filter {
  fareAmount?: number;
  paymentType: string;
  pickupDatetime: string;
  dropoffDatetime: string;
  minDistance: string;
  maxDistance: string;
}

interface TripFilterProps {
  onFilterChange?: (filter: Filter) => void;
}

export default function TripFilter(props: TripFilterProps) {
    const { filter, setFilter } = useTripFilter(props.onFilterChange as any);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Rentang Tarif</label>
        <Input
          type="number"
          onKeyUp={(event) => {
            const value = parseInt(event.currentTarget.value, 10);
            setFilter({
              ...filter,
              fareAmount: isNaN(value) ? undefined : value
            });
          }}
          placeholder="$"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Rentang Waktu</label>
        <div className="flex items-center space-x-2">
          <Input
            type="date"
            value={filter.pickupDatetime}
            onChange={(event) => {
              setFilter({
                ...filter,
                pickupDatetime: event.target.value
              });
            }}
          />
          <span>-</span>
          <Input
            type="date"
            value={filter.dropoffDatetime}
            onChange={(event) => {
              setFilter({
                ...filter,
                dropoffDatetime: event.target.value
              });
            }}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Rentang Jarak (km)
        </label>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            value={filter.minDistance}
            onChange={(event) => {
              setFilter({
                ...filter,
                minDistance: event.target.value
              });
            }}
            placeholder="Min Distance"
          />
          <span>-</span>
          <Input
            type="number"
            value={filter.maxDistance}
            onChange={(event) => {
              setFilter({
                ...filter,
                maxDistance: event.target.value
              });
            }}
            placeholder="Max distance"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Jenis Pembayaran
        </label>
        <Select
          value={filter.paymentType}
          onValueChange={(value) =>
            setFilter({ ...filter, paymentType: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih jenis pembayaran" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="CSH">Cash</SelectItem>
            <SelectItem value="CRD">Credit</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

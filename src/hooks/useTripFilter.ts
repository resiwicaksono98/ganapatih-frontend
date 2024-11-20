import  { useEffect, useState } from "react";

interface Filter {
  fareAmount?: number;
  paymentType?: string;
  pickupDatetime?: string;
  dropoffDatetime?: string;
  minDistance?: string;
  maxDistance?: string;
}
export default function useTripFilter(
  onFilterChange?: (filter: Filter) => void
) {
  const [filter, setFilter] = useState<{
    fareAmount?: number;
    paymentType?: string;
    pickupDatetime?: string;
    dropoffDatetime?: string;
    minDistance?: string;
    maxDistance?: string;
  }>({});
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (typeof onFilterChange === "function") {
        onFilterChange({
          fareAmount: filter.fareAmount ?? 0,
          paymentType: filter.paymentType ?? "",
          pickupDatetime: filter.pickupDatetime ?? "",
          dropoffDatetime: filter.dropoffDatetime ?? "",
          minDistance: filter.minDistance ?? "",
          maxDistance: filter.maxDistance ?? ""
        });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [filter]);

  return { filter, setFilter };
}

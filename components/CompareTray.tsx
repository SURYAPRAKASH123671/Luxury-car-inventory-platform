"use client";

import Link from "next/link";
import { Car } from "@/types";
import { Scale, X } from "lucide-react";

interface CompareTrayProps {
  cars: Car[];
  onRemove: (carId: string) => void;
  onClear: () => void;
}

const formatPrice = (price: number) => {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
  return `₹${price.toLocaleString()}`;
};

export default function CompareTray({ cars, onRemove, onClear }: CompareTrayProps) {
  if (cars.length === 0) return null;

  return (
    <section className="mt-8 rounded-lg border border-luxury-metallic-red/30 bg-luxury-dark-gray p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Scale className="text-luxury-metallic-red" size={20} />
          <h2 className="text-xl font-semibold">Compare Garage</h2>
          <span className="rounded-full bg-luxury-black px-3 py-1 text-xs text-luxury-silver">
            {cars.length}/3 selected
          </span>
        </div>
        <button onClick={onClear} className="text-sm text-luxury-silver hover:text-white">
          Clear comparison
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-luxury-silver/10 text-left text-luxury-silver">
              <th className="py-3 pr-4">Metric</th>
              {cars.map((car) => (
                <th key={car.id} className="py-3 pr-4">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/cars/${car.id}`} className="text-white hover:text-luxury-metallic-red">
                      {car.brand} {car.model}
                    </Link>
                    <button onClick={() => onRemove(car.id)} aria-label="Remove from comparison">
                      <X size={16} />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Price", (car: Car) => formatPrice(car.price)],
              ["Year", (car: Car) => car.year],
              ["Mileage", (car: Car) => `${car.mileage.toLocaleString()} km`],
              ["Fuel", (car: Car) => car.fuelType],
              ["Body", (car: Car) => car.bodyType],
              ["Power", (car: Car) => car.specifications?.power || "-"],
              ["Bookings", (car: Car) => `${car.bookings} enquiries`],
            ].map(([label, getter]) => (
              <tr key={String(label)} className="border-b border-luxury-silver/10">
                <td className="py-3 pr-4 text-luxury-silver">{String(label)}</td>
                {cars.map((car) => (
                  <td key={car.id} className="py-3 pr-4 font-medium">
                    {(getter as (car: Car) => string | number)(car)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

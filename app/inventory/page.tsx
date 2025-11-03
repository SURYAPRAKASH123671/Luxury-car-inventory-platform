"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import FilterBar from "@/components/FilterBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { carsData } from "@/data/cars";
import { FilterOptions, SortOption } from "@/types";

export default function Inventory() {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortOption, setSortOption] = useState<SortOption>({
    field: "popularity",
    order: "desc",
  });

  const filteredAndSortedCars = useMemo(() => {
    let filtered = [...carsData];

    // Apply filters
    if (filters.brand && filters.brand.length > 0) {
      filtered = filtered.filter((car) => filters.brand?.includes(car.brand));
    }

    if (filters.minPrice) {
      filtered = filtered.filter((car) => car.price >= filters.minPrice!);
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((car) => car.price <= filters.maxPrice!);
    }

    if (filters.minYear) {
      filtered = filtered.filter((car) => car.year >= filters.minYear!);
    }

    if (filters.maxYear) {
      filtered = filtered.filter((car) => car.year <= filters.maxYear!);
    }

    if (filters.transmission && filters.transmission.length > 0) {
      filtered = filtered.filter((car) =>
        filters.transmission?.includes(car.transmission)
      );
    }

    if (filters.fuelType && filters.fuelType.length > 0) {
      filtered = filtered.filter((car) =>
        filters.fuelType?.includes(car.fuelType)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortOption.field === "price") {
        return sortOption.order === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortOption.field === "year") {
        return sortOption.order === "asc" ? a.year - b.year : b.year - a.year;
      }
      return 0; // popularity - keep original order
    });

    return filtered;
  }, [filters, sortOption]);

  const resetFilters = () => {
    setFilters({});
  };

  return (
    <main className="min-h-screen pt-20">
      <Navbar />
      <WhatsAppButton />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Our Inventory
          </h1>
          <p className="text-luxury-silver text-lg">
            Explore our premium collection of certified pre-owned luxury vehicles
          </p>
          <p className="text-luxury-silver mt-2">
            Showing {filteredAndSortedCars.length} car
            {filteredAndSortedCars.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        <FilterBar
          filters={filters}
          sortOption={sortOption}
          onFilterChange={setFilters}
          onSortChange={setSortOption}
          onReset={resetFilters}
        />

        {filteredAndSortedCars.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-luxury-silver text-xl mb-4">
              No cars found matching your criteria
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-luxury-metallic-red hover:bg-red-700 rounded-md font-semibold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredAndSortedCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}


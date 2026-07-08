"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import FilterBar from "@/components/FilterBar";
import CompareTray from "@/components/CompareTray";
import WhatsAppButton from "@/components/WhatsAppButton";
import { bodyTypes, carsData } from "@/data/cars";
import { api } from "@/lib/api";
import { readJson, storageKeys } from "@/lib/storage";
import { AuthSession, Car, FilterOptions, SortOption } from "@/types";

export default function Inventory() {
  const [cars, setCars] = useState<Car[]>(carsData);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [apiStatus, setApiStatus] = useState<"live" | "local">("local");
  const [sortOption, setSortOption] = useState<SortOption>({
    field: "popularity",
    order: "desc",
  });

  useEffect(() => {
    const storedSession = readJson<AuthSession | null>(storageKeys.session, null);
    setSession(storedSession);
    setWishlistIds(readJson<string[]>(storageKeys.wishlist, []));
    setCompareIds(readJson<string[]>(storageKeys.compare, []));

    api.cars()
      .then((items) => {
        setCars(items);
        setApiStatus("live");
      })
      .catch(() => {
        setCars(carsData);
        setApiStatus("local");
      });

    if (storedSession) {
      api.wishlist(storedSession.token)
        .then((items) => setWishlistIds(items.map((car) => car.id)))
        .catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cars15:wishlist", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem("cars15:compare", JSON.stringify(compareIds));
  }, [compareIds]);

  const filteredAndSortedCars = useMemo(() => {
    let filtered = [...cars];

    if (filters.search?.trim()) {
      const query = filters.search.toLowerCase().trim();
      filtered = filtered.filter((car) =>
        [
          car.brand,
          car.model,
          car.variant,
          car.fuelType,
          car.transmission,
          car.bodyType,
          car.location,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

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

    if (filters.bodyType && filters.bodyType.length > 0) {
      filtered = filtered.filter((car) =>
        filters.bodyType?.includes(car.bodyType)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortOption.field === "price") {
        return sortOption.order === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortOption.field === "year") {
        return sortOption.order === "asc" ? a.year - b.year : b.year - a.year;
      }
      return b.views - a.views;
    });

    return filtered;
  }, [cars, filters, sortOption]);

  const categoryStats = useMemo(
    () =>
      bodyTypes.map((type) => ({
        type,
        count: cars.filter((car) => car.bodyType === type).length,
      })),
    [cars]
  );

  const groupedCars = useMemo(
    () =>
      bodyTypes
        .map((type) => ({
          type,
          cars: filteredAndSortedCars.filter((car) => car.bodyType === type),
        }))
        .filter((group) => group.cars.length > 0),
    [filteredAndSortedCars]
  );

  const resetFilters = () => {
    setFilters({});
  };

  const selectBodyType = (type: string) => {
    const selected = filters.bodyType?.includes(type);
    setFilters({
      ...filters,
      bodyType: selected ? [] : [type],
    });
  };

  const toggleWishlist = async (carId: string) => {
    if (session) {
      try {
        const next = wishlistIds.includes(carId)
          ? await api.removeWishlist(session.token, carId)
          : await api.addWishlist(session.token, carId);
        setWishlistIds(next.map((car) => car.id));
        return;
      } catch {
        setApiStatus("local");
      }
    }

    setWishlistIds((current) =>
      current.includes(carId)
        ? current.filter((id) => id !== carId)
        : [...current, carId]
    );
  };

  const toggleCompare = (carId: string) => {
    setCompareIds((current) => {
      if (current.includes(carId)) return current.filter((id) => id !== carId);
      if (current.length >= 3) return current;
      return [...current, carId];
    });
  };

  const comparedCars = cars.filter((car) => compareIds.includes(car.id));

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
            Browse verified Indian used cars by Hatchback, Sedan, SUV, and MPV categories
          </p>
          <p className="text-luxury-silver mt-2">
            Showing {filteredAndSortedCars.length} car
            {filteredAndSortedCars.length !== 1 ? "s" : ""}
            <span className="ml-2 text-sm text-luxury-silver/80">
              · {apiStatus === "live" ? "Spring Boot API live" : "Local demo data"}
            </span>
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["Inventory", cars.length],
              ["Saved", wishlistIds.length],
              ["Compare", compareIds.length],
              ["Bookings", cars.reduce((total, car) => total + car.bookings, 0)],
            ].map(([label, value]) => (
              <div key={String(label)} className="rounded-lg border border-luxury-silver/10 bg-luxury-dark-gray p-4">
                <p className="text-2xl font-bold text-luxury-metallic-red">{value}</p>
                <p className="text-sm text-luxury-silver">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {categoryStats.map((category) => {
              const isSelected = filters.bodyType?.includes(category.type);
              return (
                <button
                  key={category.type}
                  onClick={() => selectBodyType(category.type)}
                  className={`rounded-lg border p-4 text-left transition-colors ${
                    isSelected
                      ? "border-luxury-metallic-red bg-luxury-metallic-red/15"
                      : "border-luxury-silver/10 bg-luxury-dark-gray hover:border-luxury-metallic-red/50"
                  }`}
                >
                  <p className="text-xl font-bold">{category.type}</p>
                  <p className="text-sm text-luxury-silver">
                    {category.count} Indian car{category.count !== 1 ? "s" : ""}
                  </p>
                </button>
              );
            })}
          </div>
        </motion.div>

        <FilterBar
          filters={filters}
          sortOption={sortOption}
          onFilterChange={setFilters}
          onSortChange={setSortOption}
          onReset={resetFilters}
        />

        <CompareTray
          cars={comparedCars}
          onRemove={toggleCompare}
          onClear={() => setCompareIds([])}
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
          <div className="mt-8 space-y-12">
            {groupedCars.map((group) => (
              <section key={group.type}>
                <div className="mb-4 flex items-end justify-between gap-4 border-b border-luxury-silver/10 pb-3">
                  <div>
                    <h2 className="text-2xl font-semibold">{group.type}</h2>
                    <p className="text-sm text-luxury-silver">
                      {group.cars.length} matching Indian used car
                      {group.cars.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => selectBodyType(group.type)}
                    className="rounded-md border border-luxury-silver/20 px-3 py-2 text-sm text-luxury-silver transition-colors hover:border-luxury-metallic-red hover:text-white"
                  >
                    {filters.bodyType?.includes(group.type) ? "Show all" : `View ${group.type}`}
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {group.cars.map((car) => (
                    <CarCard
                      key={car.id}
                      car={car}
                      isWishlisted={wishlistIds.includes(car.id)}
                      isCompared={compareIds.includes(car.id)}
                      onWishlistToggle={toggleWishlist}
                      onCompareToggle={toggleCompare}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}


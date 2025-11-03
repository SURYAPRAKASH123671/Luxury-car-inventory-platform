"use client";

import { useState } from "react";
import { FilterOptions, SortOption } from "@/types";
import { Filter, X } from "lucide-react";
import { brands } from "@/data/cars";

interface FilterBarProps {
  filters: FilterOptions;
  sortOption: SortOption;
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOption) => void;
  onReset: () => void;
}

export default function FilterBar({
  filters,
  sortOption,
  onFilterChange,
  onSortChange,
  onReset,
}: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleBrandToggle = (brand: string) => {
    const currentBrands = filters.brand || [];
    const newBrands = currentBrands.includes(brand)
      ? currentBrands.filter((b) => b !== brand)
      : [...currentBrands, brand];
    onFilterChange({ ...filters, brand: newBrands });
  };

  const handlePriceChange = (field: "minPrice" | "maxPrice", value: number) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const handleYearChange = (field: "minYear" | "maxYear", value: number) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="bg-luxury-dark-gray border-b border-luxury-silver/20 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-luxury-black border border-luxury-silver/20 rounded-md hover:border-luxury-metallic-red transition-colors"
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-4">
            <select
              value={`${sortOption.field}-${sortOption.order}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-");
                onSortChange({ field: field as any, order: order as any });
              }}
              className="px-4 py-2 bg-luxury-black border border-luxury-silver/20 rounded-md text-white focus:outline-none focus:border-luxury-metallic-red"
            >
              <option value="popularity-desc">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Year: Newest First</option>
              <option value="year-asc">Year: Oldest First</option>
            </select>

            {(filters.brand?.length || filters.minPrice || filters.maxPrice) && (
              <button
                onClick={onReset}
                className="flex items-center gap-2 px-4 py-2 text-luxury-silver hover:text-white transition-colors"
              >
                <X size={20} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {isOpen && (
          <div className="py-6 border-t border-luxury-silver/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Brand Filter */}
              <div>
                <h4 className="font-semibold mb-3">Brand</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.brand?.includes(brand) || false}
                        onChange={() => handleBrandToggle(brand)}
                        className="w-4 h-4 text-luxury-metallic-red bg-luxury-black border-luxury-silver/20 rounded focus:ring-luxury-metallic-red"
                      />
                      <span className="text-luxury-silver">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="font-semibold mb-3">Budget (₹)</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-luxury-silver mb-1">
                      Min Price (Lakhs)
                    </label>
                    <input
                      type="number"
                      value={filters.minPrice ? filters.minPrice / 100000 : ""}
                      onChange={(e) =>
                        handlePriceChange(
                          "minPrice",
                          Number(e.target.value) * 100000 || 0
                        )
                      }
                      placeholder="10"
                      className="w-full px-4 py-2 bg-luxury-black border border-luxury-silver/20 rounded-md text-white focus:outline-none focus:border-luxury-metallic-red"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-luxury-silver mb-1">
                      Max Price (Crores)
                    </label>
                    <input
                      type="number"
                      value={filters.maxPrice ? filters.maxPrice / 10000000 : ""}
                      onChange={(e) =>
                        handlePriceChange(
                          "maxPrice",
                          Number(e.target.value) * 10000000 || 0
                        )
                      }
                      placeholder="2"
                      className="w-full px-4 py-2 bg-luxury-black border border-luxury-silver/20 rounded-md text-white focus:outline-none focus:border-luxury-metallic-red"
                    />
                  </div>
                </div>
              </div>

              {/* Year Filter */}
              <div>
                <h4 className="font-semibold mb-3">Year</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-luxury-silver mb-1">
                      From
                    </label>
                    <input
                      type="number"
                      value={filters.minYear || ""}
                      onChange={(e) =>
                        handleYearChange("minYear", Number(e.target.value) || 0)
                      }
                      placeholder="2015"
                      className="w-full px-4 py-2 bg-luxury-black border border-luxury-silver/20 rounded-md text-white focus:outline-none focus:border-luxury-metallic-red"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-luxury-silver mb-1">
                      To
                    </label>
                    <input
                      type="number"
                      value={filters.maxYear || ""}
                      onChange={(e) =>
                        handleYearChange("maxYear", Number(e.target.value) || 0)
                      }
                      placeholder="2025"
                      className="w-full px-4 py-2 bg-luxury-black border border-luxury-silver/20 rounded-md text-white focus:outline-none focus:border-luxury-metallic-red"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


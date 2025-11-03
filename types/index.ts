export interface Car {
  id: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  mileage: number;
  transmission: string;
  fuelType: string;
  price: number;
  image: string;
  images?: string[];
  description?: string;
  specifications?: {
    engine?: string;
    power?: string;
    torque?: string;
    seats?: number;
    colors?: string[];
  };
}

export interface FilterOptions {
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  transmission?: string[];
  fuelType?: string[];
}

export interface SortOption {
  field: "price" | "year" | "popularity";
  order: "asc" | "desc";
}


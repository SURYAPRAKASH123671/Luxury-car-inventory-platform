export interface Car {
  id: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  mileage: number;
  transmission: string;
  fuelType: string;
  bodyType: string;
  location: string;
  views: number;
  bookings: number;
  price: number;
  image: string;
  images?: string[];
  description?: string;
  features?: string[];
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
  bodyType?: string[];
  search?: string;
}

export interface SortOption {
  field: "price" | "year" | "popularity";
  order: "asc" | "desc";
}

export interface DemoUser {
  id?: number;
  name: string;
  email: string;
  phone: string;
  role: "USER" | "ADMIN";
}

export interface AuthSession {
  token: string;
  user: DemoUser;
}

export interface TestDriveBooking {
  id: string;
  carId: string;
  carName: string;
  name: string;
  phone: string;
  date: string;
  status: "Requested" | "Confirmed" | "Completed";
  createdAt: string;
}

export interface PriceAlert {
  id: string;
  carId: string;
  carName: string;
  email: string;
  targetPrice: number;
  createdAt: string;
}

export interface AnalyticsResponse {
  totalCars: number;
  totalBookings: number;
  registeredUsers: number;
  totalViews: number;
  mostViewed: { id: string; name: string; views: number; bookings: number }[];
  brandDemand: { brand: string; cars: number; bookings: number }[];
}


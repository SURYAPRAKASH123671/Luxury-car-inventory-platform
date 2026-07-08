import { AnalyticsResponse, AuthSession, Car, DemoUser, PriceAlert, TestDriveBooking } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

type ApiBooking = {
  id: number;
  carId: string;
  carName: string;
  name: string;
  phone: string;
  preferredDate: string;
  status: "REQUESTED" | "CONFIRMED" | "COMPLETED";
  createdAt: string;
};

type ApiAlert = {
  id: number;
  carId: string;
  carName: string;
  email: string;
  targetPrice: number;
  active: boolean;
  createdAt: string;
};

const statusFromApi = (status: ApiBooking["status"]): TestDriveBooking["status"] => {
  if (status === "CONFIRMED") return "Confirmed";
  if (status === "COMPLETED") return "Completed";
  return "Requested";
};

const statusToApi = (status: TestDriveBooking["status"]) =>
  status.toUpperCase() as ApiBooking["status"];

const mapBooking = (booking: ApiBooking): TestDriveBooking => ({
  id: String(booking.id),
  carId: booking.carId,
  carName: booking.carName,
  name: booking.name,
  phone: booking.phone,
  date: booking.preferredDate,
  status: statusFromApi(booking.status),
  createdAt: booking.createdAt,
});

const mapAlert = (alert: ApiAlert): PriceAlert => ({
  id: String(alert.id),
  carId: alert.carId,
  carName: alert.carName,
  email: alert.email,
  targetPrice: Number(alert.targetPrice),
  createdAt: alert.createdAt,
});

async function request<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with ${response.status}`);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const api = {
  baseUrl: API_BASE_URL,

  login: (email: string, password: string) =>
    request<AuthSession>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (payload: DemoUser & { password: string }) =>
    request<AuthSession>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  me: (token: string) => request<DemoUser>("/api/auth/me", {}, token),

  cars: () => request<Car[]>("/api/cars"),

  car: (id: string) => request<Car>(`/api/cars/${id}`),

  analytics: () => request<AnalyticsResponse>("/api/analytics"),

  wishlist: (token: string) => request<Car[]>("/api/wishlist", {}, token),

  addWishlist: (token: string, carId: string) =>
    request<Car[]>(`/api/wishlist/${carId}`, { method: "POST" }, token),

  removeWishlist: (token: string, carId: string) =>
    request<Car[]>(`/api/wishlist/${carId}`, { method: "DELETE" }, token),

  createBooking: (payload: { carId: string; name: string; phone: string; preferredDate: string }, token?: string) =>
    request<ApiBooking>(
      "/api/bookings",
      { method: "POST", body: JSON.stringify(payload) },
      token
    ).then(mapBooking),

  myBookings: (token: string) =>
    request<ApiBooking[]>("/api/bookings/me", {}, token).then((items) => items.map(mapBooking)),

  adminBookings: (token: string) =>
    request<ApiBooking[]>("/api/admin/bookings", {}, token).then((items) => items.map(mapBooking)),

  updateBookingStatus: (token: string, id: string, status: TestDriveBooking["status"]) =>
    request<ApiBooking>(
      `/api/admin/bookings/${id}/status`,
      { method: "PATCH", body: JSON.stringify({ status: statusToApi(status) }) },
      token
    ).then(mapBooking),

  createAlert: (payload: { carId: string; email: string; targetPrice: number }, token?: string) =>
    request<ApiAlert>(
      "/api/alerts",
      { method: "POST", body: JSON.stringify(payload) },
      token
    ).then(mapAlert),

  myAlerts: (token: string) =>
    request<ApiAlert[]>("/api/alerts/me", {}, token).then((items) => items.map(mapAlert)),

  adminAlerts: (token: string) =>
    request<ApiAlert[]>("/api/admin/alerts", {}, token).then((items) => items.map(mapAlert)),

  adminCars: (token: string) => request<Car[]>("/api/admin/cars", {}, token),

  createCar: (token: string, car: Car) =>
    request<Car>("/api/admin/cars", {
      method: "POST",
      body: JSON.stringify(car),
    }, token),

  updateCar: (token: string, car: Car) =>
    request<Car>(`/api/admin/cars/${car.id}`, {
      method: "PUT",
      body: JSON.stringify(car),
    }, token),

  deleteCar: (token: string, carId: string) =>
    request<void>(`/api/admin/cars/${carId}`, { method: "DELETE" }, token),
};

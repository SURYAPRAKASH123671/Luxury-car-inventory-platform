import { DemoUser, PriceAlert, TestDriveBooking } from "@/types";

export const storageKeys = {
  user: "cars15:user",
  session: "cars15:session",
  wishlist: "cars15:wishlist",
  compare: "cars15:compare",
  recent: "cars15:recent",
  bookings: "cars15:bookings",
  alerts: "cars15:alerts",
};

export const readJson = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const writeJson = <T,>(key: string, value: T) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const demoAdmin: DemoUser = {
  name: "Cars 15 Admin",
  email: "admin@cars15.local",
  phone: "+91 91503 57320",
  role: "ADMIN",
};

export const demoCustomer: DemoUser = {
  name: "Demo Buyer",
  email: "buyer@cars15.local",
  phone: "+91 90000 12345",
  role: "USER",
};

export const getBookings = () =>
  readJson<TestDriveBooking[]>(storageKeys.bookings, []);

export const saveBookings = (bookings: TestDriveBooking[]) =>
  writeJson(storageKeys.bookings, bookings);

export const getAlerts = () =>
  readJson<PriceAlert[]>(storageKeys.alerts, []);

export const saveAlerts = (alerts: PriceAlert[]) =>
  writeJson(storageKeys.alerts, alerts);

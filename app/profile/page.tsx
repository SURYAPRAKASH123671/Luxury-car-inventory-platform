"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Bell, CalendarCheck, Heart, LogOut, LucideIcon, UserRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { carsData } from "@/data/cars";
import { api } from "@/lib/api";
import {
  readJson,
  storageKeys,
  writeJson,
} from "@/lib/storage";
import { AuthSession, Car, DemoUser, PriceAlert, TestDriveBooking } from "@/types";

const formatPrice = (price: number) => {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
  return `₹${price.toLocaleString()}`;
};

export default function ProfilePage() {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [wishlistCars, setWishlistCars] = useState<Car[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [bookings, setBookings] = useState<TestDriveBooking[]>([]);
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [apiStatus, setApiStatus] = useState<"live" | "local">("local");

  useEffect(() => {
    const storedSession = readJson<AuthSession | null>(storageKeys.session, null);
    const storedUser = readJson<DemoUser | null>(storageKeys.user, null);
    setSession(storedSession);
    setUser(storedSession?.user || storedUser);
    setRecentIds(readJson<string[]>(storageKeys.recent, []));
    setBookings(readJson<TestDriveBooking[]>(storageKeys.bookings, []));
    setAlerts(readJson<PriceAlert[]>(storageKeys.alerts, []));
    setWishlistIds(readJson<string[]>(storageKeys.wishlist, []));

    if (!storedSession) return;

    Promise.all([
      api.me(storedSession.token),
      api.wishlist(storedSession.token),
      api.myBookings(storedSession.token),
      api.myAlerts(storedSession.token),
    ])
      .then(([freshUser, freshWishlist, freshBookings, freshAlerts]) => {
        const localBookings = readJson<TestDriveBooking[]>(storageKeys.bookings, []);
        const localAlerts = readJson<PriceAlert[]>(storageKeys.alerts, []);
        setUser(freshUser);
        setWishlistCars(freshWishlist);
        setWishlistIds(freshWishlist.map((car) => car.id));
        setBookings([...freshBookings, ...localBookings.filter((local) => !freshBookings.some((item) => item.id === local.id))]);
        setAlerts([...freshAlerts, ...localAlerts.filter((local) => !freshAlerts.some((item) => item.id === local.id))]);
        setApiStatus("live");
      })
      .catch(() => setApiStatus("local"));
  }, []);

  const wishlist = useMemo(
    () => wishlistCars.length > 0 ? wishlistCars : carsData.filter((car) => wishlistIds.includes(car.id)),
    [wishlistCars, wishlistIds]
  );
  const recent = useMemo(
    () => carsData.filter((car) => recentIds.includes(car.id)),
    [recentIds]
  );
  const stats: { label: string; value: string | number; icon: LucideIcon }[] = [
    { label: "Wishlist", value: wishlist.length, icon: Heart },
    { label: "Bookings", value: bookings.length, icon: CalendarCheck },
    { label: "Alerts", value: alerts.length, icon: Bell },
    { label: "Role", value: user?.role || "Guest", icon: UserRound },
  ];

  const logout = () => {
    localStorage.removeItem(storageKeys.user);
    localStorage.removeItem(storageKeys.session);
    setUser(null);
    setSession(null);
  };

  const clearWishlist = async () => {
    if (session) {
      await Promise.allSettled(wishlistIds.map((id) => api.removeWishlist(session.token, id)));
    }
    setWishlistIds([]);
    setWishlistCars([]);
    writeJson(storageKeys.wishlist, []);
  };

  return (
    <main className="min-h-screen pt-20">
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-luxury-metallic-red">
              Buyer Workspace
            </p>
            <h1 className="font-display text-4xl font-bold md:text-5xl">
              {user ? `Welcome, ${user.name}` : "Profile Dashboard"}
            </h1>
            <p className="mt-3 text-luxury-silver">
              Manage saved cars, bookings, recently viewed vehicles, and price alerts.
              <span className="ml-2 text-sm text-luxury-silver/80">
                {apiStatus === "live" ? "Spring Boot synced" : "Local demo mode"}
              </span>
            </p>
          </div>
          {user ? (
            <button
              onClick={logout}
              className="flex w-fit items-center gap-2 rounded-md border border-luxury-silver/20 px-4 py-2 text-luxury-silver hover:text-white"
            >
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="w-fit rounded-md bg-luxury-metallic-red px-5 py-3 font-semibold hover:bg-red-700"
            >
              Login Demo
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-lg border border-luxury-silver/10 bg-luxury-dark-gray p-5">
              <Icon className="mb-3 text-luxury-metallic-red" size={22} />
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm text-luxury-silver">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-luxury-silver/10 bg-luxury-dark-gray p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Saved Cars</h2>
              {wishlist.length > 0 && (
                <button onClick={clearWishlist} className="text-sm text-luxury-silver hover:text-white">
                  Clear
                </button>
              )}
            </div>
            {wishlist.length === 0 ? (
              <p className="text-luxury-silver">No saved cars yet. Use the heart icon in inventory.</p>
            ) : (
              <div className="space-y-3">
                {wishlist.map((car) => (
                  <Link
                    key={car.id}
                    href={`/cars/${car.id}`}
                    className="flex items-center justify-between rounded-md bg-luxury-black p-4 hover:ring-1 hover:ring-luxury-metallic-red"
                  >
                    <span>{car.brand} {car.model}</span>
                    <span className="text-luxury-metallic-red">{formatPrice(car.price)}</span>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-lg border border-luxury-silver/10 bg-luxury-dark-gray p-6">
            <h2 className="mb-4 text-2xl font-semibold">Booking Timeline</h2>
            {bookings.length === 0 ? (
              <p className="text-luxury-silver">No test drive bookings yet.</p>
            ) : (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div key={booking.id} className="rounded-md bg-luxury-black p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold">{booking.carName}</p>
                        <p className="text-sm text-luxury-silver">{booking.date} · {booking.phone}</p>
                      </div>
                      <span className="rounded-full bg-luxury-metallic-red/20 px-3 py-1 text-xs text-luxury-metallic-red">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-lg border border-luxury-silver/10 bg-luxury-dark-gray p-6">
            <h2 className="mb-4 text-2xl font-semibold">Recently Viewed</h2>
            {recent.length === 0 ? (
              <p className="text-luxury-silver">Open a car detail page to start your viewing history.</p>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {recent.map((car) => (
                  <Link key={car.id} href={`/cars/${car.id}`} className="rounded-md bg-luxury-black p-4 hover:ring-1 hover:ring-luxury-metallic-red">
                    <p className="font-semibold">{car.brand} {car.model}</p>
                    <p className="text-sm text-luxury-silver">{car.year} · {car.location}</p>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-lg border border-luxury-silver/10 bg-luxury-dark-gray p-6">
            <h2 className="mb-4 text-2xl font-semibold">Price Alerts</h2>
            {alerts.length === 0 ? (
              <p className="text-luxury-silver">Create an alert from any vehicle detail page.</p>
            ) : (
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="rounded-md bg-luxury-black p-4">
                    <p className="font-semibold">{alert.carName}</p>
                    <p className="text-sm text-luxury-silver">
                      Notify {alert.email} under {formatPrice(alert.targetPrice)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}

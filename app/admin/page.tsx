"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3, CalendarCheck, CarFront, Eye, LucideIcon, Pencil, Plus, Save, Trash2, Users } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { brands, carsData } from "@/data/cars";
import { api } from "@/lib/api";
import { getAlerts, getBookings, saveBookings } from "@/lib/storage";
import { readJson, storageKeys } from "@/lib/storage";
import { AnalyticsResponse, AuthSession, Car, PriceAlert, TestDriveBooking } from "@/types";

const formatPrice = (price: number) => {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
  return `₹${price.toLocaleString()}`;
};

const emptyCar: Car = {
  id: "",
  brand: "",
  model: "",
  variant: "",
  year: new Date().getFullYear(),
  mileage: 0,
  transmission: "Automatic",
  fuelType: "Petrol",
  bodyType: "Sedan",
  location: "Chennai",
  views: 0,
  bookings: 0,
  price: 0,
  image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&q=80",
  images: [],
  description: "Certified pre-owned luxury vehicle with verified documentation and finance support.",
  features: [],
  specifications: {
    engine: "",
    power: "",
    torque: "",
    seats: 5,
  },
};

export default function AdminDashboard() {
  const [cars, setCars] = useState<Car[]>(carsData);
  const [bookings, setBookings] = useState<TestDriveBooking[]>([]);
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [apiStatus, setApiStatus] = useState<"live" | "local">("local");
  const [carForm, setCarForm] = useState<Car>(emptyCar);
  const [featureText, setFeatureText] = useState("");
  const [editingCarId, setEditingCarId] = useState<string | null>(null);

  useEffect(() => {
    const storedSession = readJson<AuthSession | null>(storageKeys.session, null);
    setSession(storedSession);
    setBookings(getBookings());
    setAlerts(getAlerts());

    api.cars()
      .then((items) => setCars(items))
      .catch(() => setCars(carsData));

    api.analytics()
      .then((data) => {
        setAnalytics(data);
        setApiStatus("live");
      })
      .catch(() => setApiStatus("local"));

    if (storedSession?.user.role === "ADMIN") {
      Promise.all([
        api.adminBookings(storedSession.token),
        api.adminAlerts(storedSession.token),
        api.adminCars(storedSession.token),
      ])
        .then(([freshBookings, freshAlerts, freshCars]) => {
          setBookings(freshBookings);
          setAlerts(freshAlerts);
          setCars(freshCars);
          setApiStatus("live");
        })
        .catch(() => setApiStatus("local"));
    }
  }, []);

  const totalViews = analytics?.totalViews ?? cars.reduce((total, car) => total + car.views, 0);
  const baselineBookings = cars.reduce((total, car) => total + car.bookings, 0);
  const totalBookings = analytics?.totalBookings ?? baselineBookings + bookings.length;
  const avgPrice = cars.reduce((total, car) => total + car.price, 0) / cars.length;
  const mostViewed = [...cars].sort((a, b) => b.views - a.views).slice(0, 3);
  const brandStats = brands.map((brand) => ({
    brand,
    count: cars.filter((car) => car.brand === brand).length,
    bookings: cars
      .filter((car) => car.brand === brand)
      .reduce((total, car) => total + car.bookings, 0),
  }));
  const bookingQueue = useMemo(() => bookings.slice(0, 6), [bookings]);
  const inventoryPreview = useMemo(() => cars.slice(0, 6), [cars]);

  const editCar = (car: Car) => {
    setEditingCarId(car.id);
    setCarForm({
      ...car,
      images: car.images || [car.image],
      features: car.features || [],
      specifications: car.specifications || { seats: 5 },
    });
    setFeatureText((car.features || []).join(", "));
  };

  const resetCarForm = () => {
    setEditingCarId(null);
    setCarForm(emptyCar);
    setFeatureText("");
  };

  const saveCar = async () => {
    const payload: Car = {
      ...carForm,
      id: carForm.id.trim(),
      images: carForm.images?.length ? carForm.images : [carForm.image],
      features: featureText.split(",").map((item) => item.trim()).filter(Boolean),
    };

    if (!payload.id || !payload.brand || !payload.model || !payload.variant || !payload.price) {
      toast.error("Fill id, brand, model, variant, and price");
      return;
    }

    try {
      const saved = session?.user.role === "ADMIN"
        ? editingCarId
          ? await api.updateCar(session.token, payload)
          : await api.createCar(session.token, payload)
        : payload;
      setCars((current) => {
        const exists = current.some((car) => car.id === saved.id);
        return exists
          ? current.map((car) => car.id === saved.id ? saved : car)
          : [saved, ...current];
      });
      toast.success(editingCarId ? "Car updated" : "Car added");
      resetCarForm();
    } catch (error) {
      toast.error("Could not save car through API");
    }
  };

  const deleteCar = async (carId: string) => {
    try {
      if (session?.user.role === "ADMIN") {
        await api.deleteCar(session.token, carId);
      }
      setCars((current) => current.filter((car) => car.id !== carId));
      toast.success("Car removed");
    } catch {
      toast.error("Could not delete car. Existing bookings or alerts may reference it.");
    }
  };

  const updateBookingStatus = (
    bookingId: string,
    status: TestDriveBooking["status"]
  ) => {
    const applyLocal = (nextBooking?: TestDriveBooking) => {
      const next = bookings.map((booking) =>
        booking.id === bookingId ? nextBooking || { ...booking, status } : booking
      );
      setBookings(next);
      saveBookings(next);
    };

    if (session?.user.role === "ADMIN") {
      api.updateBookingStatus(session.token, bookingId, status)
        .then((updated) => applyLocal(updated))
        .catch(() => applyLocal());
      return;
    }

    const next = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status } : booking
    );
    setBookings(next);
    saveBookings(next);
  };
  const stats: { label: string; value: string | number; icon: LucideIcon }[] = [
    { label: "Total Cars", value: analytics?.totalCars ?? cars.length, icon: CarFront },
    { label: "Bookings", value: totalBookings, icon: CalendarCheck },
    { label: "Registered Users", value: analytics?.registeredUsers ?? 128, icon: Users },
    { label: "Inventory Views", value: totalViews.toLocaleString(), icon: Eye },
  ];

  return (
    <main className="min-h-screen pt-20">
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-luxury-metallic-red">
            Admin Console
          </p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            Inventory Intelligence
          </h1>
          <p className="mt-3 max-w-2xl text-luxury-silver">
            Live operations dashboard for bookings, alerts, most-viewed cars,
            and brand demand.
            <span className="ml-2 text-sm text-luxury-silver/80">
              {apiStatus === "live" ? "Spring Boot API connected" : "Local demo mode"}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-lg border border-luxury-silver/10 bg-luxury-dark-gray p-5">
              <Icon className="mb-4 text-luxury-metallic-red" size={24} />
              <p className="text-3xl font-bold">{value}</p>
              <p className="text-sm text-luxury-silver">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-luxury-silver/10 bg-luxury-dark-gray p-6">
            <div className="mb-5 flex items-center gap-2">
              <BarChart3 className="text-luxury-metallic-red" />
              <h2 className="text-2xl font-semibold">Most Viewed Cars</h2>
            </div>
            <div className="space-y-4">
              {mostViewed.map((car) => (
                <div key={car.id} className="rounded-md border border-luxury-silver/10 bg-luxury-black p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">
                        {car.brand} {car.model} {car.variant}
                      </h3>
                      <p className="text-sm text-luxury-silver">
                        {car.location} · {car.year} · {formatPrice(car.price)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-luxury-metallic-red">{car.views}</p>
                      <p className="text-xs text-luxury-silver">views</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-luxury-dark-gray">
                    <div
                      className="h-full rounded-full bg-luxury-metallic-red"
                      style={{ width: `${Math.min(100, (car.views / mostViewed[0].views) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-luxury-silver/10 bg-luxury-dark-gray p-6">
            <h2 className="mb-5 text-2xl font-semibold">Brand Demand</h2>
            <div className="space-y-4">
              {brandStats.map((item) => (
                <div key={item.brand}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{item.brand}</span>
                    <span className="text-luxury-silver">{item.bookings} bookings</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-luxury-black">
                    <div
                      className="h-full rounded-full bg-luxury-metallic-red"
                      style={{ width: `${Math.max(12, item.bookings * 4)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-md border border-luxury-silver/10 bg-luxury-black p-4">
              <p className="text-sm text-luxury-silver">Average Listed Price</p>
              <p className="text-2xl font-bold text-luxury-metallic-red">
                {formatPrice(avgPrice)}
              </p>
            </div>
          </div>
        </div>

        <section className="mt-8 rounded-lg border border-luxury-silver/10 bg-luxury-dark-gray p-6">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Inventory Management</h2>
              <p className="text-sm text-luxury-silver">
                Create, update, and remove car listings through the admin API.
              </p>
            </div>
            <button
              onClick={resetCarForm}
              className="flex w-fit items-center gap-2 rounded-md border border-luxury-silver/20 px-4 py-2 text-sm text-luxury-silver hover:text-white"
            >
              <Plus size={16} /> New car
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-md bg-luxury-black p-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <input value={carForm.id} onChange={(e) => setCarForm({ ...carForm, id: e.target.value })} disabled={Boolean(editingCarId)} placeholder="ID" className="rounded-md border border-luxury-silver/20 bg-luxury-dark-gray px-3 py-2 text-white disabled:opacity-60" />
                <input value={carForm.brand} onChange={(e) => setCarForm({ ...carForm, brand: e.target.value })} placeholder="Brand" className="rounded-md border border-luxury-silver/20 bg-luxury-dark-gray px-3 py-2 text-white" />
                <input value={carForm.model} onChange={(e) => setCarForm({ ...carForm, model: e.target.value })} placeholder="Model" className="rounded-md border border-luxury-silver/20 bg-luxury-dark-gray px-3 py-2 text-white" />
                <input value={carForm.variant} onChange={(e) => setCarForm({ ...carForm, variant: e.target.value })} placeholder="Variant" className="rounded-md border border-luxury-silver/20 bg-luxury-dark-gray px-3 py-2 text-white" />
                <input type="number" value={carForm.year} onChange={(e) => setCarForm({ ...carForm, year: Number(e.target.value) })} placeholder="Year" className="rounded-md border border-luxury-silver/20 bg-luxury-dark-gray px-3 py-2 text-white" />
                <input type="number" value={carForm.price} onChange={(e) => setCarForm({ ...carForm, price: Number(e.target.value) })} placeholder="Price" className="rounded-md border border-luxury-silver/20 bg-luxury-dark-gray px-3 py-2 text-white" />
                <input type="number" value={carForm.mileage} onChange={(e) => setCarForm({ ...carForm, mileage: Number(e.target.value) })} placeholder="Mileage" className="rounded-md border border-luxury-silver/20 bg-luxury-dark-gray px-3 py-2 text-white" />
                <input value={carForm.location} onChange={(e) => setCarForm({ ...carForm, location: e.target.value })} placeholder="Location" className="rounded-md border border-luxury-silver/20 bg-luxury-dark-gray px-3 py-2 text-white" />
                <input value={carForm.fuelType} onChange={(e) => setCarForm({ ...carForm, fuelType: e.target.value })} placeholder="Fuel" className="rounded-md border border-luxury-silver/20 bg-luxury-dark-gray px-3 py-2 text-white" />
                <input value={carForm.transmission} onChange={(e) => setCarForm({ ...carForm, transmission: e.target.value })} placeholder="Transmission" className="rounded-md border border-luxury-silver/20 bg-luxury-dark-gray px-3 py-2 text-white" />
                <input value={carForm.bodyType} onChange={(e) => setCarForm({ ...carForm, bodyType: e.target.value })} placeholder="Body type" className="rounded-md border border-luxury-silver/20 bg-luxury-dark-gray px-3 py-2 text-white" />
                <input value={carForm.specifications?.engine || ""} onChange={(e) => setCarForm({ ...carForm, specifications: { ...carForm.specifications, engine: e.target.value } })} placeholder="Engine" className="rounded-md border border-luxury-silver/20 bg-luxury-dark-gray px-3 py-2 text-white" />
              </div>
              <input value={carForm.image} onChange={(e) => setCarForm({ ...carForm, image: e.target.value, images: [e.target.value] })} placeholder="Image URL" className="mt-3 w-full rounded-md border border-luxury-silver/20 bg-luxury-dark-gray px-3 py-2 text-white" />
              <input value={featureText} onChange={(e) => setFeatureText(e.target.value)} placeholder="Features, comma separated" className="mt-3 w-full rounded-md border border-luxury-silver/20 bg-luxury-dark-gray px-3 py-2 text-white" />
              <textarea value={carForm.description || ""} onChange={(e) => setCarForm({ ...carForm, description: e.target.value })} placeholder="Description" rows={3} className="mt-3 w-full rounded-md border border-luxury-silver/20 bg-luxury-dark-gray px-3 py-2 text-white" />
              <button onClick={saveCar} className="mt-4 flex items-center gap-2 rounded-md bg-luxury-metallic-red px-5 py-3 font-semibold hover:bg-red-700">
                <Save size={18} /> {editingCarId ? "Update Car" : "Add Car"}
              </button>
            </div>

            <div className="space-y-3">
              {inventoryPreview.map((car) => (
                <div key={car.id} className="flex flex-col gap-3 rounded-md bg-luxury-black p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">{car.brand} {car.model} {car.variant}</p>
                    <p className="text-sm text-luxury-silver">{car.year} · {car.location} · {formatPrice(car.price)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => editCar(car)} className="rounded-md border border-luxury-silver/20 p-2 text-luxury-silver hover:text-white" aria-label={`Edit ${car.brand} ${car.model}`}>
                      <Pencil size={17} />
                    </button>
                    <button onClick={() => deleteCar(car.id)} className="rounded-md border border-luxury-silver/20 p-2 text-luxury-silver hover:text-luxury-metallic-red" aria-label={`Delete ${car.brand} ${car.model}`}>
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-lg border border-luxury-silver/10 bg-luxury-dark-gray p-6">
            <h2 className="mb-5 text-2xl font-semibold">Booking Operations</h2>
            {bookingQueue.length === 0 ? (
              <p className="text-luxury-silver">
                No live demo bookings yet. Book a test drive from a car detail page.
              </p>
            ) : (
              <div className="space-y-3">
                {bookingQueue.map((booking) => (
                  <div key={booking.id} className="rounded-md bg-luxury-black p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-semibold">{booking.carName}</p>
                        <p className="text-sm text-luxury-silver">
                          {booking.name} · {booking.phone} · {booking.date}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(["Requested", "Confirmed", "Completed"] as const).map((status) => (
                          <button
                            key={status}
                            onClick={() => updateBookingStatus(booking.id, status)}
                            className={`rounded-full px-3 py-1 text-xs transition-colors ${
                              booking.status === status
                                ? "bg-luxury-metallic-red text-white"
                                : "bg-luxury-dark-gray text-luxury-silver hover:text-white"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-lg border border-luxury-silver/10 bg-luxury-dark-gray p-6">
            <h2 className="mb-5 text-2xl font-semibold">Price Alerts</h2>
            {alerts.length === 0 ? (
              <p className="text-luxury-silver">No price alerts yet.</p>
            ) : (
              <div className="space-y-3">
                {alerts.slice(0, 6).map((alert) => (
                  <div key={alert.id} className="rounded-md bg-luxury-black p-4">
                    <p className="font-semibold">{alert.carName}</p>
                    <p className="text-sm text-luxury-silver">
                      {alert.email} · target {formatPrice(alert.targetPrice)}
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

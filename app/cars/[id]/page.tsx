"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import EMICalculatorModal from "@/components/EMICalculatorModal";
import { carsData } from "@/data/cars";
import { Phone, ChevronLeft, ChevronRight, Calculator, CalendarCheck, Printer, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { getAlerts, getBookings, readJson, saveAlerts, saveBookings, storageKeys } from "@/lib/storage";
import { AuthSession, Car } from "@/types";

export default function CarDetailsPage() {
  const params = useParams();
  const carId = String(params.id);
  const fallbackCar = carsData.find((c) => c.id === carId);

  const [car, setCar] = useState<Car | undefined>(fallbackCar);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [apiStatus, setApiStatus] = useState<"live" | "local">("local");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showEMIModal, setShowEMIModal] = useState(false);
  const [recentCars, setRecentCars] = useState<string[]>([]);
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [alertEmail, setAlertEmail] = useState("");
  const [targetPrice, setTargetPrice] = useState(Math.round(fallbackCar?.price ? fallbackCar.price * 0.95 : 0));
  const currentCarId = car?.id;

  useEffect(() => {
    setSession(readJson<AuthSession | null>(storageKeys.session, null));
    api.car(carId)
      .then((item) => {
        setCar(item);
        setTargetPrice(Math.round(item.price * 0.95));
        setApiStatus("live");
      })
      .catch(() => setApiStatus("local"));
  }, [carId]);

  useEffect(() => {
    if (!currentCarId) return;
    const existing = readJson<string[]>(storageKeys.recent, []);
    const next = [currentCarId, ...existing.filter((id) => id !== currentCarId)].slice(0, 4);
    localStorage.setItem("cars15:recent", JSON.stringify(next));
    setRecentCars(next.filter((id) => id !== currentCarId));
  }, [currentCarId]);

  if (!car) {
    notFound();
  }

  const images = car.images || [car.image];

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: `${car.brand} ${car.model}`,
        text: `Check this ${car.brand} ${car.model} on Cars 15`,
        url,
      });
      return;
    }
    await navigator.clipboard.writeText(url);
    toast.success("Car link copied");
  };

  const handleBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!bookingDate) {
      toast.error("Choose a preferred test-drive date");
      return;
    }
    try {
      const booking = await api.createBooking(
        {
          carId: car.id,
          name: bookingName,
          phone: bookingPhone,
          preferredDate: bookingDate,
        },
        session?.token
      );
      saveBookings([booking, ...getBookings().filter((item) => item.id !== booking.id)]);
      toast.success(`Test drive request sent to API for ${bookingDate}`);
    } catch {
      const bookings = getBookings();
      saveBookings([
        {
          id: `BK-${Date.now()}`,
          carId: car.id,
          carName: `${car.brand} ${car.model}`,
          name: bookingName,
          phone: bookingPhone,
          date: bookingDate,
          status: "Requested",
          createdAt: new Date().toISOString(),
        },
        ...bookings,
      ]);
      toast.success(`Test drive request saved locally for ${bookingDate || "your preferred date"}`);
    }
    setBookingName("");
    setBookingPhone("");
    setBookingDate("");
  };

  const handlePriceAlert = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const alert = await api.createAlert(
        { carId: car.id, email: alertEmail, targetPrice },
        session?.token
      );
      saveAlerts([alert, ...getAlerts().filter((item) => item.id !== alert.id)]);
      toast.success("Price alert created in API");
    } catch {
      const alerts = getAlerts();
      saveAlerts([
        {
          id: `PA-${Date.now()}`,
          carId: car.id,
          carName: `${car.brand} ${car.model}`,
          email: alertEmail,
          targetPrice,
          createdAt: new Date().toISOString(),
        },
        ...alerts,
      ]);
      toast.success("Price alert saved locally");
    }
    setAlertEmail("");
    setTargetPrice(Math.round(car.price * 0.95));
  };

  const recentlyViewedCars = carsData.filter((item) => recentCars.includes(item.id));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Vehicle",
            name: `${car.brand} ${car.model} ${car.variant}`,
            description: car.description,
            brand: {
              "@type": "Brand",
              name: car.brand,
            },
            model: car.model,
            productionDate: car.year.toString(),
            mileageFromOdometer: {
              "@type": "QuantitativeValue",
              value: car.mileage,
              unitCode: "KMT",
            },
            fuelType: car.fuelType,
            transmission: car.transmission,
            offers: {
              "@type": "Offer",
              price: car.price,
              priceCurrency: "INR",
            },
          }),
        }}
      />
      <main className="min-h-screen pt-20">
        <Navbar />
        <WhatsAppButton />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/inventory"
              className="text-luxury-silver hover:text-white transition-colors"
            >
              ← Back to Inventory
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative h-[500px] rounded-lg overflow-hidden bg-luxury-dark-gray">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[selectedImageIndex]}
                      alt={`${car.brand} ${car.model} - Image ${selectedImageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative h-24 rounded overflow-hidden border-2 transition-all ${
                        idx === selectedImageIndex
                          ? "border-luxury-metallic-red"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 8rem"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
                {car.brand} {car.model}
              </h1>
              <p className="text-xl text-luxury-silver mb-6">{car.variant}</p>
              <p className="mb-4 text-sm text-luxury-silver/80">
                {apiStatus === "live" ? "Loaded from Spring Boot API" : "Using local demo data"}
              </p>

              <div className="bg-luxury-dark-gray rounded-lg p-6 mb-6">
                <p className="text-4xl font-bold text-luxury-metallic-red mb-2">
                  {formatPrice(car.price)}
                </p>
                <p className="text-sm text-luxury-silver">Starting Price</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-luxury-dark-gray rounded-lg p-4">
                  <p className="text-sm text-luxury-silver mb-1">Year</p>
                  <p className="text-lg font-semibold">{car.year}</p>
                </div>
                <div className="bg-luxury-dark-gray rounded-lg p-4">
                  <p className="text-sm text-luxury-silver mb-1">Mileage</p>
                  <p className="text-lg font-semibold">
                    {car.mileage.toLocaleString()} km
                  </p>
                </div>
                <div className="bg-luxury-dark-gray rounded-lg p-4">
                  <p className="text-sm text-luxury-silver mb-1">Transmission</p>
                  <p className="text-lg font-semibold">{car.transmission}</p>
                </div>
                <div className="bg-luxury-dark-gray rounded-lg p-4">
                  <p className="text-sm text-luxury-silver mb-1">Fuel Type</p>
                  <p className="text-lg font-semibold">{car.fuelType}</p>
                </div>
              </div>

              {car.description && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Description</h3>
                  <p className="text-luxury-silver leading-relaxed">
                    {car.description}
                  </p>
                </div>
              )}

              {car.features && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-luxury-silver/20 bg-luxury-dark-gray px-3 py-1 text-sm text-luxury-silver"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {car.specifications && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                  <div className="bg-luxury-dark-gray rounded-lg p-4">
                    <table className="w-full">
                      <tbody className="space-y-2">
                        {car.specifications.engine && (
                          <tr className="border-b border-luxury-silver/10">
                            <td className="py-2 text-luxury-silver">Engine</td>
                            <td className="py-2 font-semibold">
                              {car.specifications.engine}
                            </td>
                          </tr>
                        )}
                        {car.specifications.power && (
                          <tr className="border-b border-luxury-silver/10">
                            <td className="py-2 text-luxury-silver">Power</td>
                            <td className="py-2 font-semibold">
                              {car.specifications.power}
                            </td>
                          </tr>
                        )}
                        {car.specifications.torque && (
                          <tr className="border-b border-luxury-silver/10">
                            <td className="py-2 text-luxury-silver">Torque</td>
                            <td className="py-2 font-semibold">
                              {car.specifications.torque}
                            </td>
                          </tr>
                        )}
                        {car.specifications.seats && (
                          <tr className="border-b border-luxury-silver/10">
                            <td className="py-2 text-luxury-silver">Seats</td>
                            <td className="py-2 font-semibold">
                              {car.specifications.seats}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <button
                  onClick={() => setShowEMIModal(true)}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-luxury-metallic-red hover:bg-red-700 rounded-md font-semibold transition-colors"
                >
                  <Calculator size={20} />
                  EMI
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-luxury-dark-gray hover:bg-luxury-black border border-luxury-silver/20 rounded-md font-semibold transition-colors"
                >
                  <Share2 size={20} />
                  Share
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-luxury-dark-gray hover:bg-luxury-black border border-luxury-silver/20 rounded-md font-semibold transition-colors"
                >
                  <Printer size={20} />
                  Spec Sheet
                </button>
                <a
                  href="tel:+919150357320"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-luxury-dark-gray hover:bg-luxury-black border border-luxury-silver/20 rounded-md font-semibold transition-colors"
                >
                  <Phone size={20} />
                  Call
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <form
              onSubmit={handleBooking}
              className="rounded-lg border border-luxury-silver/10 bg-luxury-dark-gray p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <CalendarCheck className="text-luxury-metallic-red" />
                <div>
                  <h2 className="text-2xl font-semibold">Book a Test Drive</h2>
                  <p className="text-sm text-luxury-silver">
                    Sends to the Spring Boot booking API when available, with local fallback.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <input
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                  required
                  placeholder="Name"
                  className="rounded-md border border-luxury-silver/20 bg-luxury-black px-4 py-3 text-white focus:border-luxury-metallic-red focus:outline-none"
                />
                <input
                  value={bookingPhone}
                  onChange={(e) => setBookingPhone(e.target.value)}
                  required
                  placeholder="Phone"
                  className="rounded-md border border-luxury-silver/20 bg-luxury-black px-4 py-3 text-white focus:border-luxury-metallic-red focus:outline-none"
                />
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                  className="rounded-md border border-luxury-silver/20 bg-luxury-black px-4 py-3 text-white focus:border-luxury-metallic-red focus:outline-none"
                />
              </div>
              <button className="mt-4 rounded-md bg-luxury-metallic-red px-6 py-3 font-semibold transition-colors hover:bg-red-700">
                Confirm Test Drive
              </button>
            </form>

            <div className="space-y-8">
            <form
              onSubmit={handlePriceAlert}
              className="rounded-lg border border-luxury-silver/10 bg-luxury-dark-gray p-6"
            >
              <h2 className="mb-2 text-2xl font-semibold">Price Drop Alert</h2>
              <p className="mb-4 text-sm text-luxury-silver">
                Save a target price and simulate a manual notification workflow.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                  required
                  type="email"
                  placeholder="Email"
                  className="rounded-md border border-luxury-silver/20 bg-luxury-black px-4 py-3 text-white focus:border-luxury-metallic-red focus:outline-none"
                />
                <input
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  required
                  type="number"
                  placeholder="Target price"
                  className="rounded-md border border-luxury-silver/20 bg-luxury-black px-4 py-3 text-white focus:border-luxury-metallic-red focus:outline-none"
                />
              </div>
              <button className="mt-4 rounded-md border border-luxury-metallic-red px-5 py-3 font-semibold text-luxury-metallic-red transition-colors hover:bg-luxury-metallic-red hover:text-white">
                Create Alert
              </button>
            </form>

            <div className="rounded-lg border border-luxury-silver/10 bg-luxury-dark-gray p-6">
              <h2 className="mb-4 text-2xl font-semibold">Recently Viewed</h2>
              {recentlyViewedCars.length === 0 ? (
                <p className="text-luxury-silver">View more cars to build your shortlist.</p>
              ) : (
                <div className="space-y-3">
                  {recentlyViewedCars.map((item) => (
                    <Link
                      key={item.id}
                      href={`/cars/${item.id}`}
                      className="flex items-center justify-between rounded-md border border-luxury-silver/10 bg-luxury-black p-3 hover:border-luxury-metallic-red"
                    >
                      <span>
                        {item.brand} {item.model}
                      </span>
                      <span className="text-sm text-luxury-silver">{item.year}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            </div>
          </div>

          {/* Floating Enquiry Bar (Mobile) */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-luxury-dark-gray border-t border-luxury-silver/20 p-4 z-40">
            <div className="flex gap-2">
              <button
                onClick={() => setShowEMIModal(true)}
                className="flex-1 px-4 py-2 bg-luxury-metallic-red hover:bg-red-700 rounded-md font-semibold text-sm"
              >
                Calculate EMI
              </button>
              <a
                href="tel:+919150357320"
                className="flex-1 px-4 py-2 bg-luxury-black border border-luxury-silver/20 rounded-md font-semibold text-sm text-center"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>

        {showEMIModal && (
          <EMICalculatorModal
            car={car}
            isOpen={showEMIModal}
            onClose={() => setShowEMIModal(false)}
          />
        )}

        <Footer />
      </main>
    </>
  );
}


"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import EMICalculatorModal from "@/components/EMICalculatorModal";
import { carsData } from "@/data/cars";
import { Phone, Mail, ChevronLeft, ChevronRight, Calculator } from "lucide-react";

export default function CarDetailsPage() {
  const params = useParams();
  const car = carsData.find((c) => c.id === params.id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showEMIModal, setShowEMIModal] = useState(false);

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
                  >
                    <Image
                      src={images[selectedImageIndex]}
                      alt={`${car.brand} ${car.model} - Image ${selectedImageIndex + 1}`}
                      fill
                      className="object-cover"
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

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowEMIModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-luxury-metallic-red hover:bg-red-700 rounded-md font-semibold transition-colors"
                >
                  <Calculator size={20} />
                  Calculate EMI
                </button>
                <a
                  href="tel:+919150357320"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-luxury-dark-gray hover:bg-luxury-black border border-luxury-silver/20 rounded-md font-semibold transition-colors"
                >
                  <Phone size={20} />
                  Call Now
                </a>
                <a
                  href="mailto:suryakannan32123@gmail.com"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-luxury-dark-gray hover:bg-luxury-black border border-luxury-silver/20 rounded-md font-semibold transition-colors"
                >
                  <Mail size={20} />
                  Email Dealer
                </a>
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


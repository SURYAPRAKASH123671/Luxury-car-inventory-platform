"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { carsData } from "@/data/cars";
import { CheckCircle, Shield, DollarSign, Truck } from "lucide-react";

const heroImages = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/2021_Hyundai_Creta_SX%28O%29_CRDi_%28India%29_front_view.jpg/1200px-2021_Hyundai_Creta_SX%28O%29_CRDi_%28India%29_front_view.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Maruti_Suzuki_Ertiga%281%29.jpg/1200px-Maruti_Suzuki_Ertiga%281%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Toyota_Innova_Crysta_2.4_Z_side.jpg/1200px-Toyota_Innova_Crysta_2.4_Z_side.jpg",
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featuredCars = carsData.slice(0, 4);

  return (
    <main className="min-h-screen">
      <Navbar />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={img}
                alt="Indian used car"
                fill
                className="object-cover"
                sizes="100vw"
                priority={idx === 0}
              />
            </div>
          ))}
          {/* Dark gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/55 z-0"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto w-full"
          style={{ fontFamily: "'Playfair Display', 'Poppins', sans-serif" }}
        >
          <h1 
            className="text-3xl min-[375px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 text-white leading-tight sm:leading-normal px-2"
            style={{ 
              fontWeight: 800,
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 0, 0, 0.5)'
            }}
          >
            Experience Excellence with{" "}
            <span className="text-white block sm:inline">Surya Cars</span>
          </h1>
          <p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 px-2 sm:px-0"
            style={{ color: '#e5e5e5' }}
          >
            Verified Indian Used Cars Across Hatchback, Sedan, SUV, and MPV
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0">
            <Link
              href="/inventory"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-white rounded-md font-semibold text-base sm:text-lg text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] w-full sm:w-auto"
            >
              Explore Inventory
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-white rounded-md font-semibold text-base sm:text-lg text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] w-full sm:w-auto"
            >
              Contact Dealer
            </Link>
          </div>
        </motion.div>

        {/* Indicators */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all ${
                idx === currentImageIndex
                  ? "w-6 sm:w-8 bg-white"
                  : "w-1.5 sm:w-2 bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Models */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Featured Models
            </h2>
            <p className="text-luxury-silver text-lg">
              Discover our handpicked collection of Indian used cars
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/inventory"
              className="px-8 py-3 bg-luxury-metallic-red hover:bg-red-700 rounded-md font-semibold transition-colors inline-block"
            >
              View All Cars
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-luxury-dark-gray">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Why Choose Us
            </h2>
            <p className="text-luxury-silver text-lg">
              Your trusted partner for verified Indian used cars
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Certified Cars",
                description: "Every vehicle undergoes rigorous inspection and certification",
              },
              {
                icon: DollarSign,
                title: "Transparent Pricing",
                description: "No hidden charges, clear pricing for all vehicles",
              },
              {
                icon: Shield,
                title: "EMI Support",
                description: "Flexible financing options with competitive interest rates",
              },
              {
                icon: Truck,
                title: "Doorstep Delivery",
                description: "Convenient home delivery service available",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 bg-luxury-black rounded-lg border border-luxury-silver/10"
              >
                <feature.icon
                  size={48}
                  className="mx-auto mb-4 text-luxury-metallic-red"
                />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-luxury-silver">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


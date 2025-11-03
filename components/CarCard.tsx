"use client";

import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types";
import { motion } from "framer-motion";
import { Calculator, Eye } from "lucide-react";
import { useState } from "react";
import EMICalculatorModal from "./EMICalculatorModal";

interface CarCardProps {
  car: Car;
  onEMIClick?: (car: Car) => void;
}

export default function CarCard({ car, onEMIClick }: CarCardProps) {
  const [showEMIModal, setShowEMIModal] = useState(false);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-luxury-dark-gray rounded-lg overflow-hidden border border-luxury-silver/10 hover:border-luxury-metallic-red/50 transition-all duration-300 group"
      >
        <div className="relative h-64 overflow-hidden">
          <Image
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
          <div className="absolute top-4 right-4 bg-luxury-metallic-red/90 text-white px-3 py-1 rounded-full text-sm font-medium">
            {car.year}
          </div>
        </div>

        <div className="p-6">
          <div className="mb-2">
            <h3 className="text-xl font-semibold mb-1">
              {car.brand} {car.model}
            </h3>
            <p className="text-luxury-silver text-sm">{car.variant}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div>
              <span className="text-luxury-silver">Mileage:</span>
              <span className="ml-2">{car.mileage.toLocaleString()} km</span>
            </div>
            <div>
              <span className="text-luxury-silver">Fuel:</span>
              <span className="ml-2">{car.fuelType}</span>
            </div>
            <div>
              <span className="text-luxury-silver">Transmission:</span>
              <span className="ml-2">{car.transmission}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-luxury-metallic-red">
                {formatPrice(car.price)}
              </p>
              <p className="text-xs text-luxury-silver">Starting Price</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowEMIModal(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-luxury-metallic-red/20 hover:bg-luxury-metallic-red/30 text-luxury-metallic-red rounded-md transition-colors text-sm font-medium"
            >
              <Calculator size={16} />
              Calculate EMI
            </button>
            <Link
              href={`/cars/${car.id}`}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-luxury-metallic-red hover:bg-red-700 rounded-md transition-colors text-sm font-medium"
            >
              <Eye size={16} />
              View Details
            </Link>
          </div>
        </div>
      </motion.div>

      {showEMIModal && (
        <EMICalculatorModal
          car={car}
          isOpen={showEMIModal}
          onClose={() => setShowEMIModal(false)}
        />
      )}
    </>
  );
}


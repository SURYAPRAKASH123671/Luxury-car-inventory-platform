"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Shield, Award, Users, TrendingUp } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen pt-20">
      <Navbar />
      <WhatsAppButton />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            About Cars 15
          </h1>
          <p className="text-luxury-silver text-lg max-w-2xl mx-auto">
            Your trusted destination for verified Indian used cars across
            Hatchback, Sedan, SUV, and MPV categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-luxury-dark-gray rounded-lg p-8 border border-luxury-silver/10"
          >
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-luxury-silver leading-relaxed mb-4">
              Cars 15, powered by Surya Cars, was founded with a vision to make
              used-car buying clearer and more trustworthy for Indian customers.
              We focus on familiar India-market cars from brands like Maruti
              Suzuki, Hyundai, Tata, Honda, Renault, Kia, Toyota, and Mahindra.
            </p>
            <p className="text-luxury-silver leading-relaxed">
              Our commitment to excellence, transparency, and customer satisfaction
              has made us a trusted name in the used-car market. Every vehicle
              in our inventory undergoes rigorous inspection and certification to
              ensure the highest quality standards.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-luxury-dark-gray rounded-lg p-8 border border-luxury-silver/10"
          >
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-luxury-silver leading-relaxed mb-4">
              To provide customers with the finest selection of certified
              pre-owned Indian cars while maintaining the highest standards
              of quality, service, and transparency.
            </p>
            <p className="text-luxury-silver leading-relaxed">
              We help buyers compare practical body styles, understand ownership
              costs, and choose the right car with competitive pricing, flexible
              financing options, and helpful customer support.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Shield,
              number: "100%",
              label: "Certified Cars",
            },
            {
              icon: Award,
              number: "500+",
              label: "Happy Customers",
            },
            {
              icon: Users,
              number: "10+",
              label: "Years Experience",
            },
            {
              icon: TrendingUp,
              number: "50+",
              label: "Cars Sold",
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-luxury-dark-gray rounded-lg p-6 border border-luxury-silver/10 text-center"
            >
              <stat.icon
                size={40}
                className="mx-auto mb-4 text-luxury-metallic-red"
              />
              <p className="text-3xl font-bold mb-2">{stat.number}</p>
              <p className="text-luxury-silver">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-luxury-metallic-red/20 to-luxury-metallic-red/10 rounded-lg p-12 border border-luxury-metallic-red/30 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Car?</h2>
          <p className="text-luxury-silver mb-6 text-lg">
            Browse our inventory or contact us for personalized assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/inventory"
              className="px-8 py-3 bg-luxury-metallic-red hover:bg-red-700 rounded-md font-semibold transition-colors"
            >
              View Inventory
            </a>
            <a
              href="/contact"
              className="px-8 py-3 bg-transparent border-2 border-luxury-silver hover:border-white hover:text-white rounded-md font-semibold transition-colors"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}


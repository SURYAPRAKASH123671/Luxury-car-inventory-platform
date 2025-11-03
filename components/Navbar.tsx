"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-form");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-luxury-black/95 backdrop-blur-md border-b border-luxury-silver/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-display text-2xl font-bold gradient-text">
              Cars 15
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-luxury-silver hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/inventory"
              className="text-luxury-silver hover:text-white transition-colors"
            >
              Inventory
            </Link>
            <Link
              href="/emi-calculator"
              className="text-luxury-silver hover:text-white transition-colors"
            >
              EMI Calculator
            </Link>
            <Link
              href="/about"
              className="text-luxury-silver hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-luxury-silver hover:text-white transition-colors"
            >
              Contact
            </Link>
            <button
              onClick={scrollToContact}
              className="px-6 py-2 bg-luxury-metallic-red hover:bg-red-700 transition-colors rounded-md font-medium"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-luxury-dark-gray border-t border-luxury-silver/20"
          >
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-luxury-silver hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/inventory"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-luxury-silver hover:text-white transition-colors"
              >
                Inventory
              </Link>
              <Link
                href="/emi-calculator"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-luxury-silver hover:text-white transition-colors"
              >
                EMI Calculator
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-luxury-silver hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-luxury-silver hover:text-white transition-colors"
              >
                Contact
              </Link>
              <button
                onClick={scrollToContact}
                className="w-full px-6 py-2 bg-luxury-metallic-red hover:bg-red-700 transition-colors rounded-md font-medium"
              >
                Enquire Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}


"use client";

import Link from "next/link";
import { Instagram, Youtube, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-luxury-dark-gray border-t border-luxury-silver/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold gradient-text mb-4">
              Cars 15
            </h3>
            <p className="text-luxury-silver text-sm">
              Your trusted destination for verified Indian used cars.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-luxury-silver hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/inventory"
                  className="text-luxury-silver hover:text-white transition-colors"
                >
                  Cars
                </Link>
              </li>
              <li>
                <Link
                  href="/emi-calculator"
                  className="text-luxury-silver hover:text-white transition-colors"
                >
                  EMI Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-luxury-silver hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-luxury-silver hover:text-white transition-colors"
                >
                  Admin
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-luxury-silver hover:text-white transition-colors"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-luxury-silver hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-luxury-silver">
              <li>Phone: +91 9150357320</li>
              <li>
                Email:{" "}
                <a
                  href="mailto:suryakannan32123@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  suryakannan32123@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-luxury-silver hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-luxury-silver hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </a>
              <a
                href="https://wa.me/9150357320"
                target="_blank"
                rel="noopener noreferrer"
                className="text-luxury-silver hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-luxury-silver/20 mt-8 pt-8 text-center text-sm text-luxury-silver">
          <p>© 2025 Cars 15 | Powered by Surya Cars</p>
        </div>
      </div>
    </footer>
  );
}


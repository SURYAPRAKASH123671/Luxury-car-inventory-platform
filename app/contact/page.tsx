"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with email API (e.g., EmailJS, Resend, etc.)
    toast.success("Thank you! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <main className="min-h-screen pt-20">
      <Navbar />
      <WhatsAppButton />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-luxury-silver text-lg">
            Get in touch with Surya Cars for premium pre-owned luxury vehicles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Surya Cars</h2>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <Phone className="text-luxury-metallic-red mt-1" size={24} />
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <a
                    href="tel:+919150357320"
                    className="text-luxury-silver hover:text-white transition-colors"
                  >
                    +91 9150357320
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="text-luxury-metallic-red mt-1" size={24} />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a
                    href="mailto:suryakannan32123@gmail.com"
                    className="text-luxury-silver hover:text-white transition-colors"
                  >
                    suryakannan32123@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="text-luxury-metallic-red mt-1" size={24} />
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-luxury-silver">
                    Chennai / Veerabayangaram, India
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="h-64 rounded-lg overflow-hidden border border-luxury-silver/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62198.01893640896!2d80.189545790747!3d13.047487421731709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} id="contact-form" className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-luxury-dark-gray border border-luxury-silver/20 rounded-md text-white focus:outline-none focus:border-luxury-metallic-red"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-luxury-dark-gray border border-luxury-silver/20 rounded-md text-white focus:outline-none focus:border-luxury-metallic-red"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-luxury-dark-gray border border-luxury-silver/20 rounded-md text-white focus:outline-none focus:border-luxury-metallic-red"
                  placeholder="+91 1234567890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-3 bg-luxury-dark-gray border border-luxury-silver/20 rounded-md text-white focus:outline-none focus:border-luxury-metallic-red resize-none"
                  placeholder="Tell us about the car you're interested in..."
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-luxury-metallic-red hover:bg-red-700 rounded-md font-semibold transition-colors"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}


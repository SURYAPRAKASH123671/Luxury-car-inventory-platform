"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Calculator } from "lucide-react";

export default function EMICalculatorPage() {
  const [price, setPrice] = useState(5000000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenure, setTenure] = useState(5);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const principal = price - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;

    if (principal > 0 && monthlyRate > 0 && months > 0) {
      const emiValue =
        (principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

      const totalPay = emiValue * months;
      const totalInt = totalPay - principal;

      setEmi(emiValue);
      setTotalInterest(totalInt);
      setTotalPayment(totalPay);
    } else {
      setEmi(0);
      setTotalInterest(0);
      setTotalPayment(0);
    }
  }, [price, downPayment, interestRate, tenure]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <main className="min-h-screen pt-20">
      <Navbar />
      <WhatsAppButton />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator size={48} className="text-luxury-metallic-red" />
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              EMI Calculator
            </h1>
          </div>
          <p className="text-luxury-silver text-lg">
            Calculate your monthly EMI for luxury car financing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-luxury-dark-gray rounded-lg p-8 border border-luxury-silver/10"
          >
            <h2 className="text-2xl font-bold mb-6">Loan Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Vehicle Price (₹)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  min="0"
                  className="w-full px-4 py-3 bg-luxury-black border border-luxury-silver/20 rounded-md text-white focus:outline-none focus:border-luxury-metallic-red"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Down Payment (₹)
                </label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  min="0"
                  max={price}
                  className="w-full px-4 py-3 bg-luxury-black border border-luxury-silver/20 rounded-md text-white focus:outline-none focus:border-luxury-metallic-red"
                />
                <div className="mt-2 flex gap-2">
                  {[10, 20, 30, 40].map((percent) => (
                    <button
                      key={percent}
                      onClick={() => setDownPayment((price * percent) / 100)}
                      className="px-3 py-1 text-xs bg-luxury-black hover:bg-luxury-metallic-red/20 border border-luxury-silver/20 rounded transition-colors"
                    >
                      {percent}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Interest Rate (% p.a.)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  min="0"
                  max="30"
                  className="w-full px-4 py-3 bg-luxury-black border border-luxury-silver/20 rounded-md text-white focus:outline-none focus:border-luxury-metallic-red"
                />
                <div className="mt-2 flex gap-2">
                  {[8.5, 9.5, 10.5, 11.5].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setInterestRate(rate)}
                      className="px-3 py-1 text-xs bg-luxury-black hover:bg-luxury-metallic-red/20 border border-luxury-silver/20 rounded transition-colors"
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Loan Tenure (Years)
                </label>
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  min="1"
                  max="10"
                  className="w-full px-4 py-3 bg-luxury-black border border-luxury-silver/20 rounded-md text-white focus:outline-none focus:border-luxury-metallic-red"
                />
                <div className="mt-2 flex gap-2">
                  {[3, 5, 7, 10].map((years) => (
                    <button
                      key={years}
                      onClick={() => setTenure(years)}
                      className="px-3 py-1 text-xs bg-luxury-black hover:bg-luxury-metallic-red/20 border border-luxury-silver/20 rounded transition-colors"
                    >
                      {years}Y
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-luxury-metallic-red/20 to-luxury-metallic-red/10 rounded-lg p-8 border border-luxury-metallic-red/30">
              <div className="text-center mb-6">
                <p className="text-luxury-silver text-sm mb-2">Monthly EMI</p>
                <motion.p
                  key={emi}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl font-bold text-luxury-metallic-red"
                >
                  {formatCurrency(emi)}
                </motion.p>
              </div>

              <div className="space-y-4 mt-8">
                <div className="flex justify-between items-center py-3 border-b border-luxury-silver/10">
                  <span className="text-luxury-silver">Principal Amount</span>
                  <span className="font-semibold">
                    {formatCurrency(price - downPayment)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-luxury-silver/10">
                  <span className="text-luxury-silver">Total Interest</span>
                  <span className="font-semibold text-luxury-metallic-red">
                    {formatCurrency(totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-luxury-silver/10">
                  <span className="text-luxury-silver">Total Payment</span>
                  <span className="font-semibold">
                    {formatCurrency(totalPayment)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-luxury-silver">Loan Amount</span>
                  <span className="font-semibold">{formatCurrency(price)}</span>
                </div>
              </div>
            </div>

            <div className="bg-luxury-dark-gray rounded-lg p-6 border border-luxury-silver/10">
              <h3 className="font-semibold mb-4">Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-luxury-silver">Loan Tenure</span>
                  <span className="font-semibold">{tenure} years ({tenure * 12} months)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-silver">Down Payment</span>
                  <span className="font-semibold">{formatCurrency(downPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-silver">Interest Rate</span>
                  <span className="font-semibold">{interestRate}% p.a.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}


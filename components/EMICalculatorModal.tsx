"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Car } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface EMICalculatorModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
}

export default function EMICalculatorModal({
  car,
  isOpen,
  onClose,
}: EMICalculatorModalProps) {
  const [price, setPrice] = useState(car.price);
  const [downPayment, setDownPayment] = useState(price * 0.2);
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
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-luxury-dark-gray rounded-lg max-w-md w-full p-6 border border-luxury-silver/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">
                  EMI Calculator
                </h2>
                <button
                  onClick={onClose}
                  className="text-luxury-silver hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-luxury-silver mb-2">
                  {car.brand} {car.model} {car.variant}
                </p>
                <p className="text-2xl font-bold text-luxury-metallic-red">
                  {formatCurrency(price)}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Down Payment (₹)
                  </label>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-luxury-black border border-luxury-silver/20 rounded-md text-white focus:outline-none focus:border-luxury-metallic-red"
                  />
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
                    className="w-full px-4 py-2 bg-luxury-black border border-luxury-silver/20 rounded-md text-white focus:outline-none focus:border-luxury-metallic-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Loan Tenure (Years)
                  </label>
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-luxury-black border border-luxury-silver/20 rounded-md text-white focus:outline-none focus:border-luxury-metallic-red"
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-luxury-black rounded-lg border border-luxury-metallic-red/30"
              >
                <div className="text-center">
                  <p className="text-luxury-silver text-sm mb-1">
                    Monthly EMI
                  </p>
                  <p className="text-3xl font-bold text-luxury-metallic-red">
                    {formatCurrency(emi)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <p className="text-luxury-silver">Total Interest</p>
                    <p className="font-semibold">{formatCurrency(totalInterest)}</p>
                  </div>
                  <div>
                    <p className="text-luxury-silver">Total Payment</p>
                    <p className="font-semibold">{formatCurrency(totalPayment)}</p>
                  </div>
                </div>
              </motion.div>

              <button
                onClick={onClose}
                className="w-full mt-6 px-6 py-3 bg-luxury-metallic-red hover:bg-red-700 rounded-md font-medium transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


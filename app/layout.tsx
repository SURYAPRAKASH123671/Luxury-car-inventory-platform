import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Cars 15 | Verified Indian Used Cars | Hatchback, Sedan, SUV, MPV",
  description: "Browse verified Indian used cars including Alto K10, Swift, Dzire, Ertiga, Duster, Creta, Innova Crysta, Fortuner, and more across Hatchback, Sedan, SUV, and MPV categories.",
  keywords: "used cars India, Indian used cars, used hatchback, used sedan, used SUV, used MPV, Maruti Swift, Dzire, Ertiga, Duster, Innova Crysta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}


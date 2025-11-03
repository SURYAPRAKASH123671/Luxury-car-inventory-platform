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
  title: "Cars 15 | Used BMW, Jaguar, Rolls-Royce in India | Pre-Owned Luxury Cars Chennai",
  description: "Certified Pre-Owned Luxury Cars at Unbeatable Value. Explore BMW 3 Series, BMW 5 Series, Jaguar XF, Mini Cooper S, Rolls-Royce Ghost. Used BMW in India, Pre-Owned Luxury Cars Chennai.",
  keywords: "used BMW India, pre-owned luxury cars Chennai, BMW 3 Series, BMW 5 Series, Jaguar XF, Mini Cooper S, Rolls-Royce Ghost, used luxury cars, certified pre-owned cars",
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


import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen pt-20">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="font-display text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-luxury-silver mb-8 text-center">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-luxury-metallic-red hover:bg-red-700 rounded-md font-semibold transition-colors"
        >
          Go Back Home
        </Link>
      </div>
      <Footer />
    </main>
  );
}


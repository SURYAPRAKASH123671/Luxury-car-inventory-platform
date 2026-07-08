import { NextResponse } from "next/server";
import { brands, carsData } from "@/data/cars";

export function GET() {
  const totalViews = carsData.reduce((total, car) => total + car.views, 0);
  const totalBookings = carsData.reduce((total, car) => total + car.bookings, 0);
  const mostViewed = [...carsData]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3)
    .map((car) => ({
      id: car.id,
      name: `${car.brand} ${car.model}`,
      views: car.views,
      bookings: car.bookings,
    }));

  const brandDemand = brands.map((brand) => ({
    brand,
    cars: carsData.filter((car) => car.brand === brand).length,
    bookings: carsData
      .filter((car) => car.brand === brand)
      .reduce((total, car) => total + car.bookings, 0),
  }));

  return NextResponse.json({
    totalCars: carsData.length,
    totalViews,
    totalBookings,
    mostViewed,
    brandDemand,
  });
}

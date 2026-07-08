import { NextResponse } from "next/server";
import { carsData } from "@/data/cars";

export function GET() {
  return NextResponse.json({
    count: carsData.length,
    cars: carsData,
  });
}

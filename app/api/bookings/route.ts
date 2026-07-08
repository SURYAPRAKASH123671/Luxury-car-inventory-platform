import { NextRequest, NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    message:
      "Demo bookings are persisted in browser localStorage for the deployed static experience.",
    storageKey: "cars15:bookings",
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  return NextResponse.json(
    {
      id: `BK-${Date.now()}`,
      status: "Requested",
      ...body,
    },
    { status: 201 }
  );
}

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  return NextResponse.json("OK", body);
}

export async function GET() {
  const foodList = await fetch("foodList.json")
    .then((response) => response.json())
    .then((data) => data);

  return NextResponse.json(foodList);
}

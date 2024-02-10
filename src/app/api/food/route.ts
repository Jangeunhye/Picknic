import { NextResponse } from "next/server";

export async function GET() {
  const foodList = await fetch("foodList.json")
    .then((response) => response.json())
    .then((data) => data);

  return NextResponse.json(foodList);
}

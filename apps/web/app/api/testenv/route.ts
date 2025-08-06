import { NextResponse } from "next/server";

export async function GET() {
  console.log("ENV:", process.env.CURSEFORGE_API_KEY);
  return NextResponse.json({ key: process.env.CURSEFORGE_API_KEY });
}

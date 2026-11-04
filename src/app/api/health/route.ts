import { NextResponse } from "next/server";

export async function GET() {
  const startTime = process.uptime();

  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(startTime),
      environment: process.env.NODE_ENV || "development",
      version: process.env.npm_package_version || "0.1.0",
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}

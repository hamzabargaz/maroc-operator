import { NextResponse } from "next/server";
import { carriers, carrierPrefixes } from "./data/carriers"; // Update with your actual data file path

export async function POST(request: Request) {
  const res = await request.json();
  const { phoneNumber } = res;

  if (typeof phoneNumber !== "string") {
    return NextResponse.json(
      { message: "Invalid phone number" },
      { status: 400 }
    );
  }

  const matchingPrefix = carrierPrefixes.find((prefixData) =>
    phoneNumber.startsWith(prefixData.prefix)
  );

  if (!matchingPrefix) {
    return NextResponse.json({ message: "Carrier not found" }, { status: 400 });
  }

  const matchingCarrier = carriers.find(
    (carrier) => carrier.code === matchingPrefix.carrierCode
  );

  if (!matchingCarrier) {
    return NextResponse.json({ message: "Carrier not found" }, { status: 400 });
  }

  const response = {
    carrier: matchingCarrier.name,
    line_type: matchingPrefix.line_type,
    location: matchingPrefix.location,
  };

  const body = await response;

  return NextResponse.json({ body }, { status: 200 });
}

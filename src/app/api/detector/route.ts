import { NextResponse } from "next/server";
import { carriers, carrierPrefixes } from "./data/carriers"; // Update with your actual data file path

export async function POST(request: Request) {
  const res = await request.json();
  const { phoneNumber } = res;

  if (typeof phoneNumber !== "string") {
    return NextResponse.json(
      { message: "inValidPhoneNumber" },
      { status: 400 }
    );
  }

  const matchingPrefix = carrierPrefixes.find((prefixData) =>
    phoneNumber.startsWith(prefixData.prefix)
  );

  if (!matchingPrefix) {
    return NextResponse.json({ message: "carrierNotFound" }, { status: 400 });
  }

  const matchingCarrier = carriers.find(
    (carrier) => carrier.code === matchingPrefix.carrierCode
  );

  if (!matchingCarrier) {
    return NextResponse.json({ message: "carrierNotFound" }, { status: 400 });
  }

  const response = {
    phone: phoneNumber,
    code: matchingCarrier.code,
    carrier: matchingCarrier.name,
    line_type: matchingPrefix.line_type,
    location: matchingPrefix.location,
  };

  const body = await response;

  return NextResponse.json({ body }, { status: 200 });
}

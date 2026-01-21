import crypto from "crypto";

export async function generateVIN() {
  return "VIN-" + crypto.randomBytes(4).toString("hex").toUpperCase();
}

export async function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

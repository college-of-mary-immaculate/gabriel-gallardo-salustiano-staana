// backend/src/utils/hash.js
import crypto from "crypto";

export async function encrypt(value) {
  return crypto.createHmac("sha256", process.env.API_KEY).update(value).digest("hex");
}

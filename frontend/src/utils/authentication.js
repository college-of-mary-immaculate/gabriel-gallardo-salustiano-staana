import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token) {
  const decodedToken = jwtDecode(token);
  const expiration = decodedToken["exp"];
  const currentTime = Math.floor(Date.now() / 1000);
  return expiration < currentTime;
}

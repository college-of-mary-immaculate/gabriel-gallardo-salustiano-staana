// backend/src/middlewares/authentication.js
import jwt from "jsonwebtoken";

export default function authorization(request, response, next) {
  const token = request.headers.token;

  if (!token) {
    response.status(401).json({
      success: false,
      message: "Unauthenticated user",
    });
    return;
  }

  jwt.verify(token, process.env.API_KEY, (error, decoded) => {
    if (error) {
      response.status(401).json({
        success: false,
        message: "Invalid token",
      });
      return;
    }

    response.locals.email = decoded?.email;
    response.locals.vin = decoded?.vin;
    response.locals.authenticated = true;
    next();
  });
}

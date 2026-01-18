// backend/src/middlewares/authorization.js
export default function authorization(request, response, next) {
  const apikey = request.headers.apikey;

  if (!apikey || (apikey && apikey !== process.env.API_KEY)) {
    response.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  next();
}

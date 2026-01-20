// backend/index.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config.js";
import morgan from "morgan";

import v1 from "./src/routes/v1/index.js";

const app = express();
const port = process.env.API_PORT || 5000;

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1", cors(), v1);

app.listen(port, () => {
  console.log(`Api is running at port ${port}...`);
});

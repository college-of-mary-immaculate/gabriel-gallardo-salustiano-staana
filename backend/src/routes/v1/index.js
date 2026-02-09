// backend/src/routes/v1/index.js
import { Router } from "express";

import homeRouter from "./homeRouter.js";
import accountRouter from "./accountRouter.js";
import electionRouter from "./electionRouter.js";
import voteRouter from "./voteRouter.js";
import candidateRouter from "./candidateRouter.js";

const v1 = new Router();

v1.use("/", homeRouter);
v1.use("/account", accountRouter);
v1.use("/election", electionRouter);
v1.use("/vote", voteRouter);
v1.use("/candidate", candidateRouter);

export default v1;

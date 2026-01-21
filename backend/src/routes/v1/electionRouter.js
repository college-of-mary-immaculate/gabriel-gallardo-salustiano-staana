// backend/src/routes/v1/electionRouter.js
import { Router } from "express";
import ElectionController from "../../controllers/v1/electionController.js";
import authorization from "../../middlewares/authorization.js";

const electionRouter = new Router();
const election = new ElectionController();

electionRouter.use(authorization);

electionRouter.get("/", election.get.bind(election));
electionRouter.get("/history", election.getAll.bind(election));
electionRouter.get("/lastElection", election.getLastElection.bind(election));
electionRouter.get("/winners", election.getWinners.bind(election));
electionRouter.post("/", election.create.bind(election));
electionRouter.patch("/", election.end.bind(election));

export default electionRouter;

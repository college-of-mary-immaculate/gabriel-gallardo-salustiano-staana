// backend/src/routes/v1/electionRouter.js
import { Router } from "express";
import ElectionController from "../../controllers/v1/electionController.js";
import authorization from "../../middlewares/authorization.js";

const electionRouter = new Router();
const election = new ElectionController();

electionRouter.use(authorization);

electionRouter.get("/", election.getCurrent.bind(election));
electionRouter.get("/history", election.getHistory.bind(election));
electionRouter.get("/lastElection", election.getLastElection.bind(election));
electionRouter.post("/", election.create.bind(election));
electionRouter.patch("/", election.end.bind(election));

export default electionRouter;

// backend/src/routes/v1/voteRouter.js
import { Router } from "express";
import VoteController from "../../controllers/v1/voteController.js";
import authorization from "../../middlewares/authorization.js";

const voteRouter = new Router();
const vote = new VoteController();

voteRouter.use(authorization);

voteRouter.get("/", vote.getAll.bind(vote));
voteRouter.get("/candidate", vote.get.bind(vote));
voteRouter.get("/hasVoted", vote.hasVoted.bind(vote));
voteRouter.get("/hasVotedAll", vote.hasVotedAll.bind(vote));
// voteRouter.post("/", vote.create.bind(vote));
voteRouter.post("/", vote.createBatch.bind(vote));

export default voteRouter;

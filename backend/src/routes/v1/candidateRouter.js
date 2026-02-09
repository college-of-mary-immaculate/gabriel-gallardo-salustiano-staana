// backend/src/routes/v1/candidateRouter.js
import { Router } from "express";
import CandidateController from "../../controllers/v1/candidateController.js";
import authorization from "../../middlewares/authorization.js";

const candidateRouter = new Router();
const candidate = new CandidateController();

candidateRouter.use(authorization);

candidateRouter.get("/current", candidate.getCurrent.bind(candidate));
candidateRouter.get("/election/:electionId", candidate.getByElection.bind(candidate));
candidateRouter.get("/:candidateId", candidate.get.bind(candidate));
candidateRouter.post("/", candidate.create.bind(candidate));
candidateRouter.post("/bulk", candidate.createBulk.bind(candidate));
candidateRouter.patch("/", candidate.update.bind(candidate));
candidateRouter.patch("/election/:electionId/mark-not-current", candidate.markNotCurrent.bind(candidate));
candidateRouter.delete("/", candidate.delete.bind(candidate));

export default candidateRouter;

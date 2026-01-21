// backend/src/routes/v1/positionRouter.js
import { Router } from "express";
import PositionController from "../../controllers/v1/positionController.js";
import authorization from "../../middlewares/authorization.js";

const positionRouter = new Router();
const position = new PositionController();

positionRouter.use(authorization);

positionRouter.get("/", position.getAll.bind(position));
positionRouter.get("/:positionId", position.get.bind(position));
positionRouter.post("/", position.create.bind(position));
positionRouter.post("/bulk", position.createBulk.bind(position));
positionRouter.patch("/", position.update.bind(position));
positionRouter.delete("/", position.delete.bind(position));

export default positionRouter;

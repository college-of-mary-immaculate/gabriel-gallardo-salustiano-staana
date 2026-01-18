// backend/src/routes/v1/accountRouter.js
import { Router } from "express";
import AccountController from "../../controllers/v1/accountController.js";
import authorization from "../../middlewares/authorization.js";
import authentication from "../../middlewares/authentication.js";

const accountRouter = new Router();
const account = new AccountController();

// Post Methods
accountRouter.post("/", account.create.bind(account));
accountRouter.post("/login", account.login.bind(account));
accountRouter.post("/reset", account.reset.bind(account));

accountRouter.use(authorization);

// Get Methods
accountRouter.get("/", authentication, account.get.bind(account));

// Patch Methods
accountRouter.patch("/", authentication, account.update.bind(account));

export default accountRouter;

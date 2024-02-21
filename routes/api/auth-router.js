import express from "express";
import userAuthSchema from "../../schemas/auth-schema.js";
import { authenticate, isEmptyBody } from "../../middleware/index.js";
import { validateBody } from "../../decorators/index.js";
import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(userAuthSchema),
  authController.signUp
);

authRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(userAuthSchema),
  authController.signIn
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logOut);

export default authRouter;

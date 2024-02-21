import express from "express";
import userAuthSchema from "../../schemas/auth-schema.js";
import { authenticate, isEmptyBody } from "../../middleware/index.js";
import { validateBody } from "../../decorators/index.js";
import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     SignUp:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           description: User's email address.
 *         password:
 *           type: string
 *           description: User's password
 *       example:
 *         name: Alex Smagin
 *         email: alexsmagin@mail.com
 *         password: password12345
 */

authRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(userAuthSchema),
  authController.signUp
);

/**
 * @swagger
 * components:
 *   schemas:
 *     SignIn:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: User's email address.
 *         password:
 *           type: string
 *           description: User's password
 *       example:
 *         email: alexsmagin@mail.com
 *         password: password12345
 */

authRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(userAuthSchema),
  authController.signIn
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Logout:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Logout success message.
 *       example:
 *         message: Logout successful.
 */

authRouter.post("/logout", authenticate, authController.logOut);

// authRouter.get("/current", authenticate, authController.getCurrent);

export default authRouter;

import express from "express";
import { authenticate } from "../../middleware/index.js";
import userController from "../../controllers/user-controller.js";

const userRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CurrentUser:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: User's ID.
 *         name:
 *           type: string
 *           description: User's name.
 *         email:
 *           type: string
 *           description: User's email address.
 *       example:
 *         _id: 1234567890
 *         name: Alex Smagin
 *         email: alexsmagin@mail.com
 */

userRouter.get("/current", authenticate, userController.getCurrent);

export default userRouter;

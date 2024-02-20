import express from "express";

const authRouter = express.Router();

authRouter.post("/signup");

authRouter.post("/signin");

authRouter.get("/current");

authRouter.post("/logout");

export default authRouter;

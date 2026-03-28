import { Router } from "express";
import authRouter from "./authRouter.js";
import medicationRouter from "./medicationRouter.js";
import userRouter from "./userRouter.js";
import { AuthMiddle } from "../middlewares/authMiddleware.js";

const mainRouter = Router();

mainRouter.use('/auth', authRouter);

mainRouter.use(AuthMiddle.verifyToken);

mainRouter.use('/medication', medicationRouter);
mainRouter.use('/user', userRouter);

export default mainRouter;
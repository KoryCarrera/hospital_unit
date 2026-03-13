import { Router } from "express";
import authRouter from "./authRouter.js";
import medicationRouter from "./medicationRouter.js";

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/medication', medicationRouter);

export default mainRouter;
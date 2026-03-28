import { Router } from "express";
import { prisma } from "../config/prisma.js";
import { UserRepository } from "../repositories/userRepository.js";
import { UserService } from "../services/userService.js";
import { UserController } from "../controllers/userController.js";
import { AuthMiddle } from "@/middlewares/authMiddleware.js";

const userRouter = Router();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get('/analytics', AuthMiddle.userAuthorization('administrador'), userController.userAnalytics);

export default userRouter;
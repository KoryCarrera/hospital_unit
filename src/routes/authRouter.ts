import { Router } from "express";
import { prisma } from "@/config/prisma.js";
import { UserRepository } from "@/repositories/userRepository.js";
import { AuthService } from "@/services/authService.js";
import { AuthController } from "@/controllers/authController.js";

const authRouter = Router();
const userRepository = new UserRepository(prisma);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRouter.post('/login', authController.loginAuth);
authRouter.post('/register', authController.authRegisterUser);

export default authRouter;
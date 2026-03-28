import { Router } from "express";
import { prisma } from "../config/prisma.js";
import { MedicationRepository } from "../repositories/medicationRepository.js";
import { MedicationService } from "../services/medicationService.js";
import { MedicationController } from "../controllers/medicationController.js";
import { AuthMiddle } from "../middlewares/authMiddleware.js";

const medicationRouter = Router();
const medicationRepository = new MedicationRepository(prisma);
const medicationService = new MedicationService(medicationRepository);
const medicationController = new MedicationController(medicationService);

medicationRouter.post('/register', AuthMiddle.userAuthorization('administrador', 'operativo'), medicationController.regNewMedication);
medicationRouter.get('/analytics', AuthMiddle.userAuthorization('administrador', 'operativo'), medicationController.analyticsMedication);

export default medicationRouter;
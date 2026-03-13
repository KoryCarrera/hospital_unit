import { Router } from "express";
import { prisma } from "../config/prisma.js";
import { MedicationRepository } from "../repositories/medicationRepository.js";
import { MedicationService } from "../services/medicationService.js";
import { MedicationController } from "../controllers/medicationController.js";

const medicationRouter = Router();
const medicationRepository = new MedicationRepository(prisma);
const medicationService = new MedicationService(medicationRepository);
const medicationController = new MedicationController(medicationService);

medicationRouter.post('/register', medicationController.regNewMedication);

export default medicationRouter;
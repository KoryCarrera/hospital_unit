import { MedicationRepository } from "../repositories/medicationRepository.js";
import { RegisterMedicationInput } from "../schemas/medicationSchema.js";
import { medicamentos, Prisma } from "@prisma/client";

export class MedicationService {

    constructor(
        private medication: MedicationRepository
    ){}

    public async registerNewMedication(data: RegisterMedicationInput): Promise<medicamentos>{
        return await this.medication.createRow(data);
    };

    
}
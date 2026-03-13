import { MedicationRepository } from "../repositories/medicationRepository.js";
import { RegisterMedicationInput } from "../schemas/medicationSchema.js";
import { Prisma } from "@prisma/client";

export class MedicationService {

    constructor(
        private medication: MedicationRepository
    ){}

    public async registrarMedicamento(data: RegisterMedicationInput){
        const medicationCreated = await this.medication.createRow(data);
        
        const { id_med, ...medicationWithOutId } = medicationCreated

        return medicationWithOutId;
    };
}
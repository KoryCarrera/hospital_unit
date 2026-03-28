import { MedicationRepository } from "../repositories/medicationRepository.js";
import { RegisterMedicationInput } from "../schemas/medicationSchema.js";
import { medicamentos, Prisma } from "@prisma/client";

export class MedicationService {

    constructor(
        private medication: MedicationRepository
    ) { }

    public async registerNewMedication(data: RegisterMedicationInput): Promise<medicamentos> {
        return await this.medication.createRow(data);
    };

    public async medicationAnalysis(): Promise<object> {

        try {
            const data = this.medication.medicinesInfo();

            if (!data) {
                throw new Error('Ha ocurrido un error a la hora de traer los datos de los medicamentos');
            };

            const totalMedications = (data as any).length;

            return {
                total: totalMedications,
                data: data
            };
            
        } catch (err) {
            console.error(err);
            throw new Error(`${err}`);
        }
    }
}
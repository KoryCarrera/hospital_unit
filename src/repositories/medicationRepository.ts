import { PrismaClient, medicamentos } from "@prisma/client";
import { BaseRepository } from "./baseRepository.js";

export class MedicationRepository extends BaseRepository <medicamentos> {

    public constructor( prismaType: PrismaClient){
        super(prismaType, prismaType.medicamentos)
    };

    public async medicinesInfo(): Promise<medicamentos[]> {
        return await this.model.findMany({
            select: {
                nombre_med: true,
                stock_actual: true,
                stock_minimo: true,
                precio: true
            }
        })
    }
}
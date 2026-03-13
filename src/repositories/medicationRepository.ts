import { PrismaClient, medicamentos } from "@prisma/client";
import { BaseRepository } from "./baseRepository.js";

export class MedicationRepository extends BaseRepository <medicamentos> {

    public constructor( prismaType: PrismaClient){
        super(prismaType, prismaType.medicamentos)
    };
}
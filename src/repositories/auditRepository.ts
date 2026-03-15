import { PrismaClient, auditorias } from "@prisma/client";
import { BaseRepository } from "./baseRepository.js";
import { auditsData } from "../types/auditsType.js";

export class AuditRepository extends BaseRepository<auditorias>{

    public constructor(prismaType: PrismaClient) {
        super(prismaType, prismaType.auditorias)
    };

    public async saveNewLog(data: auditsData): Promise<void> {
        await this.model.create({
            tabla_afectada: data.affectedTable,
            tipo_accion: data.actionType,
            id_user: data.idUser,
            valor_anterior: data.previousValue,
            valor_actual: data.actuallyValue,
        })
    }
}
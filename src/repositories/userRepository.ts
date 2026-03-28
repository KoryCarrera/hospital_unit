import { PrismaClient, usuarios } from "@prisma/client";
import { BaseRepository } from "./baseRepository.js";
import { UserLogin } from "../types/userType.js";
import { userLoginArgs } from "../types/userType.js";

export class UserRepository extends BaseRepository <usuarios> {

    public constructor( prismaType: PrismaClient){
        super(prismaType, prismaType.usuarios)
    };

    public async getUserByUserName(userName: string): Promise<UserLogin | null>{
        return await this.model.findUnique({
            where: { username: userName },
            ...userLoginArgs
        })
    };
    
    public async saveUserToken(userName: string, token: string): Promise<usuarios>{
        return await this.model.update({
            where: { username: userName },
            data: { refresh_token : token }
        })
    };

    public async usersInfo(): Promise<usuarios[]>{
        return await this.model.findMany({
            select: {
                nombre_completo: true,
                username: true,
                fecha_registro: true,
                rol: {
                    select: {
                        nombre_rol: true
                    }
                },
                _count: {
                    select: {
                        auditorias: true
                    }
                }
            }
        });
    };
}
import { PrismaClient, usuarios } from "@prisma/client";
import { BaseRepository } from "./baseRepository.js";

export class UserRepository extends BaseRepository <usuarios> {

    public constructor( prismaType: PrismaClient){
        super(prismaType, prismaType.usuarios)
    };

    public async getUserByUserName(userName: string){
        return await this.model.findUnique({
            where: { username: userName },
            select: {
                id_user: true,
                username: true,
                password: true,
                fk_rol: true
            }
        })
    };
    
    public async saveUserToken(userName: string, token: string){
        return await this.model.update({
            where: { username: userName },
            data: { refreshToken: token }
        })
    }
}
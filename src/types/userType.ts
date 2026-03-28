import { Prisma } from "@prisma/client";

export type roles = 'administrador' | 'operativo';

export type LoginReturn = {
    user: {
        username: string,
        rol: string,
    },
    access_token: string,
    refresh_Token: string
};

export enum Rol {
    admin = 1,
    operativo = 2,
    pendiente = 3
}

export const userLoginArgs = Prisma.validator<Prisma.usuariosDefaultArgs>()({
    select: {
        id_user: true,
        username: true,
        password: true,
        rol: {
            select: {
                nombre_rol: true
            }
        }
    }
});

export type UserLogin = Prisma.usuariosGetPayload<typeof userLoginArgs>;
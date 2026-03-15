import { PrismaClient } from "@prisma/client";
import { AuditRepository } from "../repositories/auditRepository.js";
import { userStorage } from "../context/userContext.js";

export const prisma = new PrismaClient();

const auditRepo = new AuditRepository(prisma);

export const prismaExtends = prisma.$extends({
    query: {

        $allModels: {
            async create({ model, operation, args, query }) {
                const result = await query(args);

                const context = userStorage.getStore();
                const userId = context?.userId

                await auditRepo.saveNewLog({
                    affectedTable: model,
                    actionType: 'INSERT',
                    previousValue: null,
                    actuallyValue: result,
                    idUser: (userId as any)
                });
                
                return result
            },

            async update({ model, operation, args, query }) {

                const previousValue = await (prisma as any)[model].findUnique({
                    where: args.where
                });

                const result = await query(args);

                const context = userStorage.getStore();
                const userId = context?.userId

                await auditRepo.saveNewLog({
                    affectedTable: model,
                    actionType: 'UPDATE',
                    previousValue: previousValue,
                    actuallyValue: result,
                    idUser: (userId as any)
                });

                return result;
            },

            async delete({ model, operation, args, query }) {

                const previousValue = await (prisma as any)[model].findUnique({
                    where: args.where
                });

                const result = await query(args);

                const context = userStorage.getStore();
                const userId = context?.userId

                await auditRepo.saveNewLog({
                    affectedTable: model,
                    actionType: 'DELETE',
                    previousValue: previousValue,
                    actuallyValue: result,
                    idUser: (userId as any)
                });

                return result;

            }
        }
    }
})
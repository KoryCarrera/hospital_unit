import { PrismaClient } from "@prisma/client";

export class BaseRepository<T> {

    public constructor(
        protected connection: PrismaClient,
        protected model: any,
    ) {};

    public async createRow(data: Partial<T>): Promise<T>{
        return await this.model.create({ data });
    };

    public async getAll(): Promise<T> {
        return await this.model.findMany()
    };

    public async findRowById(id: number): Promise<T | null>{
        return await this.model.findUnique({
            where: { id }
        })
    };

    public async updateById(newData: Partial<T>, id: number): Promise<T> {
        return await this.model.update({
            where: { id },
            data: newData,
        });
    };

    public async deleteById(id: number): Promise<T>{
        return await this.model.delete({
            where: { id }
        });
    };
};
import { Prisma } from "@prisma/client";
import { z } from "zod";

export class MedicationValidation {

    private static medicationRegSchema = z.object({
        nombre_med: z.string().max(100, '¡Nombre de medicamento demasiado largo!').min(3, '¡Nombre demasiado corto!'),
        stock_actual: z.number().nonnegative('¡No se pueden ingresar valores negativos en stock!').optional(),
        stock_minimo: z.number().nonnegative('¡No se pueden ingresar valores negativos en stock!').optional(),
        precio: z.preprocess((val) => String(val), z.string())
            .refine((val) => !isNaN(Number(val)), '¡Debe ser un numero!')
            .transform((val) => new Prisma.Decimal(val))
            .refine((dec) => dec.gt(0), '¡El precio debe ser mayor a 0!')
            .refine((dec) => dec.decimalPlaces() <= 2, '¡Maximo 2 decimales!')
    });

    static validateRegMedication(data: unknown){
        return this.medicationRegSchema.safeParse(data);
    };
};

export type RegisterMedicationInput = z.infer<typeof MedicationValidation['medicationRegSchema']>;
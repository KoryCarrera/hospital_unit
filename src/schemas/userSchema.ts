import { z } from "zod";

export class UserValidation {

    private static userRegSchema = z.object({
        nombre_completo: z.string().min(6, '¡El nombre debe tener al menos 6 caracteres!'),
        username: z.string().min(5, '¡El nombre de usuario debe tener 6 o mas caracteres!'),
        password: z.string().min(5, '¡Contraseña demasiado insegura, debe contener al menos 5 caracteres!'),
        fk_rol: z.union([z.literal(1), z.literal(2)], {
            errorMap: () => ({ message: "¡El rol debe ser 1 (Administrador) o 2 (Operador)!"}) 
        }),
        fecha_registro: z.date()
    });

    private static loginUserSchema = z.object({
        username: z.string().min(5, '¡El nombre de usuario debe tener 6 o mas caracteres!'),
        password: z.string().min(5, '¡Contraseña demasiado insegura, debe contener al menos 5 caracteres!'),
        refresh_token: z.string()
    });

    static validateRegUser(data: unknown){
        return this.userRegSchema.safeParse(data);
    };

    static validateLoginUser(data: unknown){
        return this.loginUserSchema.safeParse(data)
    };
};

export type RegisterUserInput = z.infer<typeof UserValidation["userRegSchema"]>;
export type LoginUserInput = z.infer<typeof UserValidation["loginUserSchema"]>
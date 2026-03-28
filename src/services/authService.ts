import { UserRepository } from "../repositories/userRepository.js";
import bcrypt from "bcryptjs";
import  jwt from "jsonwebtoken";
import { RegisterUserInput, LoginUserInput } from "@/schemas/userSchema.js";

export class AuthService {

    constructor (
        private user: UserRepository
    ){}

    public async loginAuthUser(data: LoginUserInput): Promise<object>{

        const userFound = await this.user.getUserByUserName(data.username);

        if(!userFound){
            throw new Error('¡No se ha encontrado el usuario! ¡Prueba de nuevo!');
        };

        const passwordVerify = await bcrypt.compare(data.password, userFound.password);

        if(!passwordVerify){
            throw new Error('¡Contraseña invalida! trata de nuevo');
        }

        const payload = {
            id: userFound.id_user,
            rol: userFound.fk_rol,
        };

        const accessKey = process.env.JWT_ACCESS_SECRET!;
        const accessToken = jwt.sign(payload, accessKey, {
            expiresIn: "1h"
        });

        const refreshKey = process.env.JWT_REFRESH_SECRET!;
        const refreshToken = jwt.sign(payload, refreshKey, {
            expiresIn: "168h"
        });

        await this.user.saveUserToken(userFound.username, refreshToken)

        return {
            user: {
                username: userFound.username,
                rol: userFound.fk_rol,
            },
            access_token: accessToken,
            refresh_Token: refreshToken
        }
    };

    public async registerAuthUser(data: RegisterUserInput): Promise<object>{

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(data.password, salt);

        const newUser = {
            ...data,
            password: hashed,
            fk_rol: 2
        };

        const userCreated = await this.user.createRow(newUser);

        const { password, ...userWithoutPassword } = userCreated;

        return userWithoutPassword;
    };
}
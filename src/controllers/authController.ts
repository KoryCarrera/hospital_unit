import { AuthService } from "@/services/authService.js";
import { Request, Response } from "express";
import { UserValidation } from "@/schemas/userSchema.js";
import { error } from "console";

export class AuthController {
    
    constructor(private authService: AuthService){}

    public loginAuth = async (req: Request, res: Response) => {

        try {

            const cleanData = UserValidation.validateLoginUser(req.body);

            if(!cleanData.success){
                res.status(400).json({
                    success: false,
                    data: cleanData.error.errors
                })
                return;
            };

            const responseLogin = await this.authService.loginAuthUser(cleanData.data);

            if (!responseLogin) {
                res.status(401).json({
                    success: false,
                    data: "¡Credenciales invalidas!"
                });
                return
            };

            res.status(200).json({
                success: true,
                data: responseLogin
            });
        } catch (err: any) {

            res.status(401).json({
                success: false,
                data: err,
            })
        }
    }

    public authRegisterUser = async (req: Request, res: Response) => {

        try {

            const cleanData = UserValidation.validateRegUser(req.body);

            if(!cleanData.success){
                res.status(400).json({
                    success: false,
                    data: cleanData.error.errors
                });
                return;
            };
            
            const newUser = await this.authService.registerAuthUser(cleanData.data);

            res.status(201).json({
                success: true,
                data: newUser,
            });
        } catch (err) {

            res.status(500).json({
                success: false,
                data: err
            })
        }
    }
}
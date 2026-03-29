import { AuthService } from "../services/authService.js";
import { Request, Response } from "express";
import { UserValidation } from "../schemas/userSchema.js";
import type { AuthRequest } from "../interfaces/userInterface.js";

export class AuthController {

    constructor(private authService: AuthService) { }

    public loginAuth = async (req: Request, res: Response) => {

        try {

            const cleanData = UserValidation.validateLoginUser(req.body);

            if (!cleanData.success) {
                res.status(400).json({
                    success: false,
                    data: cleanData.error.errors
                })
                return;
            };

            const responseLogin = await this.authService.loginAuthUser(cleanData.data);

            const isProduction = process.env.NODE_ENV === 'production';

            res.cookie('access_token', responseLogin.access_token, {
                httpOnly: true,
                secure: isProduction,
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60
            });

            res.cookie('refresh_token', responseLogin.refresh_Token, {
                httpOnly: true,
                secure: isProduction,
                sameSite: 'strict',
                path: '/api/v1/auth/refresh',
                maxAge: 1000 * 60 * 60 * 24 * 7
            });

            res.status(200).json({
                success: true,
                data: { user: responseLogin.user }
            });
        } catch (err: any) {

            res.status(401).json({
                success: false,
                data: err.message,
            });

            console.error(err);
        }
    }

    public authRegisterUser = async (req: Request, res: Response) => {

        try {

            const cleanData = UserValidation.validateRegUser(req.body);

            if (!cleanData.success) {
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
                data: `Ha ocurrido un error ${err}`
            });

            console.error(err);
        }
    };

    public getMe = (req: AuthRequest, res: Response) => {
        res.json(req.user);
    }
}
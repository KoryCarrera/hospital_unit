import { UserService } from "../services/userService.js";
import { Request, Response } from "express";

export class UserController {

    constructor(
        private service: UserService
    ) { }

    public userAnalytics = async (_req: Request, res: Response) => {

        try {

            const response = this.service.userAnalytic();

            if (!response){
                res.status(444).json({
                    success: false,
                    data: 'No se han podido obtener datos'
                });
                return;
            };

            res.status(200).json({
                success: true,
                data: response
            });

        } catch (err: any) {

            console.error(err.mesagge);

            res.status(500).json({data: 'Ha ocurrido un error interno'});
        }
    }
}
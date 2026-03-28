import jwt from "jsonwebtoken";
import { userStorage } from "../context/userContext.js";
import type { roles } from "../types/userType.js";

export class AuthMiddle {

    static verifyToken(req: any, res: any, next: any) {
        if (!req.cookies.access_token) {
            return res.status(401).json({ message: "¡No autorizado!"})
        }

        const token = req.cookies.access_token;

        if (!token) {
            return res.status(401).json({ message: "¡No autorizado!"})
        }

        try {

            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET ?? "super_secret_and_long_key");

            if (!decoded) {
                return res.status(401).json({ message: "¡No autorizado!"})
            }

            req.user = decoded;

            const userId = req.user.id

            userStorage.run({ userId }, () => {
                next();
            })

        } catch (err) {
            console.error(err);
            return res.status(401).json({ message: "¡No autorizado!"})
        }
    }

    static userAuthorization(...allowRols: roles[]) {
        
        return (req: any, res: any, next: any) => {

            if (!req.user) {
               return res.status(401).json({ message: "¡No autorizado!"}) 
            };

            const userRol = req.user.rol;

            const hasPermission = allowRols.includes(userRol);

            if (!hasPermission) {
                return res.status(403).json({ message: "¡No autorizado!"});
            };

            next();
        };
    }
}
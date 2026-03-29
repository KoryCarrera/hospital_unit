import { Request } from "express";

export interface AuthRequest extends Request {
    user?: {
        rol: string
        username: string
    }
}
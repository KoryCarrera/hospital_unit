import { MedicationService } from "../services/medicationService.js";
import { Request, Response } from "express";
import { MedicationValidation } from "../schemas/medicationSchema.js";

export class MedicationController {

    constructor(private mediService: MedicationService) { };

    public regNewMedication = async (req: Request, res: Response) => {

        try {

            const cleanData = MedicationValidation.validateRegMedication(req.body);

            if (!cleanData.success){

                res.status(400).json({
                    success: false,
                    data: cleanData.error.errors
                });
                return;

            }

            const responseRegMedication = await this.mediService.registerNewMedication(cleanData.data);

            res.status(201).json({
                success: true,
                data: responseRegMedication,
            });

        } catch (err: any) {

            res.status(500).json({
                success: false,
                data: err.message
            });

            console.error(err);

        };
    };

    public analyticsMedication = async (_req: Request, res: Response) => {

        try {

            const responseService = this.mediService.medicationAnalysis();

            res.status(200).json({
                success: true,
                analytics: responseService
            })
        } catch (err: any) {
            console.error (err);

            res.status(500).json({
                success: false,
                mesagge: err.mesagge
            })
        }
    }
}
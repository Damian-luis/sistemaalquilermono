import { Request, Response } from "express";
import { HTTP_CODES, RESPONSE_MESSAGES } from "../constant/index";
import { addScooter, getScooterById, getScooters, updateScooter, deleteScooter } from "../services/scooterService";
import { IScooter } from "../interfaces";

async function addScooterC(req: Request, res: Response): Promise<void> {
  try {
    const scooterData: IScooter = req.body;
    const scooter = await addScooter(scooterData);
    res.status(HTTP_CODES.SUCCESS).json({ scooter });
  } catch (error: any) {
    console.error('Error adding scooter:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function getScooterByIdC(req: Request, res: Response): Promise<void> {
  const scooterId = req.params.scooterId;
  try {
    const scooter = await getScooterById(scooterId);
    if (scooter) {
      res.status(HTTP_CODES.SUCCESS).json({ scooter });
    } else {
      res.status(HTTP_CODES.NOT_FOUND).json({ error: RESPONSE_MESSAGES.SCOOTER_NOT_FOUND });
    }
  } catch (error: any) {
    console.error('Error getting scooter by id:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function getScootersC(req: Request, res: Response): Promise<void> {
  try {
    const scooters = await getScooters();
    res.status(HTTP_CODES.SUCCESS).json({ scooters });
  } catch (error: any) {
    console.error('Error getting scooters:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function updateScooterC(req: Request, res: Response): Promise<void> {
  const scooterId = req.params.scooterId;
  const updatedScooterData = req.body;
  try {
    await updateScooter(scooterId, updatedScooterData);
    res.status(HTTP_CODES.SUCCESS).json({ message: RESPONSE_MESSAGES.SCOOTER_UPDATED_SUCCESSFULLY });
  } catch (error: any) {
    console.error('Error updating scooter:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function deleteScooterC(req: Request, res: Response): Promise<void> {
  const scooterId = req.params.scooterId;
  try {
    const scooter = await getScooterById(scooterId);
    if (!scooter) {
      res.status(HTTP_CODES.NOT_FOUND).json({ error: RESPONSE_MESSAGES.SCOOTER_NOT_FOUND });
      return;
    }

    await deleteScooter(scooterId);
    res.status(HTTP_CODES.SUCCESS).json({ message: RESPONSE_MESSAGES.SCOOTER_DELETED_SUCCESSFULLY });
  } catch (error: any) {
    console.error('Error deleting scooter:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

export { addScooterC, getScooterByIdC, getScootersC, updateScooterC, deleteScooterC };

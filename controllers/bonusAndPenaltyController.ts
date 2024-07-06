import { Request, Response } from "express";
import { HTTP_CODES, RESPONSE_MESSAGES } from "../constant/index";
import { addBonusOrPenalty, getBonusOrPenaltyById, getBonusesAndPenalties, updateBonusOrPenalty, deleteBonusOrPenalty } from "../services/bonusAndPenaltyService";
import { IBonusAndPenalty } from "../interfaces";

async function addBonusOrPenaltyC(req: Request, res: Response): Promise<void> {
  try {
    const bpData: IBonusAndPenalty = req.body;
    const bp = await addBonusOrPenalty(bpData);
    res.status(HTTP_CODES.SUCCESS).json({ bp });
  } catch (error: any) {
    console.error('Error adding bonus or penalty:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function getBonusOrPenaltyByIdC(req: Request, res: Response): Promise<void> {
  const bpId = req.params.bpId;
  try {
    const bp = await getBonusOrPenaltyById(bpId);
    if (bp) {
      res.status(HTTP_CODES.SUCCESS).json({ bp });
    } else {
      res.status(HTTP_CODES.NOT_FOUND).json({ error: RESPONSE_MESSAGES.BONUS_OR_PENALTY_NOT_FOUND });
    }
  } catch (error: any) {
    console.error('Error getting bonus or penalty by id:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function getBonusesAndPenaltiesC(req: Request, res: Response): Promise<void> {
  try {
    const bonusesAndPenalties = await getBonusesAndPenalties();
    res.status(HTTP_CODES.SUCCESS).json({ bonusesAndPenalties });
  } catch (error: any) {
    console.error('Error getting bonuses and penalties:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function updateBonusOrPenaltyC(req: Request, res: Response): Promise<void> {
    const bpId = req.params.bpId;
    const updatedBPData = req.body;
    try {
      await updateBonusOrPenalty(bpId, updatedBPData);
      res.status(HTTP_CODES.SUCCESS).json({ message: RESPONSE_MESSAGES.BONUS_OR_PENALTY_UPDATED_SUCCESSFULLY });
    } catch (error: any) {
      console.error('Error updating bonus or penalty:', error);
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  }

async function deleteBonusOrPenaltyC(req: Request, res: Response): Promise<void> {
    const bpId = req.params.bpId;
    try {
      const bp = await getBonusOrPenaltyById(bpId);
      if (!bp) {
        res.status(HTTP_CODES.NOT_FOUND).json({ error: RESPONSE_MESSAGES.BONUS_OR_PENALTY_NOT_FOUND });
        return;
      }
  
      await deleteBonusOrPenalty(bpId);
      res.status(HTTP_CODES.SUCCESS).json({ message: RESPONSE_MESSAGES.BONUS_OR_PENALTY_DELETED_SUCCESSFULLY });
    } catch (error: any) {
      console.error('Error deleting bonus or penalty:', error);
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  }
  
  export { addBonusOrPenaltyC, getBonusOrPenaltyByIdC, getBonusesAndPenaltiesC, updateBonusOrPenaltyC, deleteBonusOrPenaltyC };

import { Request, Response } from "express";
import { HTTP_CODES, RESPONSE_MESSAGES } from "../constant/index";
import { addRental, getRentalById, getRentals, updateRental, deleteRental, getRentalsByUserDni } from "../services/rentalService";
import { IRental } from "../interfaces";

async function addRentalC(req: Request, res: Response): Promise<void> {
  try {
    const rentalData: IRental = req.body.rental;
    const rental = await addRental(rentalData);
    res.status(HTTP_CODES.SUCCESS).json({ rental });
  } catch (error: any) {
    console.error('Error adding rental:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function getRentalByIdC(req: Request, res: Response): Promise<void> {
  const userDni = req.params.userId
  try {
    const rental = await getRentalById(userDni);
    if (rental) {
      res.status(HTTP_CODES.SUCCESS).json({ rental });
    } else {
      res.status(HTTP_CODES.NOT_FOUND).json({ error: RESPONSE_MESSAGES.RENTAL_NOT_FOUND });
    }
  } catch (error: any) {
    console.error('Error getting rental by id:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function getRentalByDniC(req: Request, res: Response): Promise<void> {
  const userDni = req.params.userDni
  try {
    const rental = await getRentalsByUserDni(userDni);
    
    if (rental) {
      res.status(HTTP_CODES.SUCCESS).json({ rental });
    } else {
      res.status(HTTP_CODES.NOT_FOUND).json({ error: RESPONSE_MESSAGES.RENTAL_NOT_FOUND });
    }
  } catch (error: any) {
    console.error('Error getting rental by id:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function getRentalsC(req: Request, res: Response): Promise<void> {
  try {
    const rentals = await getRentals();
    res.status(HTTP_CODES.SUCCESS).json({ rentals });
  } catch (error: any) {
    console.error('Error getting rentals:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function updateRentalC(req: Request, res: Response): Promise<void> {
  const rentalId = req.params.rentalId;
  const updatedRentalData = req.body;
  try {
    await updateRental(rentalId, updatedRentalData);
    res.status(HTTP_CODES.SUCCESS).json({ message: RESPONSE_MESSAGES.RENTAL_UPDATED_SUCCESSFULLY });
  } catch (error: any) {
    console.error('Error updating rental:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function deleteRentalC(req: Request, res: Response): Promise<void> {
  const rentalId = req.params.rentalId;
  try {
    const rental = await getRentalById(rentalId);
    if (!rental) {
      res.status(HTTP_CODES.NOT_FOUND).json({ error: RESPONSE_MESSAGES.RENTAL_NOT_FOUND });
      return;
    }

    await deleteRental(rentalId);
    res.status(HTTP_CODES.SUCCESS).json({ message: RESPONSE_MESSAGES.RENTAL_DELETED_SUCCESSFULLY });
  } catch (error: any) {
    console.error('Error deleting rental:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

export { addRentalC, getRentalByIdC, getRentalsC, updateRentalC, deleteRentalC,getRentalByDniC };

import { Request, Response } from "express";
import { HTTP_CODES, RESPONSE_MESSAGES } from "../constant/index";
import { addStation, getStationById, getStations, updateStation, deleteStation } from "../services/stationService";
import { IStation } from "../interfaces";

async function addStationC(req: Request, res: Response): Promise<void> {
  try {
    const stationData: IStation = req.body.station;
    const station = await addStation(stationData);
    res.status(HTTP_CODES.SUCCESS).json({ station });
  } catch (error: any) {
    console.error('Error adding station:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function getStationByIdC(req: Request, res: Response): Promise<void> {
  const stationId = req.params.stationId;
  try {
    const station = await getStationById(stationId);
    if (station) {
      res.status(HTTP_CODES.SUCCESS).json({ station });
    } else {
      res.status(HTTP_CODES.NOT_FOUND).json({ error: RESPONSE_MESSAGES.STATION_NOT_FOUND });
    }
  } catch (error: any) {
    console.error('Error getting station by id:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function getStationsC(req: Request, res: Response): Promise<void> {
  try {
    const stations = await getStations();
    res.status(HTTP_CODES.SUCCESS).json({ stations });
  } catch (error: any) {
    console.error('Error getting stations:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function updateStationC(req: Request, res: Response): Promise<void> {
  const stationId = req.params.stationId;
  const updatedStationData = req.body;
  try {
    await updateStation(stationId, updatedStationData);
    res.status(HTTP_CODES.SUCCESS).json({ message: RESPONSE_MESSAGES.STATION_UPDATED_SUCCESSFULLY });
  } catch (error: any) {
    console.error('Error updating station:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function deleteStationC(req: Request, res: Response): Promise<void> {
  const stationId = req.params.stationId;
  try {
    const station = await getStationById(stationId);
    if (!station) {
      res.status(HTTP_CODES.NOT_FOUND).json({ error: RESPONSE_MESSAGES.STATION_NOT_FOUND });
      return;
    }

    await deleteStation(stationId);
    res.status(HTTP_CODES.SUCCESS).json({ message: RESPONSE_MESSAGES.STATION_DELETED_SUCCESSFULLY });
  } catch (error: any) {
    console.error('Error deleting station:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

export { addStationC, getStationByIdC, getStationsC, updateStationC, deleteStationC };

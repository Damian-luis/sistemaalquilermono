import { Request,Response } from "express"
import * as cache from 'memory-cache'
import pdfParse from 'pdf-parse'
import { HTTP_CODES, RESPONSE_MESSAGES } from '../constant/index';
import { addUser,getUserById,getUsers,updateUser,deleteUser } from "../services/userService";




async function addUserC(req: Request, res: Response): Promise<void> {
  try {
    console.log("intentara agregar")
    const user = await addUser(req.body)
    res.status(HTTP_CODES.SUCCESS).json({ user });
  } catch (error: any) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function getUserByIdC(req: Request, res: Response): Promise<void> {
  const userId = req.params.userId;
  try {
    const user = await getUserById(userId);
    if (user) {
      res.status(HTTP_CODES.SUCCESS).json({ user });
    } else {
      res.status(HTTP_CODES.NOT_FOUND).json({ error: RESPONSE_MESSAGES.USER_NOT_FOUND });
    }
  } catch (error: any) {
    console.error('Error getting user by id:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function getUsersC(req: Request, res: Response): Promise<void> {
  try {
    const users = await getUsers();
    res.status(HTTP_CODES.SUCCESS).json({ users });
  } catch (error: any) {
    console.error('Error getting users:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function updateUserC(req: Request, res: Response): Promise<void> {
  const userId = req.params.userId; 
  const updatedUserData = req.body;
  try {
    await updateUser(userId, updatedUserData);
    res.status(HTTP_CODES.SUCCESS).json({ message: RESPONSE_MESSAGES.USER_UPDATED_SUCCESSFULLY });
  } catch (error: any) {
    console.error('Error updating user:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

async function deleteUserC(req: Request, res: Response): Promise<void> {
  const userId = req.params.userId;
  try {
    const user = await getUserById(userId);
    if (!user) {
      res.status(HTTP_CODES.NOT_FOUND).json({ error: RESPONSE_MESSAGES.USER_NOT_FOUND });
      return;
    }
    
    await deleteUser(userId);
    res.status(HTTP_CODES.SUCCESS).json({ message: RESPONSE_MESSAGES.USER_DELETED_SUCCESSFULLY });
  } catch (error: any) {
    console.error('Error deleting user:', error);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

export {addUserC,getUserByIdC,getUsersC,updateUserC,deleteUserC}

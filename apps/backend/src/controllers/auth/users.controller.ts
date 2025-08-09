import {
  dbCreateUserService,
  dbDeleteUserByIdService,
  dbGetUserByIdService,
  dbUpdateUserByIdService,
} from "@/services/auth/user.service";
import { Request, Response } from "express";

export const createUserController = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;
  const user = await dbCreateUserService({ username, password, role });
  res.status(201).json({ status: "success", data: user });
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await dbGetUserByIdService(id);
  res.status(200).json({ status: "success", data: user });
};

export const updateUserByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;
    await dbUpdateUserByIdService(id, { username, password, role });
    res.status(200).json({ status: "success", message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to update user" });
  }
};

export const deleteUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await dbDeleteUserByIdService(id);
  res.status(200).json({ status: "success", message: "User deleted successfully" });
};

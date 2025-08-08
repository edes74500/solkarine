import {
  dbCreateUserService,
  dbDeleteUserByIdService,
  dbGetUserByIdService,
  dbUpdateUserByIdService,
} from "@/services/auth/user.service";
import { Request, Response } from "express";

export const createUserController = async (req: Request, res: Response) => {
  const { name, password, role } = req.body;
  const user = await dbCreateUserService({ name, password, role });
  res.status(201).json({ status: "success", data: user });
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await dbGetUserByIdService(id);
  res.status(200).json({ status: "success", data: user });
};

export const updateUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, role } = req.body;
  const user = await dbUpdateUserByIdService(id, { name, password, role });
  res.status(200).json({ status: "success", message: "User updated successfully" });
};

export const deleteUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await dbDeleteUserByIdService(id);
  res.status(200).json({ status: "success", message: "User deleted successfully" });
};

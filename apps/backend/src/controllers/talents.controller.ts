import {
  addTalentService,
  deleteTalentById,
  getAllTalentsWithPopulatedDungeonService,
  updateTalentService,
} from "@/services/talents.service";
import { createTalentSchema } from "@repo/types";
import { Request, Response } from "express";

export const getAllTalentsWithPopulatedDungeonController = async (req: Request, res: Response) => {
  console.log("getAllTalentsWithPopulatedDungeonController");
  const talents = await getAllTalentsWithPopulatedDungeonService();
  res.status(200).json({ status: "success", data: talents });
};

export const addTalentController = async (req: Request, res: Response) => {
  const parsedBody = createTalentSchema.parse(req.body);
  const talent = await addTalentService(parsedBody);
  res.status(200).json({ status: "success", data: talent });
};

export const deleteTalentController = async (req: Request, res: Response) => {
  const talent = await deleteTalentById(req.params.id);
  res.status(200).json({ status: "success", data: talent });
};

export const updateTalentController = async (req: Request, res: Response) => {
  const parsedBody = createTalentSchema.parse(req.body);
  const talent = await updateTalentService({
    id: req.params.id,
    talent: parsedBody,
    initialScreenshot: req.body.screenshot,
  });
  console.log("talent", talent);
  console.log("talent", talent);

  res.status(200).json({ status: "success", data: talent });
};

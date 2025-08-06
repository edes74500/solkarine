import {
  countCharactersController,
  createCharacterController,
  deleteCharacterController,
  editCharacterController,
  getCharacterController,
  getCharactersController,
} from "@/controllers/character.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/", getCharactersController);
router.post("/", createCharacterController);
router.get("/count", countCharactersController);
router.put("/:id", editCharacterController);
router.delete("/:id", deleteCharacterController);
router.get("/:id", getCharacterController);

export default router;

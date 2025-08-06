import { revalidateFetch } from "@/services/nextJsCache.service";
import {
  addWeakAura,
  deleteWeakAura,
  getAllWeakAura,
  getWeakAuraCount,
  updateWeakAura,
} from "@/services/weakaura.service";
import { scrapeOGTags } from "@/utils/ogBaliseScrapper";
import { createWeakAuraSchema, editWeakAuraSchema } from "@repo/types";
import { Request, Response } from "express";

export const getWeakAuraScrapperController = async (req: Request, res: Response) => {
  const { url, info } = req.body;
  console.log("url", url);
  if (!url) {
    res.json({ success: false, message: "No url provided" });
    return;
  }

  if (!url.includes("wago.io")) {
    res.json({ success: false, message: "Invalid url" });
    return;
  }

  const object = await scrapeOGTags(url);

  if (object.basic.title && object.basic.description && object.basic.ogImageUrl && object.basic.favicon) {
    console.log("scrapper success");
    res.json({ success: true, data: object });
    return;
  } else {
    console.log("scrapper failed");
    res.json({ success: false, message: "No title or description or image found" });
    return;
  }
};

export const createWeakAuraController = async (req: Request, res: Response) => {
  const data = createWeakAuraSchema.parse(req.body);
  const success = await addWeakAura(data);
  //* revalidate nextjs cache
  await revalidateFetch("weakaura-getAllWeakAura");
  res.json({ success: success });
};

// GET ALL WEAK AURAS
export const getAllWeakAuraController = async (req: Request, res: Response) => {
  const weakAura = await getAllWeakAura();
  res.json({ success: true, data: weakAura });
};

export const deleteWeakAuraController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const success = await deleteWeakAura(id);
  //* revalidate nextjs cache
  await revalidateFetch("weakaura-getAllWeakAura");
  res.json({ success: success });
};

export const updateWeakAuraController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = editWeakAuraSchema.parse(req.body);
  const success = await updateWeakAura(id, data);
  //* revalidate nextjs cache
  await revalidateFetch("weakaura-getAllWeakAura");
  res.json({ success: success });
};

export const getWeakAuraCountController = async (req: Request, res: Response) => {
  console.log("getWeakAuraCountController");
  const count = await getWeakAuraCount();
  console.log("count", count);
  res.json({ success: true, data: count });
};

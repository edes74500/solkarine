import { addWeakAura, getAllWeakAura } from "@/services/weakaura.service";
import { scrapeOGTags } from "@/utils/ogBaliseScrapper";
import { Request, Response } from "express";

export const createWeakAura = async (req: Request, res: Response) => {
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
    console.log("success");
    const success = await addWeakAura(object, info);
    res.json({ success: success });
    return;
  } else {
    console.log("failed");
    res.json({ success: false, message: "No title or description or image found" });
    return;
  }
};

export const getAllWeakAuraController = async (req: Request, res: Response) => {
  const weakAura = await getAllWeakAura();
  res.json(weakAura);
};

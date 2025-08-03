import { z } from "zod";

export const heartbeatSchema = z.object({
  userId: z.string(),
  lastSeen: z.date(),
});

export type HeartbeatSchema = z.infer<typeof heartbeatSchema>;

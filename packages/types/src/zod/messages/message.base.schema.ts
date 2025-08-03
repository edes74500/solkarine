import { mongoIdSchema } from "@repo/types";
import { z } from "zod";

const ATTACHMENT_TYPE_ENUM = z.enum(["image", "document", "other", "link"]);

export const attachmentSchema = z.object({
  type: ATTACHMENT_TYPE_ENUM,
  url: z.string().url("L'URL doit être valide"),
  name: z.string().optional(),
  sidePicture: z.string().optional(),
  sideBio: z.string().optional(),
  size: z.number().nonnegative().optional(),
  mimeType: z.string().optional(),
});

// Schéma pour la base de données
export const messageDbSchema = z.object({
  _id: mongoIdSchema,
  conversationId: z.string().min(1, "L'ID de la conversation est requis"),
  senderId: z.string().min(1, "L'ID de l'expéditeur est requis"),
  senderRole: z.enum(["creator", "interested"]),
  recipientId: z.string().min(1, "L'ID du destinataire est requis"),
  content: z.string().min(1, "Le contenu du message est requis"),
  attachments: z.array(attachmentSchema).optional(),
  timestamp: z.coerce.date().default(() => new Date()),
  isPersisted: z.boolean().default(false),
  isRead: z.boolean().default(false),
  isBlocked: z.boolean().optional(),
});

// Schéma pour l'API
export const messageApiSchema = messageDbSchema.extend({
  id: mongoIdSchema,
  _id: z.string(), // virtual field
});

// Schéma pour le client
export const messageClientSchema = messageApiSchema.extend({
  timestamp: z.string().datetime(),
});

// Type déduit du schéma
export type MessageDb = z.infer<typeof messageDbSchema>;
export type MessageApi = z.infer<typeof messageApiSchema>;
export type MessageClient = z.infer<typeof messageClientSchema>;
export type AttachmentMessage = z.infer<typeof attachmentSchema>;

const createMessageDTO = messageClientSchema.pick({
  conversationId: true,
  senderId: true,
  senderRole: true,
  recipientId: true,
  timestamp: true,
  content: true,
  isRead: true,
  isPersisted: true,
  isBlocked: true,
});

export const messageSchemaClientOptimistic = createMessageDTO.extend({
  temporaryId: z.string(),
  isOptimistic: z.boolean().default(true),
  timestamp: z.string().datetime(),
  attachments: z.array(attachmentSchema).optional(),
});

const createMessageSchema = createMessageDTO.extend({
  isRead: z.boolean().default(false),
  isPersisted: z.boolean().default(false),
});

export type MessageClientOptimistic = z.infer<typeof messageSchemaClientOptimistic>;
export type CreateMessageDTO = z.infer<typeof createMessageDTO>;
export type CreateMessageSchema = z.infer<typeof createMessageSchema>;

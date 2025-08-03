import { mongoIdSchema } from "@repo/types";
import { z } from "zod";

// Schéma pour les types de référence acceptés
const ReferenceTypeEnum = z.enum(["Annonces", "CandidateProfile"]);

export const lastMessageSchema = z.object({
  content: z.string(),
  senderId: z.string(),
  timestamp: z.coerce.date(),
});

export const conversationDbSchema = z.object({
  _id: mongoIdSchema,

  creatorId: z.string().min(1, "L'ID du créateur est requis"),
  interestedId: z.string().min(1, "L'ID de la personne intéressée est requis"),

  // Référence à l'annonce/profil
  referenceId: z.string().min(1, "L'ID de référence est requis"),
  referenceType: ReferenceTypeEnum,
  referenceTitle: z.string().min(1, "Le titre de référence est requis"),
  referenceImage: z.string().optional(),
  referenceIsDeleted: z.boolean().default(false).optional(),

  // Informations sur le créateur
  creatorFirstname: z.string().min(1, "Le prénom du créateur est requis"),
  creatorLastname: z.string().optional().nullable(),
  creatorAvatar: z.string(),

  // Informations sur la personne intéressée
  interestedFirstname: z.string().min(1, "Le prénom de l'intéressé est requis"),
  interestedLastname: z.string().optional().nullable(),
  interestedAvatar: z.string(),

  // Dernier message
  lastMessageForCreator: lastMessageSchema,
  lastMessageForInterested: lastMessageSchema,

  creatorUnread: z.number().int().nonnegative().default(0),
  interestedUnread: z.number().int().nonnegative().default(0),
  // Suppression
  creatorDeleted: z.boolean().default(false).optional(),
  interestedDeleted: z.boolean().default(false).optional(),

  //informations sur la derniere mise a jour des messages en db
  creatorDbMessagesUpdate: z.coerce.date().nullable(),
  interestedDbMessagesUpdate: z.coerce.date().nullable(),

  // Métriques et statut
  lastActivity: z.date(),
  isActive: z.boolean().default(true).optional(),
  messageCount: z.number().int().nonnegative().default(0),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

//* API
export const conversationApiSchema = conversationDbSchema.omit({}).extend({
  _id: z.string(), // virtual field
  id: z.string(), // virtual field
});

//* CLIENT
export const conversationClientSchema = conversationDbSchema
  .omit({
    _id: true,
    creatorDbMessagesUpdate: true,
    interestedDbMessagesUpdate: true,
  })
  .extend({
    id: z.string(), // virtual field
    lastMessageForCreator: lastMessageSchema.extend({
      timestamp: z.string().datetime(),
    }),
    lastMessageForInterested: lastMessageSchema.extend({
      timestamp: z.string().datetime(),
    }),
    lastActivity: z.string().datetime(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  });

// Type déduit du schéma
export type ConversationDb = z.infer<typeof conversationDbSchema>;
export type ConversationApi = z.infer<typeof conversationApiSchema>;
export type ConversationClient = z.infer<typeof conversationClientSchema>;

export type ConversationLastMessageSchema = z.infer<typeof lastMessageSchema>;

//* DTO
export const conversationCreateDTO = conversationApiSchema
  .pick({
    creatorId: true,
    creatorFirstname: true,
    creatorLastname: true,
    creatorAvatar: true,
    interestedId: true,
    interestedFirstname: true,
    interestedLastname: true,
    interestedAvatar: true,
    referenceId: true,
    referenceType: true,
    referenceTitle: true,
    referenceImage: true,
  })
  .extend({
    messageContent: z.string(),
  });

export const conversationCheckIfExistsDTO = conversationApiSchema.pick({
  referenceId: true,
  creatorId: true,
  referenceType: true,
});

const conversationCheckIfExistsProjection = conversationApiSchema
  .pick({
    interestedDeleted: true,
  })
  .extend({
    createdAt: z.string(),
    _id: z.string(),
    interestedDeleted: z.boolean(),
  });

export const conversationCheckIfExistsResponse = z.object({
  exists: z.boolean(),
  conversation: conversationCheckIfExistsProjection,
});

export const snapShotAnnonceSchema = z.object({
  title: z.string(),
  images: z.array(z.string()),
  active: z.boolean(),
  excerpt: z.string(),
  accueil: z.string(),
  from: z.string(),
  to: z.string(),
  poste: z.string(),
  id: z.string(),
  _id: z.string(),
});

export const conversationInListApiSchema = conversationApiSchema.pick({
  referenceId: true,
  id: true,
  referenceTitle: true,
  referenceType: true,
  referenceImage: true,
  creatorId: true,
  creatorFirstname: true,
  creatorAvatar: true,
  interestedId: true,
  referenceIsDeleted: true,
  interestedFirstname: true,
  lastMessageForCreator: true,
  lastMessageForInterested: true,
  interestedAvatar: true,
  lastActivity: true,
  creatorUnread: true,
  interestedUnread: true,
  createdAt: true,
});

export const conversationInListClientSchema = conversationInListApiSchema.extend({
  lastMessageForCreator: lastMessageSchema.extend({
    timestamp: z.string().datetime(),
  }),
  lastMessageForInterested: lastMessageSchema.extend({
    timestamp: z.string().datetime(),
  }),
  lastActivity: z.string().datetime(),
  createdAt: z.string().datetime(),
});

export const conversationUserSnapshotSchema = z.object({
  _id: z.string(),
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  avatar: z.string(),
  announceCount: z.number(),
  candidateProfileId: z.string().nullable(),
});

export type ConversationUserSnapshot = z.infer<typeof conversationUserSnapshotSchema>;

// Type déduit du schéma

export type ConversationCreateDTO = z.infer<typeof conversationCreateDTO>;
export type ConversationCheckIfExistsDTO = z.infer<typeof conversationCheckIfExistsDTO>;
export type SnapShotAnnonceSchema = z.infer<typeof snapShotAnnonceSchema>;
export type ConversationCheckIfExistsResponse = z.infer<typeof conversationCheckIfExistsResponse>;
export type ConversationInListApi = z.infer<typeof conversationInListApiSchema>;
export type ConversationInListClient = z.infer<typeof conversationInListClientSchema>;
// export type conversationUserSnapshotSchema = z.infer<typeof conversationUserSnapshotSchema>;

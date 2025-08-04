"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationResponseSchema = exports.mongoIdSchema = exports.dateSchema = exports.contactSchema = exports.locationSchema = void 0;
const zod_1 = require("zod");
exports.locationSchema = zod_1.z.object({
    type: zod_1.z.literal("Point"),
    coordinates: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number()]),
    country: zod_1.z.string(),
    country_id: zod_1.z.string(),
    region: zod_1.z.string().optional(),
    department: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    zipCode: zod_1.z.string().optional(),
    region_id: zod_1.z.string().optional(),
    department_id: zod_1.z.string().optional(),
});
exports.contactSchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    instagram: zod_1.z.string().optional(),
    twitter: zod_1.z.string().optional(),
    linkedin: zod_1.z.string().optional(),
    website: zod_1.z.string().optional(),
    phone: zod_1.z
        .string()
        .regex(/^\+?\d{10,14}$/, "Le numéro de téléphone n'est pas au bon format")
        .optional(),
    facebook: zod_1.z.string().optional(),
});
exports.dateSchema = zod_1.z.object({
    from: zod_1.z.date(),
    to: zod_1.z.date().nullable(),
});
exports.mongoIdSchema = zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/);
exports.paginationResponseSchema = zod_1.z.object({
    totalDocs: zod_1.z.number(),
    limit: zod_1.z.number(),
    totalPages: zod_1.z.number(),
    page: zod_1.z.number(),
    pagingCounter: zod_1.z.number(),
    hasPrevPage: zod_1.z.boolean(),
    hasNextPage: zod_1.z.boolean(),
    prevPage: zod_1.z.union([zod_1.z.number(), zod_1.z.null()]),
    nextPage: zod_1.z.union([zod_1.z.number(), zod_1.z.null()]),
});
//# sourceMappingURL=sharedSchema.js.map
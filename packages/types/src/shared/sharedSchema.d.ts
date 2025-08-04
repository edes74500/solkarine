import { z } from "zod";
export declare const locationSchema: z.ZodObject<{
    type: z.ZodLiteral<"Point">;
    coordinates: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
    country: z.ZodString;
    country_id: z.ZodString;
    region: z.ZodOptional<z.ZodString>;
    department: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    zipCode: z.ZodOptional<z.ZodString>;
    region_id: z.ZodOptional<z.ZodString>;
    department_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "Point";
    coordinates: [number, number];
    country: string;
    country_id: string;
    region?: string | undefined;
    department?: string | undefined;
    city?: string | undefined;
    zipCode?: string | undefined;
    region_id?: string | undefined;
    department_id?: string | undefined;
}, {
    type: "Point";
    coordinates: [number, number];
    country: string;
    country_id: string;
    region?: string | undefined;
    department?: string | undefined;
    city?: string | undefined;
    zipCode?: string | undefined;
    region_id?: string | undefined;
    department_id?: string | undefined;
}>;
export declare const contactSchema: z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    instagram: z.ZodOptional<z.ZodString>;
    twitter: z.ZodOptional<z.ZodString>;
    linkedin: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    facebook: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    instagram?: string | undefined;
    twitter?: string | undefined;
    linkedin?: string | undefined;
    website?: string | undefined;
    phone?: string | undefined;
    facebook?: string | undefined;
}, {
    email?: string | undefined;
    instagram?: string | undefined;
    twitter?: string | undefined;
    linkedin?: string | undefined;
    website?: string | undefined;
    phone?: string | undefined;
    facebook?: string | undefined;
}>;
export declare const dateSchema: z.ZodObject<{
    from: z.ZodDate;
    to: z.ZodNullable<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    from: Date;
    to: Date | null;
}, {
    from: Date;
    to: Date | null;
}>;
export declare const mongoIdSchema: z.ZodString;
export declare const paginationResponseSchema: z.ZodObject<{
    totalDocs: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
    page: z.ZodNumber;
    pagingCounter: z.ZodNumber;
    hasPrevPage: z.ZodBoolean;
    hasNextPage: z.ZodBoolean;
    prevPage: z.ZodUnion<[z.ZodNumber, z.ZodNull]>;
    nextPage: z.ZodUnion<[z.ZodNumber, z.ZodNull]>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    totalDocs: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}, {
    limit: number;
    totalDocs: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}>;
export type ContactSchema = z.infer<typeof contactSchema>;
export type LocationSchema = z.infer<typeof locationSchema>;
export type PaginateResult<T> = z.infer<typeof paginationResponseSchema> & {
    docs: T[];
};

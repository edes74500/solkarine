// src/paginate-model.d.ts

import { Document, Model, PaginateResult } from "mongoose";

export interface PaginateOptions {
  // Ajoutez ici vos options spécifiques si besoin
}

export interface PaginateModel<T extends Document> extends Model<T> {
  paginate(query?: any, options?: PaginateOptions): Promise<PaginateResult<T>>;
}

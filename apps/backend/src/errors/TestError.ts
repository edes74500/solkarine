import { AppError } from "./AppError";

export class TestError extends AppError {
  constructor(message: string = "Test error", statusCode: number = 500) {
    super(message, statusCode);
  }
}

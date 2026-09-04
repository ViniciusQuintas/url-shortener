export class AppError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
  ) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

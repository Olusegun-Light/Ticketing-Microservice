import { CustomError } from "../errors/custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Route note found");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not found" }];
  }
}

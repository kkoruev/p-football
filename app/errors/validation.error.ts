import {ErrorCode} from "~/errors/error.code";

export class ValidationError extends Error {
   errors: {};

   constructor(errors, message: string = 'Validation failed') {
      super(message);
      this.errors = errors;
   }
}
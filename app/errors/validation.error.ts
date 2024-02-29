
export class ValidationError extends Error {
   message: string;

   constructor(message: string = 'Validation failed') {
      super(message);
   }
}
import {User} from "~/data/user";
import {ErrorCodes} from "~/errors/error.codes";

export function validateEmail(email: string): boolean {
   if (email?.length === 0) {
      return true;
   }

   if (!email.includes('@')) {
      return false;
   }
   return true;
}

export function validateAge(age: number): boolean {
   return !(isNaN(age) || age <= 0);
}

export function validateUser(user: User) {
   const errors = {};
   if (!validateEmail(user.email)) {
      errors.email = ErrorCodes.InvalidEmail;
   }

   if (!validateAge(user.age)) {
      errors.age = ErrorCodes.AgeRequired;
   }

   return errors;
}
import {User} from "~/data/user";
import {ErrorCode} from "~/errors/error.code";

export function validateEmail(email: string): boolean {
   if (email == null) {
      return false;
   }

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
      errors.email = ErrorCode.InvalidEmail;
   }

   if (!validateAge(user.age)) {
      errors.age = ErrorCode.AgeRequired;
   }

   return errors;
}
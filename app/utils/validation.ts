import {User} from "~/data/user";

export function validateEmail(email: string): boolean {
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
   if (validateEmail(user.email)) {
      errors.email = 'Invalid email address';
   }

   if (validateAge(user.age)) {
      errors.age = 'Invalid age';
   }

   return errors;
}
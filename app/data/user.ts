
export interface User {
   name: string;
   email: string;
   sportType: 'Football';
   city: string;
   position: 'GK' | 'DEF' | 'MID' | 'FWD'
   age: number;
   skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
}

export const cities: string[] = ["Sofia", "Plovdiv", "Varna"];

export interface SessionUser {
   name: string;
   email: string;
   fbId: string;
}
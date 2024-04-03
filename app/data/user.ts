
export interface User {
   name: string;
   email: string;
   sportType: 'Football';
   city: City
   position: 'GK' | 'DEF' | 'MID' | 'FWD'
   age: number;
   skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
}

export const cities: string[] = ["Sofia", "Plovdiv", "Varna"];

export enum City {
   SOFIA = 'Sofia',
   PLOVDIV = 'Plovdiv',
   VARNA = 'Varna'
}

export interface SessionUser {
   name: string;
   email: string;
   fbId: string;
}

export interface FbProfile {
   fbId: string;
}
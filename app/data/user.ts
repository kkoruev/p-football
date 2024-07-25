
export interface User {
   name: string;
   email: string;
   sportType: 'Football';
   city: City
   position: 'GK' | 'DEF' | 'MID' | 'FWD'
   age: number;
   skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
}

export interface DbUser extends User {
   id: number
}

export const cities: string[] = ["Sofia", "Plovdiv", "Varna"];

export enum City {
   SOFIA = 'София',
   PLOVDIV = 'Пловдив',
   VARNA = 'Варна'
}

export interface SessionUser {
   name: string;
   email: string;
   fbId: string;
}

export interface FbProfile {
   fbId: string;
}
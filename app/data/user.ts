
export interface User {
   name: string;
   email: string;
   sportType: 'Football';
   position: 'GK' | 'DEF' | 'MID' | 'FWD'
   age: number;
   skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
}

export interface SessionUser {
   name: string;
   email: string;
   fbId: string;
}
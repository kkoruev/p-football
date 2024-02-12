import {Participant} from "~/data/participant";

export interface ExpandedInvitation {
   eventName: string;
   location: string;
   date: string; // ISO 8601 format recommended: YYYY-MM-DD
   time: string; // Time in 24-hour format: HH:MM
   hostName: string;
   currentNumberOfPlayers: number;
   maybePlayers: number;
   maximumNumberOfPlayers: number;
   description: string;
   eventStatus: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
   participants: Participant[];
   currentUserStatus: 'Accepted' | 'Rejected' | 'Maybe' | 'None';
}
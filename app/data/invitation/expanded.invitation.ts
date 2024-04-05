import {Participant} from "~/data/participant";
import {BaseInvitation} from "~/data/invitation/base.invitation";

export interface ExpandedInvitation extends BaseInvitation {
   id: number
   duration: number // duration in minutes
   date: string;
   time: string;
   hostName: string;
   currentNumberOfPlayers: number;
   maybePlayers: number;
   description: string;
   eventStatus: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
   participants: Participant[];
   currentUserStatus: 'Accepted' | 'Rejected' | 'Maybe' | 'None';
   backgroundImageUrl: string;
}
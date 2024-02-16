import {Participant} from "~/data/participant";
import {BaseInvitation} from "~/data/invitation/base.invitation";

export interface ExpandedInvitation extends BaseInvitation{
   duration: number // duration in minutes
   hostName: string;
   currentNumberOfPlayers: number;
   maybePlayers: number;
   description: string;
   eventStatus: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
   participants: Participant[];
   currentUserStatus: 'Accepted' | 'Rejected' | 'Maybe' | 'None';
}
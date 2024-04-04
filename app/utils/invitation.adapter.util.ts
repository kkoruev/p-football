import {EventInvitationDb} from "~/data/invitation/event.invitation.db";
import {ExpandedInvitation} from "~/data/invitation/expanded.invitation";

export function fromInvitationDbToExpandedInvitation(invitationDb: EventInvitationDb): ExpandedInvitation {
   const dateObj = new Date(invitationDb.dateTime);

   const datePart = dateObj.toISOString().split('T')[0];
   const timePart = dateObj.toTimeString().split(' ')[0].substring(0, 5);

   return {...invitationDb, date: datePart, time: timePart} as ExpandedInvitation;
}
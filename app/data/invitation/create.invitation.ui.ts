import {CreateInvitation} from "~/data/invitation/create.invitation";

export interface CreateInvitationUi extends CreateInvitation {
   date: string;
   time: string;
}
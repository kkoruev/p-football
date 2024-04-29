import {BaseInvitation} from "~/data/invitation/base.invitation";
import {CreateInvitation} from "~/data/invitation/create.invitation";

export interface CreateInvitationDb extends CreateInvitation {
   dateTime: Date;
   seriesId?: string;
}
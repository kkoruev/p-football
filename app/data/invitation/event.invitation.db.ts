import {BaseInvitation} from "~/data/invitation/base.invitation";

export interface EventInvitationDb extends BaseInvitation {
   id: number,
   dateTime: string,
   duration: number,
   description: string,
   backgroundImageUrl: string,
   private: boolean,
   userId: number,
   createdBy: {
      name: string
   }
}
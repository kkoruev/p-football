import {BaseInvitation} from "~/data/invitation/base.invitation";
import {RepetitionFrequency} from "~/data/invitation/create.invitation.db";


export interface CreateInvitation extends BaseInvitation {
   duration: number;
   description: string;
   backgroundImageUrl: string;
   private: boolean;
}
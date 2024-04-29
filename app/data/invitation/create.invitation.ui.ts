import {CreateInvitation} from "~/data/invitation/create.invitation";

export enum RepetitionFrequency {
   WEEKLY = 'Weekly',
   MONTHLY = 'Monthly',
   NONE = 'None'
}

export interface CreateInvitationUi extends CreateInvitation {
   date: string;
   time: string;
   repeatFrequency: RepetitionFrequency;
   repeatCount: number;
}

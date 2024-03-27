import {BaseInvitation} from "~/data/invitation/base.invitation";


export interface CreateInvitation extends BaseInvitation {
   duration: number;
   description: string;
   backgroundImage: string;
   private: boolean;
}
import {BaseInvitation} from "~/data/invitation/base.invitation";

export interface Invitation extends BaseInvitation {
   currentPlayers: number;
}
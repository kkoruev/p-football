import {BaseInvitation} from "~/data/invitation/base.invitation";

export interface ListInvitation extends BaseInvitation {
   currentPlayers: number;
}
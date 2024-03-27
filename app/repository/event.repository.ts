import {prisma} from "~/utils/utils";
import {CreateInvitationDb} from "~/data/invitation/create.invitation.db";


export default class EventRepository {

   static async createEvent(event: CreateInvitationDb) {
      return await prisma.event.create({...event});
   }
}
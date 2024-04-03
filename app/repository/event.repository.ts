import {prisma} from "~/utils/utils";
import {CreateInvitationDb} from "~/data/invitation/create.invitation.db";


export default class EventRepository {

   static async createEvent(event: CreateInvitationDb, userId: number) {
      return await prisma.event.create(
         {
            data: {
               ...event,
               createdBy: {
                  connect: {
                     id: userId
                  }
               }
            }
         }
      );
   }

   static async getEvents() {
      return await prisma.event.findMany({});
   }
}
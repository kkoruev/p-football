import {prisma} from "~/utils/utils";
import {CreateInvitationDb} from "~/data/invitation/create.invitation.db";
import {EventInvitationDb} from "~/data/invitation/event.invitation.db";


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

   static async getEvents(): Promise<EventInvitationDb[]> {
      return await prisma.event.findMany({
      });
   }
}
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

   static async getEvent(eventId: number) {
      return await prisma.event.findUnique({
         where: {
            id: eventId
         },
         include: {
            createdBy: true
         }
      });
   }

   static async getEvents(skip: number, take: number): Promise<EventInvitationDb[]> {
      return await prisma.event.findMany({
         skip,
         take
      });
   }

   static async countEvents() {
      return await prisma.event.count();
   }
}
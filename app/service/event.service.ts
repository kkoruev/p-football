import {delay, prisma} from "~/utils/utils";
import {RepetitionFrequency} from "~/data/invitation/create.invitation.ui";
import {CreateInvitationDb} from "~/data/invitation/create.invitation.db";
import { v4 as uuidv4 } from 'uuid';

export class EventService {

   public static async createRepetitiveEvents(event: CreateInvitationDb, repeatFrequency: RepetitionFrequency, repeatCount: number, userId: number) {
      try {
         console.log("Creation of repetitive events - START " + new Date());
         const events = EventService.createEventsWithCorrectDates(event, repeatFrequency, repeatCount, userId);
         await prisma.event.createMany({
            data: events
         });
         console.log("Creation of repetitive events - END " + new Date());
      } catch (error) {
         console.log(error);
      }
   }

   private static createEventsWithCorrectDates(event: CreateInvitationDb, repeatFrequency: RepetitionFrequency, repeatCount: number, userId: number): CreateInvitationDb[] {
      const eventData: CreateInvitationDb[] = [];
      const seriesId = uuidv4();
      for (let i = 0; i < repeatCount; i++) {
         const nextDate = new Date(event.dateTime);
         switch (repeatFrequency) {
            case RepetitionFrequency.WEEKLY:
               nextDate.setDate(nextDate.getDate() + i * 7)
               break;
            case RepetitionFrequency.MONTHLY:
               nextDate.setMonth(nextDate.getMonth() + i);
               break;
         }
         eventData.push({
            ...event,
            dateTime: nextDate,
            seriesId: seriesId,
            userId: userId
         })
      }
      return eventData;
   }
}
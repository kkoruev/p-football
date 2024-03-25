import {prisma} from "~/utils/utils";

export class FbProfileRepository {

   static async findFbProfile(fbId: string) {
      return await prisma.fbProfile.findUnique({
         where: {
            fbId: fbId
         },
         include: {
            user: true
         }
      });
   }
}
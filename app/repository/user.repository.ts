import {User} from "~/data/user";
import {prisma} from "~/utils/utils";

export class UserRepository {

   static async createUser(user: User) {
      try {
         return await prisma.user.create({data: {...user}})
      } catch (error) {
         if (error.constructor.name === 'PrismaClientKnownRequestError') {
            this.handlePrismaClientError(error);
            console.log("Start");
            console.log(error.code);
            console.log(error.meta);
            console.log(error.message);
            console.log("End");
         }
         throw error;
      }
   }

   private static handlePrismaClientError(error: Error): void {
      if (error.constructor.name !== 'PrismaClientKnownRequestError') {
         return;
      }
      
   }
}
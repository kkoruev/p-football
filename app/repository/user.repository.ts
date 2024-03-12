import {User} from "~/data/user";
import {prisma} from "~/utils/utils";
import {ValidationError} from "~/errors/validation.error";
import {ErrorCode} from "~/errors/error.code";

export class UserRepository {

   static async createUser(user: User) {
      try {
         return await prisma.user.create({data: {...user}})
      } catch (error) {
         this.handlePrismaClientError(error);
         throw error;
      }
   }

   static async findUniqueUser(id: number) {
      return await prisma.user.findUnique({
         where: {
            id: id
         }
      });
   }

   static async findUniqueFbUser(fbId: string): Promise<User> {
      return await prisma.user.findUnique({
         where: {
            fbId: fbId
         }
      });
   }

   private static handlePrismaClientError(error: Error): void {
      if (error.constructor.name !== 'PrismaClientKnownRequestError') {
         return;
      }
      if (error.meta.target.includes('email') && error.code === 'P2002') {
         throw new ValidationError({email: ErrorCode.UserEmailAlreadyExists});
      }
   }
}
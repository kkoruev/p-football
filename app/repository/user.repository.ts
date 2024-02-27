import {User} from "~/data/user";
import {prisma} from "~/utils/utils";

export class UserRepository {

   static async createUser(user: User) {
      return prisma.user.create({data: {...user}})
   }
}
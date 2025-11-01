import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { UserCreate } from "../models/UserCreate";


class UserRepository {

  user: Prisma.UserDelegate<DefaultArgs>;
  constructor(user: Prisma.UserDelegate<DefaultArgs>) {
    this.user = user;
  }

  async doesUserExist(email: string) {
    const user = await this.getUserByEmail(email)
    return Boolean(user);
  }

  getUserByEmail(email: string) {
    return this.user.findUnique({
      where: {
        email: email
      }
    })
  }

  getUserByID(id: number | string) {
    return this.user.findUnique({
      where: {
        id: Number(id)
      }
    })

  }

  async createUser(user: UserCreate) {
    const userExist = await this.doesUserExist(user.email);
    if (userExist) {
      return Promise.reject(new Error('User with this email already exists'));
    }
    else {
      const { uid, email, emailVerified, displayName, isAnonymous, photoURL, createdAt, lastLoginAt } = user
      return this.user.create({
        data: {
          uid,
          email,
          emailVerified,
          displayName,
          isAnonymous,
          photoURL,
          createdAt,
          lastLoginAt
        }
      })
    }

  }
}

export default UserRepository;

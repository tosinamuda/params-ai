import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { PromptCreate } from "../models/PromptCreate";

type Cursor = {
  id: number
}
class PromptRepository {
  prompt: Prisma.PromptDelegate<DefaultArgs>;
  constructor(prompt: Prisma.PromptDelegate<DefaultArgs>) {
    this.prompt = prompt;
  }


  getAll(limit: number = 10, cursor?: Cursor) {
    return this.prompt.findMany({
      take: limit,
      cursor,
      orderBy: {
        id: 'desc',
      },
      include:{
        category : true
      }
    })
  }
  /*
    async getFeatured() {
      const firstQueryResults = await prisma.prompts.findMany({
        take: 3,
        where: {
          title: {
            contains: 'Prisma'
          },
        },
        orderBy: {
          id: 'desc',
        },
      })
    }

    async makeFeatured(promptId: number) {

    } */

  getPromptById(id: string | number) {
    return this.prompt.findUnique({
      where: {
        id: Number(id)
      }
    })

  }

  getPromptBySlug(slug: string) {
    return this.prompt.findUnique({
      where: {
        slug: slug
      }
    })
  }

  getUserPrompts(userId: string | number, limit: number = 10, cursor?: Cursor) {
    return this.prompt.findMany({
      take: limit,
      where: {
        authorId: Number(userId)
      },
      cursor,
      orderBy: {
        id: 'desc',
      },
    })
  }

  createPrompt(prompt: PromptCreate) {
    return this.prompt.create({
      data: {
        ...prompt,
        updated_at: new Date()
      }
    })
  }
}


export default PromptRepository;

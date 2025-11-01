import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

type Cursor = {
  id: number
}
class PromptCategoryRepository {
  category: Prisma.PromptCategoryDelegate<DefaultArgs>
  constructor(category: Prisma.PromptCategoryDelegate<DefaultArgs>) {
    this.category = category;
  }


  list(limit: number = 10, cursor?: Cursor) {
    return this.category.findMany({
      take: limit,
      cursor,
    })
  }


  getByID(id: string | number) {
    return this.category.findUnique({
      where: {
        id: Number(id)
      }
    })

  }

  getByName(name: string) {
    return this.category.findUnique({
      where: {
        name
      }
    })

  }

  getCategoryAndPostByName(name: string) {
    return this.category.findUnique({
      where: {
        name
      },
      include: {
        prompts: {
          take: 10,
          select:{
            id: true,
            title: true,

          }
        }}
    })

  }

  async create(interfaceTypeName: string) {
    return this.category.create({
      data: {
        name: interfaceTypeName
      }
    })
  }
}

export default PromptCategoryRepository;

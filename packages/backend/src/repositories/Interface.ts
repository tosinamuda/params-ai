import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

type Cursor = {
  id: number
}
class InterfaceRepository {
  interfaceType: Prisma.InterfaceTypeDelegate<DefaultArgs>
  constructor(interfaceType: Prisma.InterfaceTypeDelegate<DefaultArgs>) {
    this.interfaceType = interfaceType;
  }


  list(limit: number = 10, cursor?: Cursor) {
    return this.interfaceType.findMany({
      take: limit,
      cursor,
    })
  }


  getByID(id: string | number) {
    return this.interfaceType.findUnique({
      where: {
        id: Number(id)
      }
    })

  }

  getByName(name: string) {
    return this.interfaceType.findUnique({
      where: {
        name
      }
    })

  }

  getByNames(names: string[]) {

    return this.interfaceType.findMany({
      where: { name: { in: names } }
    });

  }



  create(interfaceTypeName: string) {
    return this.interfaceType.create({
      data: {
        name: interfaceTypeName
      }
    })
  }
}

export default InterfaceRepository;

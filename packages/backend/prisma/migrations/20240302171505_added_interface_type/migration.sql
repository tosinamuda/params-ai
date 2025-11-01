-- CreateTable
CREATE TABLE "InterfaceType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "InterfaceType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterfaceType_name_key" ON "InterfaceType"("name");

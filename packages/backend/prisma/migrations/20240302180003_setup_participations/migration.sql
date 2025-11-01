/*
  Warnings:

  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_promptId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_taskGroupId_fkey";

-- DropForeignKey
ALTER TABLE "TaskGroup" DROP CONSTRAINT "TaskGroup_experimentId_fkey";

-- DropForeignKey
ALTER TABLE "TaskGroup" DROP CONSTRAINT "TaskGroup_userId_fkey";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "TaskGroup";

-- CreateTable
CREATE TABLE "Participation" (
    "id" SERIAL NOT NULL,
    "participantId" INTEGER NOT NULL,
    "experimentId" INTEGER NOT NULL,
    "interfaceTypeId" INTEGER NOT NULL,
    "promptId" INTEGER NOT NULL,
    "timeStarted" TIMESTAMP(3) NOT NULL,
    "timeEnded" TIMESTAMP(3),
    "status" "TaskStatus" NOT NULL DEFAULT 'IDLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Participation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CombinedIndex" ON "Participation"("participantId", "experimentId", "interfaceTypeId", "promptId");

-- CreateIndex
CREATE INDEX "ParticipantExperimentIndex" ON "Participation"("participantId", "experimentId");

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "Experiment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_interfaceTypeId_fkey" FOREIGN KEY ("interfaceTypeId") REFERENCES "InterfaceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

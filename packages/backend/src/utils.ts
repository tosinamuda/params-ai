import { ParticipationCreate } from "./models/ParticipationCreate";

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array]; // Create a copy of the original array

  // Fisher-Yates shuffle algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}


export function createUniqueSlug(title: string): string {
  // Clean the title (remove special characters and convert to lowercase)
  let cleanTitle = title.replace(/[^a-zA-Z\d\s-]/g, '').trim().toLowerCase();

  // Replace spaces with hyphens to combine words
  cleanTitle = cleanTitle.replace(/\s+/g, '-');

  const timestamp = String(Math.floor(Date.now() / 1000));
  return `${cleanTitle}-${timestamp}`;
}


type BulkParticipationCreateInput = {
  promptIds: number[],
  interfaceTypeIds: number[],
  participantId: number,
  experimentId: number
}

export function generateParticipationCreates({
  promptIds,
  interfaceTypeIds,
  participantId,
  experimentId }: BulkParticipationCreateInput
) {
  const participations: ParticipationCreate[] = [];

  for (const promptId of promptIds) {
    for (const interfaceTypeId of interfaceTypeIds) {
      participations.push({
        participantId,
        experimentId,
        interfaceTypeId,
        promptId,
        timeStarted: new Date(),
        updatedAt: new Date(),
      });
    }
  }
  return participations;
}

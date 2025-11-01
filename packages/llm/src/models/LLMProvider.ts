import { ReadableStream } from "node:stream/web";


export abstract class LLMProvider {
  abstract modelName: string;
  abstract defaultModelName: string;
  constructor() {
  }
  abstract generateText(prompt: string, modelName?: string): Promise<string>;

  abstract generateStream(prompt: string, modelName?: string): Promise<ReadableStream<any>>;
}

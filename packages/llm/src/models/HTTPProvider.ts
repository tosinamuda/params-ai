import { ReadableStream } from "node:stream/web";
import { LLMProvider } from "./LLMProvider";


export class HTTPProvider extends LLMProvider {
  modelName = "HTTP";
  defaultModelName = "";
  async generateText(prompt:string, modelName?: string) {
    return "Method not implemented.";
  }
  async generateStream(prompt:string, modelName?: string) {
    return new ReadableStream();
  }

}

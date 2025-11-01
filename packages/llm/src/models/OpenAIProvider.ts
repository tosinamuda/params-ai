import { ReadableStream } from "node:stream/web";
import { OpenAIApi } from 'openai';
import { env } from '../env';
import { LLMProvider } from "./LLMProvider";


export class OpenAIProvider extends LLMProvider {
  modelName = "OpenAI";

  defaultModelName = "gpt-3.5-turbo"

  model: OpenAIApi;

  constructor() {
    super();
    if (!env.OPENAI_API_KEY)
      throw new Error("OpenAI API Key is missing");
    this.model = new OpenAIApi();
  }
  async generateText(prompt: string, modelName?: string) {
    if(!modelName) modelName = this.defaultModelName;
    const completionRequest = { model: modelName, prompt: prompt };
    try {
      const completion = await this.model.createCompletion(completionRequest);
      const textOutput = completion?.data?.choices?.[0]?.text;
      if (textOutput) return textOutput;
      else throw new Error("Generation Failed");
    } catch (error) {
      throw error;
    }
  }
  async generateStream(prompt: string, modelName?: string) {
    if(!modelName) modelName = this.defaultModelName;
    const completionRequest = { model: modelName, prompt: prompt, stream: true };
    const stream = await this.model.createCompletion(completionRequest);

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          // @ts-ignore
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            controller.enqueue(content); // Enqueue each chunk's content into the readable stream
          }
          controller.close(); // Close the stream once the input stream is exhausted
        } catch (error) {
          controller.error(error); // Pass any error from the input stream to the readable stream
        }
      }
    });
    return readableStream;
  }


}

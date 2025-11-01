import { GoogleGenerativeAI } from "@google/generative-ai";
import { ReadableStream } from "node:stream/web";
import { env } from '../env';
import { LLMProvider } from "./LLMProvider";


export class GoogleProvider extends LLMProvider {
  modelName = "GoogleAI";

  defaultModelName = "gemini-pro"

  model: GoogleGenerativeAI;

  constructor() {
    super();
    if (!env.GOOGLE_API_KEY)
      throw new Error("Google API Key is missing");
    this.model = new GoogleGenerativeAI(env.GOOGLE_API_KEY);


  }
  async generateText(prompt: string, modelName?: string, ) {
    try {
      if(!modelName) modelName = this.defaultModelName;
      const result = await this.model.getGenerativeModel({ model: modelName }).generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw error;
    }
  }
  async generateStream(prompt: string, modelName?: string) {
    if(!modelName) modelName = this.defaultModelName;


    const result = await this.model.getGenerativeModel({ model: modelName }).generateContentStream(prompt);


    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            controller.enqueue(chunk.text()); // Enqueue each chunk from the async generator
          }
          controller.close(); // Close the stream once the generator is exhausted
        } catch (error) {
          controller.error(error); // Pass any error from the async generator to the stream
        }
      }
    });

    return stream;



    /*   for await (const chunk of stream ) {
        process.stdout.write(chunk.choices[0]?.delta?.content || '');
      } */
  }


}

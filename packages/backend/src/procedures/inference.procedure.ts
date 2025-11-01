import LLMKit from '../../../llm/src';
import { z } from "zod";
import { publicProcedure, router } from "../trpc";


export const inferenceRouter = router({
  completion: publicProcedure.input(z.object({prompt:z.string()})).mutation(async (opts) => {
    try {
      const {prompt} = opts.input;
      /* const prompt = await PromptService.getPromptBySlug(input);
      if(prompt.prompt?.content)
      {
        const llmKit = new LLMKit(prompt.prompt?.content, "Cloudflare")
        return llmKit.runInference()
      }
      else{
        throw new Error('Getting Prompt details failed')
      } */

      const llmKit = new LLMKit(prompt, "Cloudflare", "@cf/mistral/mistral-7b-instruct-v0.1")
      const result = await llmKit.runInference();

      return result

    }
    catch (error) {
      console.error("Running Inference Failed")
    }
  })
})

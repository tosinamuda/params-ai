import { ModelProviderID, PickModelProvider } from "../models";

export class LLMKit {
  prompt: string
  modelName?: string
  providerId: ModelProviderID

  constructor(prompt: string, providerId: ModelProviderID = "OpenAI", modelId?: string) {
    this.prompt = prompt;
    this.providerId = providerId;
    this.modelName = modelId;
  }

  async runInference(stream: boolean = false) {
    const modelProvider = PickModelProvider.getModelProvider(this.providerId)
    return stream ? await modelProvider.generateStream( this.prompt, this.modelName) : await modelProvider.generateText(this.prompt, this.modelName)
  }

}

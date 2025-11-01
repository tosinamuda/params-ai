import { CloudflareProvider } from "./CloudflareProvider";
import { GoogleProvider } from "./GoogleProvider";
import { LLMProvider } from "./LLMProvider";
import { OpenAIProvider } from "./OpenAIProvider";


export type ModelProviderID = "OpenAI" | "Cloudflare" | "Google" | "DefaultHTTP";

export class PickModelProvider<T extends LLMProvider> {
  static getModelProvider(modelProviderId: ModelProviderID = "OpenAI") {
    switch (modelProviderId) {
      case "Cloudflare":
        return new CloudflareProvider();
      case "OpenAI":
        return new OpenAIProvider();
      case "Google":
        return new GoogleProvider();
      case "DefaultHTTP":
        return new OpenAIProvider();
      default:
        return new OpenAIProvider();
    }
  }
}

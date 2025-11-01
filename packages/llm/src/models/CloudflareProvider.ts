import { fetch } from 'undici';
import { env } from '../env';
import { LLMProvider } from "./LLMProvider";


export class CloudflareProvider extends LLMProvider {
  modelName = "OpenAI";

  defaultModelName = "@cf/meta/llama-2-7b-chat-int8"

  getAPIIUrl(model: string) {
    if (!env.CF_API_KEY) {
      throw new Error("Cloudfare API key missing in env var");
    }

    if (!env.CF_ACCOUNT_ID) {
      throw new Error("Cloudfare Project Id is missing in env var");
    }
    const baseURL = `${env.CF_API_BASE_URL}/${env.CF_ACCOUNT_ID}/ai/run/${model}`;

    return { baseURL, token: env.CF_API_KEY };
  }

  async generateStream( prompt: string, modelName?: string) {

    if(!modelName) modelName = this.defaultModelName;


    const { baseURL, token } = this.getAPIIUrl(modelName);

    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ prompt, stream: true })
    });
    if (!response.body) throw new Error('Cloudflare Text Generation Failed');

    return response.body;

  }

  async generateText( prompt: string, modelName?: string) {

    if(!modelName) modelName = this.defaultModelName;

    const { baseURL, token } = this.getAPIIUrl(modelName);

    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ prompt })
    });
    if (!response.body) throw new Error('Cloudflare Text Generation Failed');

    const responseData = (await response.json()) as CloudflareInferenceResponse;


    if (responseData.errors && responseData.errors.length > 0) {
      const error_message = responseData.errors[0] || 'Server Error, Try Again';
      throw new Error(error_message);
    } else {
      if (responseData.result && responseData.result.response) {
        return responseData.result.response;
      } else {
        throw new Error('Unexpected response format');
      }
    }

  }




}
export interface CloudflareInferenceResponse {
  errors?: string[];
  result?: {
    response: string;
  };
}


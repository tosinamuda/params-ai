import dotenv from 'dotenv';
import { z } from "zod";

dotenv.config()

const envSchema = z.object
  ({
    OPENAI_API_KEY: z.string().optional(),
    GOOGLE_API_KEY: z.string().optional(),
    CF_API_KEY: z.string().optional(),
    CF_ACCOUNT_ID: z.string().optional(),
    CF_API_BASE_URL: z.string().url().default("https://api.cloudflare.com/client/v4/accounts"),
    WATSONX_API_KEY: z.string().optional(),
    WATSONX_BASE_URL: z.string().optional()
  })

export type AppConfig = z.infer<typeof envSchema>
const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  throw new Error('❌ Please ensure all environment variables are present and correct: ' +
    JSON.stringify(parsedEnv.error.format(), null, 4)
  )
}

export const env = parsedEnv.data;

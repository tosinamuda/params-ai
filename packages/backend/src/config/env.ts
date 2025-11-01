import dotenv from "dotenv";
import { z } from "zod";
dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "staging", "production"]).default('development'),
  PORT: z.coerce.number().default(8080),
  DATABASE_URL: z.string({ required_error: "Database Url is missing, unable to start app" }),
})

export type AppConfig = z.infer<typeof envSchema>;

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error('❌ please ensure all required environment variables are present and correct: ' +
    JSON.stringify(parsedEnv.error.format(), null, 4))
}

export const env = parsedEnv.data;

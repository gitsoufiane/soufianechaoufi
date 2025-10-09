import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .optional()
    .default("development"),
});

type Env = z.infer<typeof envSchema>;

// Validate environment variables at startup
function validateEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("❌ Invalid environment variables:");
    result.error.issues.forEach((issue) => {
      console.error(`  ${issue.path.join(".")}: ${issue.message}`);
    });
    throw new Error("Invalid environment variables");
  }

  return result.data;
}

export const env = validateEnv();

import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z
    .string()
    .min(1, "RESEND_API_KEY is required")
    .refine((val) => val.startsWith("re_"), {
      message: "RESEND_API_KEY must start with re_",
    }),
  RESEND_FROM_EMAIL: z.email("RESEND_FROM_EMAIL must be a valid email address"),
  RESEND_TO_EMAIL: z.email("RESEND_TO_EMAIL must be a valid email address"),
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

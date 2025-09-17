import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  inquiryType: z.string().min(1, {
    message: "Please select an inquiry type.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z
    .string()
    .min(20, {
      message: "Message must be at least 20 characters.",
    })
    .max(1000, {
      message: "Message must not exceed 1000 characters.",
    }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

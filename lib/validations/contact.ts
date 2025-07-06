import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().optional(),
  projectType: z.enum(["web-development", "consultation", "collaboration", "other"], {
    required_error: "Please select a project type.",
  }),
  budget: z.enum(["under-5k", "5k-15k", "15k-50k", "50k-plus", "not-sure"], {
    required_error: "Please select a budget range.",
  }),
  timeline: z.enum(["asap", "1-3-months", "3-6-months", "6-plus-months", "flexible"], {
    required_error: "Please select a timeline.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

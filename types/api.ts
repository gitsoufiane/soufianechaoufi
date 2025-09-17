export interface ZodIssue {
  path: (string | number)[];
  message: string;
  code: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  issues?: Record<string, string[]>; // Formatted Zod errors by field
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactApiResponse = ApiResponse<{ message: string }>;

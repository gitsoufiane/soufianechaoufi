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

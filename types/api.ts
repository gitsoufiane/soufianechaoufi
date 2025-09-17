export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  issues?: any; // Zod's format() return type is complex, using any for simplicity
}

export type ContactApiResponse = ApiResponse<any>;

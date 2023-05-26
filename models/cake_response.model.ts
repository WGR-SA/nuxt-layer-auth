export interface CakeResponse<T> {
  data: T |T[];
  success: boolean;
  message?: string;
} 
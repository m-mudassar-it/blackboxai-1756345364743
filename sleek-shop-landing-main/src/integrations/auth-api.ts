import { API_URL } from "@/lib/utils";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    type: string;
    status: string;
  };
}

interface ApiError {
  message: string;
  error?: any;
}

export const authApi = {
  async login(email: string, password: string): Promise<{ data?: LoginResponse; error?: ApiError }> {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password } as LoginRequest),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: {
            message: data.message || 'Login failed',
            error: data
          }
        };
      }

      return { data };
    } catch (error) {
      return {
        error: {
          message: 'Network error occurred',
          error
        }
      };
    }
  }
}; 
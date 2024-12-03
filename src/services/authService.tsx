 import axios from "@/utils/lib/axios";  

export interface LoginCredentials {  
  email: string;  
  password: string;  
}  

export interface User {  
  id: number;  
  name: string;  
  email: string;  
  akses: {  
    role: string;  
    code: string;  
  };  
}  

export interface AuthResponse {  
  status: {  
    code: number;  
    description: string;  
  };  
  result: {  
    access_token: string;  
    refresh_token: string;  
  };  
}  

export class AuthService {  
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {  
    try {  
      const response = await axios.post<AuthResponse>(`/auth/sign-in`, credentials);  
      return response.data;  
    } catch (error: any) {  
      throw new Error(error.response?.data?.message || 'Login failed');  
    }  
  }  

  static async logout(): Promise<void> {  
    try {  
      localStorage.removeItem('access_token');  
      localStorage.removeItem('refresh_token');  

      await axios.get(`/auth/sign-out`, {});  
    } catch (error: any) {  
      if (error.response?.status !== 401) {  
        console.error('Logout error:', error);  
      }  
    }
  }

  static async clearTokens() {  
    localStorage.removeItem('access_token');  
    localStorage.removeItem('refresh_token');  
  }  
  
  static async getProfile(): Promise<User> {  
    const { data } = await axios.get('/auth/profile');  
    return data;  
  }  
}
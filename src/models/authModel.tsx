
export interface LoginCredentials {  
    email: string;  
    password: string;  
  }  
  
  export interface UserProfile {  
    id: number;  
    name: string;  
    email: string;  
    akses: {  
      role: string;  
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
      user: UserProfile;  
    };  
  }  
  
  export interface TokenResponse {  
    result: {  
      access_token: string;  
      refresh_token: string;  
    };  
  }  
  
// src/utils/lib/AuthContext.tsx  
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';  
import { useRouter } from 'next/router';  
import { AuthService } from '@/services/authService';  
import LoadingSpinner from '@/components/LoadingSpinner';

interface AuthContextType {  
  isAuthenticated: boolean;  
  user: any | null;  
  login: (email: string, password: string) => Promise<void>;  
  logout: () => Promise<void>;  
  isLoading: boolean;  
}  

const AuthContext = createContext<AuthContextType>({  
  isAuthenticated: false,  
  user: null,  
  login: async () => {},  
  logout: async () => {},  
  isLoading: true,  
});  

const PUBLIC_ROUTES = ['/auth/sign-in', '/'] as const;  
export function AuthProvider({ children }: { children: ReactNode }) {  
  const [isAuthenticated, setIsAuthenticated] = useState(false);  
  const [isLoading, setIsLoading] = useState(true);  
  const [user, setUser] = useState(null);  
  const router = useRouter();  

  useEffect(() => {  
    checkAuth();  
  }, []);  

  const checkAuth = async () => {  
    try {  
      const token = localStorage.getItem('access_token');  
      
      if (!token && !PUBLIC_ROUTES.includes(router.pathname as any)) {  
        router.replace('/auth/sign-in');  
        return;  
      }  
      
      if (token) {  
        setIsAuthenticated(true);  
      }  
    } catch (error) {  
      console.error('Auth check failed:', error);  
      setIsAuthenticated(false);  
      localStorage.removeItem('access_token');  
      localStorage.removeItem('refresh_token');  
      if (!PUBLIC_ROUTES.includes(router.pathname as any)) {  
        router.replace('/auth/sign-in');  
      }  
    } finally {  
      setIsLoading(false);  
    }  
  };  

  const login = async (email: string, password: string) => {  
    try {  
      const response = await AuthService.login({ email, password });  
      const { access_token, refresh_token } = response.result;  
      
      localStorage.setItem('access_token', access_token);  
      localStorage.setItem('refresh_token', refresh_token);  
  
       try {  
        const payload = JSON.parse(atob(access_token.split('.')[1]));  
        const userRole = payload.role.toLowerCase();  
        
        setIsAuthenticated(true);  
        setUser({ ...payload });  
  
         let returnUrl = router.query.from as string;  
        if (!returnUrl) {  
          if (userRole === 'kasir') {  
            returnUrl = '/kasir-dashboard';  
          } else { 
            returnUrl = '/dashboard/admin'; 
          } 
        }  
        
        router.push(returnUrl);  
      } catch (error) {  
        console.error('Error decoding token:', error);  
        throw new Error('Token tidak valid');  
      }  
    } catch (error) {  
      console.error('Login error:', error);  
      throw error;  
    }  
  };

  const logout = async () => {  
    try {  
      setIsLoading(true);   
      
      // Pertama, coba logout dari server  
      try {  
        await AuthService.logout();  
      } catch (error) {  
        console.warn('Logout API failed, proceeding with client-side logout');  
      }  
      
      // Clear tokens di frontend  
      AuthService.clearTokens();  
      
      // Reset state  
      setIsAuthenticated(false);  
      setUser(null);  
      
      // Redirect ke halaman login  
      await router.replace('/auth/sign-in');  
    } catch (error) {  
      console.error('Logout process error:', error);  
      // Fallback redirect  
      await router.replace('/auth/sign-in');  
    } finally {  
      setIsLoading(false);   
    }  
  };

  const value = {  
    isAuthenticated,  
    user,  
    login,  
    logout,  
    isLoading,  
  };  

  return (  
    <AuthContext.Provider value={value}>  
      {isLoading ? <LoadingSpinner /> : children}  
    </AuthContext.Provider>  
  );  
}  

export function useAuth() {  
  const context = useContext(AuthContext);  
  if (!context) {  
    throw new Error('useAuth must be used within an AuthProvider');  
  }  
  return context;  
}
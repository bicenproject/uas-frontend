import { useEffect, useState } from 'react';  
import { AuthService, User } from '@/services/authService';  

export const useRole = () => {  
  const [user, setUser] = useState<User | null>(null);  
  const [loading, setLoading] = useState(true);  

  useEffect(() => {  
    const loadUser = async () => {  
      try {  
        const userData = await AuthService.getProfile();  
        setUser(userData);  
      } catch (error) {  
        console.error('Failed to load user:', error);  
      } finally {  
        setLoading(false);  
      }  
    };  

    loadUser();  
  }, []);  

  return { user, loading };  
};
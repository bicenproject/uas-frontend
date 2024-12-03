// src/components/auth/ProtectedRoute.tsx  
import { useEffect, ReactNode } from 'react';  
import { useRouter } from 'next/router';  
import { useAuth } from '@/utils/lib/AuthContext';  
import LoadingSpinner from '../LoadingSpinner';

interface ProtectedRouteProps {  
  children: ReactNode;  
}  

export default function ProtectedRoute({ children }: ProtectedRouteProps) {  
  const router = useRouter();  
  const { isAuthenticated, isLoading } = useAuth();  

  useEffect(() => {  
    if (!isLoading && !isAuthenticated) {  
      router.replace('/auth/sign-in');  
    }  
  }, [isAuthenticated, isLoading, router]);  

  if (isLoading) {  
    return <LoadingSpinner />;  
  }  

  return isAuthenticated ? <>{children}</> : null;  
}
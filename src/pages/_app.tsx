import type { AppProps } from 'next/app';  
import { AuthProvider } from '@/utils/lib/AuthContext';  
import LoadingSpinner from '@/components/LoadingSpinner';  
import Layout from '@/components/Layout';  
import { useRouter } from 'next/router';  
import { useEffect, useState } from 'react';  
import "../styles/globals.css";  
import { Toaster } from 'sonner';  

type ComponentWithLayout = AppProps & {  
  Component: AppProps['Component'] & {  
    disableLayout?: boolean  
  }  
}  

function MyApp({ Component, pageProps }: ComponentWithLayout) {  
  const router = useRouter();  
  const [loading, setLoading] = useState(false);  

  useEffect(() => {  
    const handleStart = () => setLoading(true);  
    const handleComplete = () => setLoading(false);  

    router.events.on('routeChangeStart', handleStart);  
    router.events.on('routeChangeComplete', handleComplete);  
    router.events.on('routeChangeError', handleComplete);  

    return () => {  
      router.events.off('routeChangeStart', handleStart);  
      router.events.off('routeChangeComplete', handleComplete);  
      router.events.off('routeChangeError', handleComplete);  
    };  
  }, [router]);  

  const noLayoutPaths = ['/auth/sign-in', '/'];  
  const shouldUseLayout = !noLayoutPaths.includes(router.pathname);  

  return (  
    <AuthProvider>  
      {loading && <LoadingSpinner />}  
      {shouldUseLayout ? (  
        <Layout>  
          <Component {...pageProps} />  
          <Toaster   
            position="top-right"  
            offset={16}  
            richColors  
            expand={false}  
            closeButton  
            theme="light"  
            style={{ zIndex: 9999 }}  
          />  
        </Layout>  
      ) : (  
        <>  
          <Component {...pageProps} />  
          <Toaster   
            position="top-right"  
            offset={16}  
            richColors  
            expand={false}  
            closeButton  
            theme="light"  
            style={{ zIndex: 9999 }}  
          />  
        </>  
      )}  
    </AuthProvider>  
  );  
}  

export default MyApp;
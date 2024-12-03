import { useEffect, useState } from 'react';  
import { useRouter } from 'next/router';  
import { useAuth } from '@/utils/lib/AuthContext';  
import Image from 'next/image';  
 import Head from 'next/head';  
import Link from 'next/link';  
import { Bell, Lock, Mailbox } from '@phosphor-icons/react';
 
export default function SignIn() {  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [error, setError] = useState('');  
  const [loading, setLoading] = useState(false);  
  const [rememberMe, setRememberMe] = useState(false);  
  const { login, isAuthenticated } = useAuth();  
  const router = useRouter();  

  useEffect(() => {  
    // Cek apakah ada credential tersimpan  
    const savedEmail = localStorage.getItem('rememberedEmail');  
    if (savedEmail) {  
      setEmail(savedEmail);  
      setRememberMe(true);  
    }  
  }, []);  

  useEffect(() => {  
    if (isAuthenticated) {  
      router.replace('/dashboard/admin');  
    }  
  }, [isAuthenticated, router]);  

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault();  
    setError('');  
    setLoading(true);  

    try {  
      await login(email, password);  
      
      if (rememberMe) {  
        localStorage.setItem('rememberedEmail', email);  
      } else {  
        localStorage.removeItem('rememberedEmail');  
      }  

      router.push('/dashboard/admin');  
    } catch (err: any) {  
      console.error('Login error:', err);  
      setError(err.message || 'Failed to sign in');  
    } finally {  
      setLoading(false);  
    }  
  };  

  return (  
    <>  
      <Head>  
        <title>Sign In | Your Company Name</title>  
        <meta name="description" content="Sign in to your account" />  
      </Head>  

      <div className="min-h-screen flex flex-col md:flex-row">  
        {/* Left Side - Image */}  
        <div className="hidden md:flex md:w-1/2 bg-blue-600">  
          <div className="flex items-center justify-center w-full h-full p-12">  
            <div className="max-w-lg">  
              <Image  
                src="/images/login-illustration.svg" // Pastikan file ada  
                alt="Login Illustration"  
                width={500}  
                height={500}  
                className="w-full h-auto"  
                priority  
              />  
            </div>  
          </div>  
        </div>  

        {/* Right Side - Login Form */}  
        <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">  
          <div className="w-full max-w-md space-y-8">  
            {/* Header */}  
            <div className="text-center">  
              <div className="flex justify-center mb-6">  
                <Image  
                  src="/images/logo.png" // Pastikan file ada  
                  alt="Company Logo"  
                  width={64}  
                  height={64}  
                  className="w-16 h-16"  
                  priority  
                />  
              </div>  
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">  
                Welcome back  
              </h1>  
              <p className="mt-2 text-sm text-gray-600">  
                Please sign in to your account  
              </p>  
            </div>  

            {/* Form */}  
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>  
              {error && (  
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md flex items-center space-x-3">  
                  <Bell className="h-5 w-5 text-red-500" />  
                  <span className="text-sm text-red-700">{error}</span>  
                </div>  
              )}  

              <div className="space-y-4">  
                {/* Email Field */}  
                <div>  
                  <label   
                    htmlFor="email"   
                    className="block text-sm font-medium text-gray-700"  
                  >  
                    Email address  
                  </label>  
                  <div className="mt-1 relative">  
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">  
                      <Mailbox className="h-5 w-5 text-gray-400" />  
                    </div>  
                    <input  
                      id="email"  
                      name="email"  
                      type="email"  
                      autoComplete="email"  
                      required  
                      value={email}  
                      onChange={(e) => setEmail(e.target.value)}  
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg   
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  
                               text-sm placeholder-gray-400"  
                      placeholder="name@company.com"  
                    />  
                  </div>  
                </div>  

                {/* Password Field */}  
                <div>  
                  <label   
                    htmlFor="password"   
                    className="block text-sm font-medium text-gray-700"  
                  >  
                    Password  
                  </label>  
                  <div className="mt-1 relative">  
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">  
                      <Lock className="h-5 w-5 text-gray-400" />  
                    </div>  
                    <input  
                      id="password"  
                      name="password"  
                      type="password"  
                      autoComplete="current-password"  
                      required  
                      value={password}  
                      onChange={(e) => setPassword(e.target.value)}  
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg   
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  
                               text-sm placeholder-gray-400"  
                      placeholder="••••••••"  
                    />  
                  </div>  
                </div>  
              </div>  

              {/* Remember Me & Forgot Password */}  
              <div className="flex items-center justify-between">  
                <div className="flex items-center">  
                  <input  
                    id="remember-me"  
                    name="remember-me"  
                    type="checkbox"  
                    checked={rememberMe}  
                    onChange={(e) => setRememberMe(e.target.checked)}  
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500   
                             border-gray-300 rounded cursor-pointer"  
                  />  
                  <label   
                    htmlFor="remember-me"   
                    className="ml-2 block text-sm text-gray-700 cursor-pointer"  
                  >  
                    Remember me  
                  </label>  
                </div>  

                <Link  
                  href="/auth/forgot-password"  
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"  
                >  
                  Forgot password?  
                </Link>  
              </div>  

              {/* Submit Button */}  
              <div>  
                <button  
                  type="submit"  
                  disabled={loading}  
                  className={`w-full flex justify-center py-2.5 px-4 border border-transparent   
                           rounded-lg shadow-sm text-sm font-medium text-white   
                           bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2   
                           focus:ring-offset-2 focus:ring-blue-500 transition-colors  
                           ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}  
                >  
                  {loading ? (  
                    <div className="flex items-center">  
                      <svg  
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"  
                        xmlns="http://www.w3.org/2000/svg"  
                        fill="none"  
                        viewBox="0 0 24 24"  
                      >  
                        <circle  
                          className="opacity-25"  
                          cx="12"  
                          cy="12"  
                          r="10"  
                          stroke="currentColor"  
                          strokeWidth="4"  
                        />  
                        <path  
                          className="opacity-75"  
                          fill="currentColor"  
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"  
                        />  
                      </svg>  
                      Signing in...  
                    </div>  
                  ) : (  
                    'Sign in'  
                  )}  
                </button>  
              </div>  
            </form>  

            {/* Footer */}  
            <div className="mt-6">  
              <div className="relative">  
                <div className="absolute inset-0 flex items-center">  
                  <div className="w-full border-t border-gray-300" />  
                </div>  
                <div className="relative flex justify-center text-sm">  
                  <span className="px-2 bg-gray-50 text-gray-500">  
                    Continue as Guest{' '}  
                    <Link  
                      href="/"  
                      className="font-medium text-blue-600 hover:text-blue-500"  
                    >  
                      Guest
                    </Link>  
                  </span>  
                </div>  
              </div>  
            </div>  
          </div>  
        </div>  
      </div>  
    </>  
  );  
}
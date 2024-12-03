 import { useState } from 'react'  
import Link from 'next/link'  
 import { useAuth } from '@/utils/lib/AuthContext'  
import ProtectedRoute from './Auth/ProtectedRoute'

export default function Layout({ children }: { children: React.ReactNode }) {  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)  
   const { logout, user } = useAuth()  

  return (  
    <>  
      <ProtectedRoute>  
        <div className="min-h-screen bg-gray-50 flex flex-col">   
          <nav className="bg-white shadow-sm">  
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
              <div className="flex justify-between h-16">  
                <div className="flex">  
                  <Link  
                    href="/dashboard/admin"  
                    className="flex items-center text-xl font-bold"  
                  >  
                    Logo  
                  </Link>  
                </div>  

                <div className="hidden md:flex items-center space-x-4">  
                  
                   <div className="relative ml-3">  
                    <div className="flex items-center space-x-3">  
                      <span className="text-sm text-gray-700">  
                        {user?.email || 'Admin'}  
                      </span>  
                      <button  
                        onClick={logout}  
                        className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"  
                      >  
                        Logout  
                      </button>  
                    </div>  
                  </div>  
                  
                   <div className="md:hidden flex items-center">  
                    <button  
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}  
                      className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"  
                    >  
                      <span className="sr-only">Open main menu</span>  
                       <svg  
                        className="h-6 w-6"  
                        xmlns="http://www.w3.org/2000/svg"  
                        fill="none"  
                        viewBox="0 0 24 24"  
                        stroke="currentColor"  
                      >  
                        <path  
                          strokeLinecap="round"  
                          strokeLinejoin="round"  
                          strokeWidth={2}  
                          d="M4 6h16M4 12h16M4 18h16"  
                        />  
                      </svg>  
                    </button>  
                  </div>  
                </div>  
              </div>  
            </div>  

             {isSidebarOpen && (  
              <div className="md:hidden">  
                <div className="px-2 pt-2 pb-3 space-y-1">  
                  <button  
                    onClick={logout}  
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50"  
                  >  
                    Logout  
                  </button>  
                </div>  
              </div>  
            )}  
          </nav>  

          <main className="flex-grow">  
            {children}  
          </main>  

          <footer className="bg-white border-t">  
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">  
              <p className="text-center text-gray-500">  
                © {new Date().getFullYear()} Bina Informatika. All rights reserved.  
              </p>  
            </div>  
          </footer>  
        </div>  
      </ProtectedRoute>  
    </>  
  )  
}
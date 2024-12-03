import React, { useState, useRef, useEffect } from 'react'  
import Link from 'next/link'  
import { useAuth } from '@/utils/lib/AuthContext'  
import ProtectedRoute from './Auth/ProtectedRoute'  
import {   
  List,   
  SignOut,   
  UserCircle,   
  CaretDown   
} from '@phosphor-icons/react'  

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)  
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)  
  const dropdownRef = useRef<HTMLDivElement>(null)  
  const { logout, user } = useAuth()  

  // Close dropdown when clicking outside  
  useEffect(() => {  
    const handleClickOutside = (event: MouseEvent) => {  
      if (  
        dropdownRef.current &&   
        !dropdownRef.current.contains(event.target as Node)  
      ) {  
        setIsProfileDropdownOpen(false)  
      }  
    }  

    // Add event listener  
    document.addEventListener('mousedown', handleClickOutside)  
    
    // Cleanup  
    return () => {  
      document.removeEventListener('mousedown', handleClickOutside)  
    }  
  }, [])  

  return (  
    <ProtectedRoute>  
      <div className="min-h-screen bg-gray-50 flex flex-col">   
        <nav className="bg-white shadow-sm">  
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
            <div className="flex justify-between h-16">  
              {/* Logo */}  
              <div className="flex">  
                <Link   
                  href="/dashboard/admin"  
                  className="flex items-center text-xl font-bold"  
                >  
                  ATK Inventory  
                </Link>  
              </div>  

              {/* Desktop Navigation */}  
              <div className="hidden md:flex items-center space-x-4 relative" ref={dropdownRef}>  
                <div className="relative">  
                  <div   
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}  
                    className="flex items-center space-x-3 cursor-pointer"  
                  >  
                    <div className="flex items-center gap-2 text-gray-700">  
                      <UserCircle className="w-5 h-5" />  
                      <span className="text-sm">  
                        {user?.email || 'Admin'}  
                      </span>  
                      <div   
                        className={`transition-transform duration-200 ${  
                          isProfileDropdownOpen ? 'rotate-180' : 'rotate-0'  
                        }`}  
                      >  
                        <CaretDown className="w-4 h-4" />  
                      </div>  
                    </div>  
                  </div>  

                  {/* Dropdown */}  
                  <div   
                    className={`  
                      absolute right-0 top-full mt-2 w-48 bg-white   
                      border border-gray-200 rounded-lg shadow-lg z-50   
                      origin-top-right transform transition-all duration-300 ease-in-out  
                      ${isProfileDropdownOpen   
                        ? 'opacity-100 scale-100 visible'   
                        : 'opacity-0 scale-95 invisible'  
                      }  
                    `}  
                  >  
                    <div className="py-1">  
                      <button  
                        onClick={logout}  
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"  
                      >  
                        <SignOut className="w-4 h-4" />  
                        Logout  
                      </button>  
                    </div>  
                  </div>  
                </div>  
              </div>  

              {/* Mobile Menu Toggle */}  
              <div className="md:hidden flex items-center">  
                <button  
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}  
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"  
                >  
                  <span className="sr-only">Open main menu</span>  
                  <List className="w-6 h-6" />  
                </button>  
              </div>  
            </div>  
          </div>  

          {/* Mobile Dropdown */}  
          {isSidebarOpen && (  
            <div className="md:hidden">  
              <div className="px-2 pt-2 pb-3 space-y-1">  
                <div className="px-3 py-2 text-sm text-gray-700 flex items-center gap-2">  
                  <UserCircle className="w-4 h-4" />  
                  {user?.email || 'Admin'}  
                </div>  
                <button  
                  onClick={logout}  
                  className="flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-gray-50"  
                >  
                  <SignOut className="w-4 h-4" />  
                  Logout  
                </button>  
              </div>  
            </div>  
          )}  
        </nav>  

         <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">  
          {children}  
        </main>  

         <footer className="bg-white border-t">  
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">  
            <p className="text-center text-gray-500">  
              © {new Date().getFullYear()} Hafizh Syahputra. Bina Informatika.  
            </p>  
          </div>  
        </footer>  
      </div>  
    </ProtectedRoute>  
  )  
}  

export default Layout
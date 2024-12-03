// src/middleware.ts  
import { NextResponse } from 'next/server';  
import type { NextRequest } from 'next/server';  

export function middleware(request: NextRequest) {  
  const token = request.cookies.get('access_token')?.value || localStorage.getItem('access_token');  
  const { pathname } = request.nextUrl;  

   const publicPaths = ['/auth/sign-in'];  

   const isPublicPath = publicPaths.includes(pathname);  

   if (!token && !isPublicPath) {  
    const url = new URL('/auth/sign-in', request.url);  
    url.searchParams.set('from', pathname);  
    return NextResponse.redirect(url);  
  }  

   if (token && isPublicPath) {  
    return NextResponse.redirect(new URL('/dashboard', request.url));  
  }  

  return NextResponse.next();  
}  

 export const config = {  
  matcher: [  
    /*  
     * Match all request paths except for the ones starting with:  
     * - api (API routes)  
     * - _next/static (static files)  
     * - _next/image (image optimization files)  
     * - favicon.ico (favicon file)  
     * - public folder  
     */  
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',  
  ],  
};
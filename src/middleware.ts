import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup' || 
						path === '/verifyemail' || path === '/forgotpassword' || path === '/resetpassword'

    const token = request.cookies.get('token')?.value || ''

    if(isPublicPath && token) {
        // Redirect to profile if user is authenticated
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }

    if(!isPublicPath && !token) {
        // Redirect to login if user is not authenticated
       return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/profile/:id',
    '/verifyemail',
    '/forgotpassword',
    '/resetpassword',
    '/resetpassword/:token',
  ]
}
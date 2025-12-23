import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = await getToken({req: request, secret: process.env.AUTH_SECRET})
    const protectedRoutes = ["/admin"]

if (protectedRoutes.some(route => pathname.startsWith(route))) {
    
    if (!token) {
        const url = new URL("/auth/login", request.url)
        return NextResponse.redirect(url)
    }
    
    if (token.isAdmin === false) {
        const url = new URL("/", request.url)
        return NextResponse.redirect(url)
    }
}
    return NextResponse.next()
}
export const config = {
    matcher: ["/admin"]
}
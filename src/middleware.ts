import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // список защищённых маршрутов
    const protectedRoutes = ["/admin"];

    // если путь не защищён — пропускаем
    if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // получаем JWT из NextAuth
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

    // если токена нет — редирект на логин
    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // проверка роли
    if (token.role !== "admin") {
        return NextResponse.redirect(new URL("/403", request.url));
    }

    // всё ок, пускаем дальше
    return NextResponse.next();
}

// указываем на какие маршруты срабатывает middleware
export const config = {
    matcher: ["/admin/:path*"]
};

import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get(
    "__Secure-next-auth.session-token"
  )?.value;

  // Se o usuário estiver autenticado e tentar acessar a página de login, redirecioná-lo para o dashboard
  if (currentUser && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/statistic", request.url));
  }

  // Se o usuário não estiver autenticado e tentar acessar qualquer página protegida, redirecioná-lo para a página de login
  if (!currentUser && request.nextUrl.pathname.startsWith("/statistic")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Permitir que a requisição continue para outras rotas não protegidas
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/statistic/:path*", "/create/:path*", "/meal/:path"],
};

// next-auth.session-token

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// export default async function middleware(request: NextRequest) {
//   const c = cookies();

//   //   const allCookies = c
//   //     .getAll()
//   //     .map((c) => `${c.name}=${c.value}`)
//   //     .join("; ");

//   const signURL = new URL("/", request.url);
//   const statisticURL = new URL("/statistic", request.url);

//   if (!c.get("next-auth.session-token")?.value?.trim()) {
//     if (request.nextUrl.pathname === "/") {
//       return NextResponse.next();
//     }

//     return NextResponse.redirect(signURL);
//   }

//   if (request.nextUrl.pathname === "/") {
//     return NextResponse.redirect(statisticURL);
//   }

//   //   const headers = {
//   //     "Content-Type": "application/json",
//   //     Cookie: allCookies,
//   //   };

//   //   const url = new URL(`/api/auth/session`, process.env.LOOPBACK_URL);
//   //   const response = await fetch(url.href, {
//   //     headers,
//   //     cache: "no-store",
//   //   });

//   //   if (response.ok) {
//   //     if (new Date(session.expires) < new Date()) {
//   //       return new Response("Refresh session!", { status: 401 });
//   //     }

//   //     return NextResponse.next();
//   //   }

//   //   return new Response("Unauthorized", { status: 401 });
// }

export const config = {
  matcher: ["/", "/statistic/:path*", "/create/:path*", "/meal/:path"],
};

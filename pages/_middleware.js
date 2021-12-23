import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  //Token exists if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  //Allow if the following is true...
  //    1) It's a request for next-auth session & provider fetching
  //    2 if token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next(); //continue on towards the app
  }
  // if the above is false, redirect to the login page
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}

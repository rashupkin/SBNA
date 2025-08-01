import { NextRequest, NextResponse } from "next/server";
import { pages } from "./constants/pages";

export function middleware(request: NextRequest) {
  if (request.cookies.get("refresh_token")) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(pages.signIn, request.url));
}

export const config = {
  matcher: ["/editor", "/profile", "/posts/:postId/editor"],
};

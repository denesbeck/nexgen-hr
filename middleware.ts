import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // HACK: In this middleware, we are checking if the session-id cookie exists. The real safety check is done in the `/(authenticated)` layout.
  const sessionId = request.cookies.get('session-id')?.value
  if (!sessionId) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/(authenticated)/:path*'],
}

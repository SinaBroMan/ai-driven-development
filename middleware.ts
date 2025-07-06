import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 개발 모드에서는 모든 경로를 허용
export function middleware(request: NextRequest) {
    return NextResponse.next()
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        '/((?!.*\\..*|_next).*)',
        '/',
        '/(api|trpc)(.*)'
    ]
}

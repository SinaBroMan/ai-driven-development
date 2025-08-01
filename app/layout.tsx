import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Header } from '@/components/layout/header'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
})

export const metadata: Metadata = {
    title: 'Artify',
    description: 'AI Art Generator'
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <body
                className={cn(
                    'min-h-screen bg-background antialiased',
                    geistSans.className
                )}
            >
                <Header />
                <main className="pt-16">{children}</main>
                <Toaster />
            </body>
        </html>
    )
}

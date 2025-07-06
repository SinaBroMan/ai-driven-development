'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { INavigationItem } from '@/types'
import { User, LogIn } from 'lucide-react'

const navigation: INavigationItem[] = [
    { name: '이미지 생성', href: '/generate' },
    { name: '내 갤러리', href: '/gallery' }
]

export function Header() {
    const pathname = usePathname()

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-purple-600/20 z-50">
            <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
                {/* 로고 섹션 */}
                <Link
                    href="/"
                    className="flex items-center gap-2 hover:opacity-80 transition-all duration-300"
                >
                    <div className="relative w-10 h-10">
                        <Image
                            src="/logo.webp"
                            alt="Artify 로고"
                            fill
                            className="rounded-lg ring-2 ring-purple-600/30 object-cover"
                            priority
                        />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                        Artify
                    </span>
                </Link>

                {/* 네비게이션 메뉴 */}
                <div className="flex items-center gap-8">
                    <nav
                        className="flex items-center gap-8"
                        role="navigation"
                        aria-label="메인 메뉴"
                    >
                        {navigation.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'relative text-base font-medium transition-all duration-300',
                                    'hover:text-purple-400 focus-visible:text-purple-400',
                                    'outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2',
                                    'py-1',
                                    pathname === item.href
                                        ? 'text-purple-400 after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-0.5 after:bg-purple-400'
                                        : 'text-gray-300'
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* 사용자 섹션 */}
                    <div className="flex items-center">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-purple-400" />
                            <span className="text-sm text-gray-300">개발 모드</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

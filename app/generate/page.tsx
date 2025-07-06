import { GenerateImageForm } from '@/components/generate/GenerateImageForm'
import { Suspense } from 'react'
import { Sparkles, Wand2, Palette } from 'lucide-react'

function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            <div className="text-center">
                <div className="relative">
                    <div className="w-12 h-12 mx-auto mb-4 border-2 border-purple-600 rounded-full animate-spin border-t-transparent"></div>
                    <div className="absolute inset-0 w-12 h-12 mx-auto border-2 border-purple-400 rounded-full animate-pulse opacity-50"></div>
                </div>
                <p className="text-gray-300 animate-pulse">로딩 중...</p>
            </div>
        </div>
    )
}

export default function GeneratePage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
                {/* 배경 패턴 */}
                <div className="absolute inset-0 bg-grid-white/5 bg-grid-pattern"></div>
                
                {/* 상단 장식 요소 */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-20 h-20 bg-blue-600/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
                
                <div className="container mx-auto px-6 py-12 relative z-10">
                    {/* Hero 섹션 */}
                    <div className="text-center mb-16">
                        <div className="relative inline-block mb-6">
                            <div className="absolute inset-0 bg-purple-600/30 blur-3xl rounded-full animate-pulse"></div>
                            <div className="relative flex items-center justify-center gap-3 mb-4">
                                <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
                                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
                                    AI 이미지 생성
                                </h1>
                                <Wand2 className="w-8 h-8 text-purple-400 animate-pulse" />
                            </div>
                        </div>
                        
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            단 한 번의 클릭으로 상상을 현실로 바꿔보세요.
                            <br />
                            <span className="text-purple-400 font-medium">AI가 당신의 창의적인 아이디어를 예술 작품으로 만들어드립니다.</span>
                        </p>
                        
                        {/* 기능 소개 */}
                        <div className="flex justify-center gap-8 mt-8">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Palette className="w-5 h-5 text-purple-400" />
                                <span className="text-sm">10가지 아트 스타일</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Sparkles className="w-5 h-5 text-purple-400" />
                                <span className="text-sm">7가지 색감 옵션</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Wand2 className="w-5 h-5 text-purple-400" />
                                <span className="text-sm">고품질 이미지 생성</span>
                            </div>
                        </div>
                    </div>

                    {/* 메인 콘텐츠 */}
                    <div className="relative max-w-5xl mx-auto">
                        {/* 배경 효과 */}
                        <div className="absolute inset-0 bg-purple-600/5 blur-xl rounded-2xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl"></div>
                        
                        {/* 컨텐츠 카드 */}
                        <div className="relative bg-gray-800/40 backdrop-blur-xl border border-purple-600/20 rounded-2xl p-8 shadow-2xl">
                            <GenerateImageForm />
                        </div>
                    </div>
                </div>
            </main>
        </Suspense>
    )
}

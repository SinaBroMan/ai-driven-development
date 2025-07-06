'use client'

import { Button } from '@/components/ui/button'

import { Loader2, Sparkles, Zap, Star, Download, Heart } from 'lucide-react'
import Image from 'next/image'
import { IImageGenerationProps } from '@/types'
import { useState, useEffect } from 'react'

export function ImageGeneration({
    onGenerate,
    isGenerating,
    generatedImageUrl
}: IImageGenerationProps) {
    const [progress, setProgress] = useState(0)
    const [loadingText, setLoadingText] = useState('이미지 생성 준비 중...')

    useEffect(() => {
        if (isGenerating) {
            setProgress(0)
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 95) {
                        setLoadingText('최종 처리 중...')
                        return prev
                    }
                    
                    // 진행률에 따른 메시지 변경
                    if (prev < 30) {
                        setLoadingText('AI가 프롬프트를 분석하고 있습니다...')
                    } else if (prev < 60) {
                        setLoadingText('이미지를 생성하고 있습니다...')
                    } else if (prev < 90) {
                        setLoadingText('세부사항을 조정하고 있습니다...')
                    } else {
                        setLoadingText('거의 완료되었습니다...')
                    }
                    
                    return prev + Math.random() * 3
                })
            }, 100)

            return () => clearInterval(interval)
        } else {
            setProgress(0)
            setLoadingText('이미지 생성 준비 중...')
        }
    }, [isGenerating])

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-200 mb-2 flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5 text-purple-400" />
                    이미지 생성
                </h3>
                <p className="text-sm text-gray-400">
                    AI가 당신의 프롬프트를 바탕으로 고품질 이미지를 생성합니다
                </p>
            </div>

            {/* 생성 버튼 */}
            <div className="space-y-4">
                <Button
                    onClick={onGenerate}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white h-14 text-lg font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 disabled:transform-none disabled:hover:scale-100"
                >
                    {isGenerating ? (
                        <div className="flex items-center gap-3">
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <div className="flex flex-col items-start">
                                <span className="text-base">생성 중...</span>
                                <span className="text-xs opacity-75">{Math.round(progress)}% 완료</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            이미지 생성하기
                            <Star className="w-5 h-5" />
                        </div>
                    )}
                </Button>

                {/* 진행률 바 */}
                {isGenerating && (
                    <div className="space-y-2">
                        <div className="w-full bg-gray-800 rounded-full h-2">
                            <div 
                                className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-400 text-center animate-pulse">
                            {loadingText}
                        </p>
                    </div>
                )}
            </div>

            {/* 이미지 미리보기 */}
            {generatedImageUrl && (
                <div className="space-y-4">
                    <div className="text-center">
                        <h4 className="text-base font-medium text-gray-200 mb-2 flex items-center justify-center gap-2">
                            <Heart className="w-4 h-4 text-pink-400" />
                            생성 완료!
                        </h4>
                        <p className="text-sm text-gray-400">
                            이미지가 성공적으로 생성되었습니다
                        </p>
                    </div>

                    <div className="relative group">
                        {/* 배경 효과 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                        
                        {/* 이미지 컨테이너 */}
                        <div className="relative aspect-square w-full max-w-md mx-auto rounded-2xl overflow-hidden border-2 border-purple-600/30 shadow-2xl group-hover:border-purple-500/50 transition-all duration-300">
                            <Image
                                src={generatedImageUrl}
                                alt="Generated AI image"
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                priority
                            />
                            
                            {/* 호버 오버레이 */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-white text-center">
                                    <Download className="w-8 h-8 mx-auto mb-2" />
                                    <p className="text-sm font-medium">이미지 보기</p>
                                </div>
                            </div>
                        </div>

                        {/* 이미지 정보 */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                            <div className="bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full border border-purple-600/30">
                                <p className="text-xs text-gray-300">
                                    AI 생성 이미지 · 고품질
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 성공 메시지 */}
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Star className="w-5 h-5 text-green-400" />
                            <span className="text-green-400 font-medium">생성 성공!</span>
                        </div>
                        <p className="text-sm text-gray-400">
                            아래 버튼들을 사용하여 이미지를 저장하거나 공유할 수 있습니다.
                        </p>
                    </div>
                </div>
            )}

            {/* 생성 안내 */}
            {!generatedImageUrl && !isGenerating && (
                <div className="bg-gray-800/30 border border-purple-600/20 rounded-lg p-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        <span className="text-gray-300 font-medium">생성 안내</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-400">
                        <p>• 프롬프트와 스타일 옵션을 확인한 후 생성 버튼을 클릭하세요</p>
                        <p>• 이미지 생성에는 약 2-5초가 소요됩니다</p>
                        <p>• 생성된 이미지는 고품질 WebP 포맷으로 제공됩니다</p>
                    </div>
                </div>
            )}
        </div>
    )
}

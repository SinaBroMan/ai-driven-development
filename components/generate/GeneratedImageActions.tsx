'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
    Download, 
    Save, 
    Share2, 
    Heart, 
    Copy, 
    Check, 
    Loader2,
    Star,
    Globe,
    Info,
    Sparkles
} from 'lucide-react'
import { IGeneratedImageActionsProps } from '@/types'
import { useToast } from '@/hooks/use-toast'
import { mockSaveToGallery, mockShareToCommunity } from '@/utils/mockData'

export function GeneratedImageActions({
    imageUrl,
    prompt,
    styleOptions
}: IGeneratedImageActionsProps) {
    const { toast } = useToast()
    const [isSaving, setIsSaving] = useState(false)
    const [isSharing, setIsSharing] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    const handleSave = async () => {
        try {
            setIsSaving(true)
            const result = await mockSaveToGallery(imageUrl, prompt, styleOptions)
            
            if (result.success) {
                toast({
                    title: '갤러리 저장 완료',
                    description: '이미지가 성공적으로 갤러리에 저장되었습니다.'
                })
            } else {
                throw new Error(result.error || '저장에 실패했습니다.')
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '저장 중 오류가 발생했습니다.'
            toast({
                variant: 'destructive',
                title: '저장 실패',
                description: errorMessage
            })
        } finally {
            setIsSaving(false)
        }
    }

    const handleShare = async () => {
        try {
            setIsSharing(true)
            const result = await mockShareToCommunity(imageUrl, prompt, styleOptions)
            
            if (result.success) {
                toast({
                    title: '커뮤니티 공유 완료',
                    description: '이미지가 커뮤니티에 공유되었습니다.'
                })
            } else {
                throw new Error(result.error || '공유에 실패했습니다.')
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '공유 중 오류가 발생했습니다.'
            toast({
                variant: 'destructive',
                title: '공유 실패',
                description: errorMessage
            })
        } finally {
            setIsSharing(false)
        }
    }

    const handleDownload = async () => {
        try {
            setIsDownloading(true)
            
            // 이미지 URL에서 Blob 가져오기
            const response = await fetch(imageUrl)
            const blob = await response.blob()

            // Blob URL 생성
            const blobUrl = window.URL.createObjectURL(blob)

            // 다운로드 링크 생성 및 클릭
            const link = document.createElement('a')
            link.href = blobUrl

            // 파일명 생성 (현재 시간 기준)
            const timestamp = new Date().getTime()
            const styleText = `${styleOptions.artStyle}_${styleOptions.colorTone}`
            link.download = `artify-${styleText}-${timestamp}.jpg`

            // 링크 클릭하여 다운로드 시작
            document.body.appendChild(link)
            link.click()

            // cleanup
            document.body.removeChild(link)
            window.URL.revokeObjectURL(blobUrl)

            toast({
                title: '다운로드 완료',
                description: '이미지가 성공적으로 다운로드되었습니다.'
            })
        } catch (error) {
            console.error('Download error:', error)
            toast({
                variant: 'destructive',
                title: '다운로드 실패',
                description: '이미지 다운로드 중 오류가 발생했습니다.'
            })
        } finally {
            setIsDownloading(false)
        }
    }

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(imageUrl)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
            
            toast({
                title: '링크 복사 완료',
                description: '이미지 링크가 클립보드에 복사되었습니다.'
            })
        } catch (error) {
            toast({
                variant: 'destructive',
                title: '복사 실패',
                description: '링크 복사 중 오류가 발생했습니다.'
            })
        }
    }

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-200 mb-2 flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5 text-pink-400" />
                    이미지 관리
                </h3>
                <p className="text-sm text-gray-400">
                    생성된 이미지를 저장하거나 공유해보세요
                </p>
            </div>

            {/* 메인 액션 버튼들 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white h-12 font-medium shadow-lg transition-all duration-200 hover:scale-105 disabled:transform-none"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            저장 중...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            갤러리에 저장
                        </>
                    )}
                </Button>
                
                <Button
                    onClick={handleShare}
                    disabled={isSharing}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-12 font-medium shadow-lg transition-all duration-200 hover:scale-105 disabled:transform-none"
                >
                    {isSharing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            공유 중...
                        </>
                    ) : (
                        <>
                            <Globe className="mr-2 h-4 w-4" />
                            커뮤니티 공유
                        </>
                    )}
                </Button>
                
                <Button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white h-12 font-medium shadow-lg transition-all duration-200 hover:scale-105 disabled:transform-none"
                >
                    {isDownloading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            다운로드 중...
                        </>
                    ) : (
                        <>
                            <Download className="mr-2 h-4 w-4" />
                            다운로드
                        </>
                    )}
                </Button>
            </div>

            {/* 추가 옵션 */}
            <div className="flex gap-2">
                <Button
                    onClick={handleCopyUrl}
                    variant="outline"
                    size="sm"
                    className="bg-gray-800/50 border-purple-600/30 text-gray-300 hover:bg-purple-600/10"
                >
                    {isCopied ? (
                        <>
                            <Check className="mr-2 h-3 w-3 text-green-400" />
                            복사됨
                        </>
                    ) : (
                        <>
                            <Copy className="mr-2 h-3 w-3" />
                            링크 복사
                        </>
                    )}
                </Button>
                
                <Button
                    onClick={() => setShowDetails(!showDetails)}
                    variant="outline"
                    size="sm"
                    className="bg-gray-800/50 border-purple-600/30 text-gray-300 hover:bg-purple-600/10"
                >
                    <Info className="mr-2 h-3 w-3" />
                    {showDetails ? '상세정보 숨기기' : '상세정보 보기'}
                </Button>
            </div>

            {/* 상세 정보 */}
            {showDetails && (
                <div className="bg-gray-800/30 border border-purple-600/20 rounded-lg p-4 space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <h4 className="text-sm font-medium text-gray-200">생성 정보</h4>
                    </div>
                    
                    <div className="space-y-3">
                        {/* 프롬프트 */}
                        <div>
                            <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                프롬프트
                            </label>
                            <p className="text-sm text-gray-300 bg-gray-900/50 rounded p-2 mt-1">
                                &quot;{prompt}&quot;
                            </p>
                        </div>
                        
                        {/* 스타일 옵션 */}
                        <div>
                            <label className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2 block">
                                스타일 옵션
                            </label>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="bg-purple-600/10 border-purple-600/30 text-purple-300">
                                    <Star className="w-3 h-3 mr-1" />
                                    {styleOptions.artStyle}
                                </Badge>
                                <Badge variant="outline" className="bg-blue-600/10 border-blue-600/30 text-blue-300">
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    {styleOptions.colorTone}
                                </Badge>
                            </div>
                        </div>
                        
                        {/* 이미지 정보 */}
                        <div>
                            <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                이미지 정보
                            </label>
                            <div className="text-sm text-gray-300 mt-1 space-y-1">
                                <p>• 포맷: WebP (고품질)</p>
                                <p>• 해상도: 512 x 512 픽셀</p>
                                <p>• 생성 시간: {new Date().toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 안내 메시지 */}
            <Alert className="bg-blue-500/10 border-blue-500/30">
                <Info className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-300">
                    <strong>팁:</strong> 갤러리에 저장하면 개인 컬렉션에서 언제든 다시 볼 수 있고, 
                    커뮤니티에 공유하면 다른 사용자들과 작품을 공유할 수 있습니다.
                </AlertDescription>
            </Alert>
        </div>
    )
}

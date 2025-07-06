'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { StyleOptions } from './StyleOptions'
import { ImageGeneration } from './ImageGeneration'
import { GeneratedImageActions } from './GeneratedImageActions'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { IStyleOptions, IPopularPrompt, IGenerationHistoryItem } from '@/types'
import { useToast } from '@/hooks/use-toast'
import { 
    mockGenerateImage, 
    mockPromptSuggestions, 
    mockPopularPrompts,
    mockGenerationHistory 
} from '@/utils/mockData'
import { 
    Lightbulb, 
    TrendingUp, 
    Clock, 
    Shuffle, 
    Sparkles,
    ChevronDown,
    ChevronUp 
} from 'lucide-react'

const DEFAULT_STYLE_OPTIONS: IStyleOptions = {
    artStyle: '디지털아트',
    colorTone: '밝은'
}

export function GenerateImageForm() {
    const { toast } = useToast()
    const searchParams = useSearchParams()
    const [prompt, setPrompt] = useState('')
    const [error, setError] = useState('')
    const [styleOptions, setStyleOptions] = useState<IStyleOptions>(DEFAULT_STYLE_OPTIONS)
    const [generatedImageUrl, setGeneratedImageUrl] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [showPopular, setShowPopular] = useState(false)
    const [showHistory, setShowHistory] = useState(false)

    useEffect(() => {
        const urlPrompt = searchParams.get('prompt')
        if (urlPrompt) {
            setPrompt(decodeURIComponent(urlPrompt))
        }
    }, [searchParams])

    const handlePromptChange = (value: string) => {
        setPrompt(value)
        if (value.length > 500) {
            setError('500자 이내로 입력해 주세요')
        } else {
            setError('')
        }
    }

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('프롬프트를 입력해 주세요')
            return
        }

        if (prompt.length > 500) {
            setError('500자 이내로 입력해 주세요')
            return
        }

        try {
            setIsGenerating(true)
            setError('')

            const result = await mockGenerateImage(prompt, styleOptions)

            if (result.success) {
                setGeneratedImageUrl(result.imageUrl!)
                toast({
                    title: '이미지 생성 완료',
                    description: '이미지가 성공적으로 생성되었습니다.'
                })
            } else {
                throw new Error(result.error || '이미지 생성에 실패했습니다')
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : '이미지 생성 중 오류가 발생했습니다'
            setError(errorMessage)
            toast({
                variant: 'destructive',
                title: '생성 실패',
                description: errorMessage
            })
        } finally {
            setIsGenerating(false)
        }
    }

    const handleSuggestionClick = (suggestion: string) => {
        setPrompt(suggestion)
        setShowSuggestions(false)
    }

    const handlePopularClick = (popularPrompt: IPopularPrompt) => {
        setPrompt(popularPrompt.prompt)
        setStyleOptions({
            artStyle: popularPrompt.style as IStyleOptions['artStyle'],
            colorTone: popularPrompt.colorTone as IStyleOptions['colorTone']
        })
        setShowPopular(false)
    }

    const handleHistoryClick = (historyItem: IGenerationHistoryItem) => {
        setPrompt(historyItem.prompt)
        setStyleOptions({
            artStyle: historyItem.style as IStyleOptions['artStyle'],
            colorTone: historyItem.colorTone as IStyleOptions['colorTone']
        })
        setShowHistory(false)
    }

    const getRandomSuggestion = () => {
        const randomIndex = Math.floor(Math.random() * mockPromptSuggestions.length)
        setPrompt(mockPromptSuggestions[randomIndex])
    }

    return (
        <div className="space-y-8">
            {/* 프롬프트 입력 섹션 */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="block text-lg font-semibold text-gray-200">
                        프롬프트 입력
                    </label>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={getRandomSuggestion}
                            className="bg-gray-800/50 border-purple-600/30 text-purple-400 hover:bg-purple-600/10"
                        >
                            <Shuffle className="w-4 h-4 mr-1" />
                            랜덤
                        </Button>
                    </div>
                </div>
                
                <Textarea
                    value={prompt}
                    onChange={e => handlePromptChange(e.target.value)}
                    placeholder="생성하고 싶은 이미지를 자세히 설명해주세요..."
                    className="min-h-[120px] bg-gray-900/50 border-purple-600/30 
                             text-gray-200 placeholder-gray-400 
                             focus:border-purple-500 focus:ring-purple-500/30
                             resize-none text-base"
                    disabled={isGenerating}
                />
                
                <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>{prompt.length}/500자</span>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowSuggestions(!showSuggestions)}
                            className="text-purple-400 hover:text-purple-300"
                        >
                            <Lightbulb className="w-4 h-4 mr-1" />
                            제안
                            {showSuggestions ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPopular(!showPopular)}
                            className="text-purple-400 hover:text-purple-300"
                        >
                            <TrendingUp className="w-4 h-4 mr-1" />
                            인기
                            {showPopular ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowHistory(!showHistory)}
                            className="text-purple-400 hover:text-purple-300"
                        >
                            <Clock className="w-4 h-4 mr-1" />
                            히스토리
                            {showHistory ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                        </Button>
                    </div>
                </div>

                {error && (
                    <Alert variant="destructive" className="bg-red-500/10 border-red-500/50">
                        <AlertDescription className="text-red-400">
                            {error}
                        </AlertDescription>
                    </Alert>
                )}
            </div>

            {/* 제안 목록 */}
            {showSuggestions && (
                <div className="bg-gray-900/30 backdrop-blur-sm border border-purple-600/20 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-purple-400" />
                        프롬프트 제안
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {mockPromptSuggestions.map((suggestion, index) => (
                            <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="justify-start text-left h-auto p-3 text-gray-300 hover:bg-purple-600/10 hover:text-purple-300"
                            >
                                <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
                                {suggestion}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {/* 인기 프롬프트 */}
            {showPopular && (
                <div className="bg-gray-900/30 backdrop-blur-sm border border-purple-600/20 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        인기 프롬프트
                    </h3>
                    <div className="space-y-2">
                        {mockPopularPrompts.map((item, index) => (
                            <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePopularClick(item)}
                                className="justify-start text-left h-auto p-3 text-gray-300 hover:bg-purple-600/10 hover:text-purple-300 w-full"
                            >
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center">
                                        <TrendingUp className="w-4 h-4 mr-2 text-purple-400" />
                                        <span>{item.prompt}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <span>{item.style}</span>
                                        <span>·</span>
                                        <span>{item.colorTone}</span>
                                        <span>·</span>
                                        <span>{item.count}회</span>
                                    </div>
                                </div>
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {/* 생성 히스토리 */}
            {showHistory && (
                <div className="bg-gray-900/30 backdrop-blur-sm border border-purple-600/20 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-400" />
                        생성 히스토리
                    </h3>
                    <div className="space-y-2">
                        {mockGenerationHistory.map((item, index) => (
                            <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                onClick={() => handleHistoryClick(item)}
                                className="justify-start text-left h-auto p-3 text-gray-300 hover:bg-purple-600/10 hover:text-purple-300 w-full"
                            >
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-2 text-purple-400" />
                                        <span>{item.prompt}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <span>{item.style}</span>
                                        <span>·</span>
                                        <span>{item.colorTone}</span>
                                        <span>·</span>
                                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            <div className="space-y-6">
                {/* 스타일 옵션 섹션 */}
                <div className="relative">
                    <div className="absolute inset-0 bg-purple-600/5 blur-lg rounded-lg"></div>
                    <div className="relative bg-gray-900/30 backdrop-blur-sm border border-purple-600/20 rounded-lg p-6">
                        <StyleOptions
                            options={styleOptions}
                            onChange={setStyleOptions}
                        />
                    </div>
                </div>

                {/* 이미지 생성 섹션 */}
                <div className="relative">
                    <div className="absolute inset-0 bg-purple-600/5 blur-lg rounded-lg"></div>
                    <div className="relative bg-gray-900/30 backdrop-blur-sm border border-purple-600/20 rounded-lg p-6">
                        <ImageGeneration
                            onGenerate={handleGenerate}
                            isGenerating={isGenerating}
                            generatedImageUrl={generatedImageUrl}
                        />
                    </div>
                </div>

                {/* 생성된 이미지 액션 섹션 */}
                {generatedImageUrl && (
                    <div className="relative">
                        <div className="absolute inset-0 bg-purple-600/5 blur-lg rounded-lg"></div>
                        <div className="relative bg-gray-900/30 backdrop-blur-sm border border-purple-600/20 rounded-lg p-6">
                            <GeneratedImageActions
                                imageUrl={generatedImageUrl}
                                prompt={prompt}
                                styleOptions={styleOptions}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

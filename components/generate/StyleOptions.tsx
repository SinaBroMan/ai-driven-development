'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
    SelectSeparator
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
    IStyleOptions, 
    IStyleOptionsProps, 
    IArtStyleConfig, 
    IColorToneConfig, 
    IPopularCombination 
} from '@/types'
import { 
    Palette, 
    Sparkles, 
    Image, 
    Layers, 
    Zap,
    Star,
    Award,
    Crown,
    Gem,
    RefreshCw
} from 'lucide-react'

// 스타일 옵션에 대한 설명과 아이콘 매핑
const artStyleConfig: Record<string, IArtStyleConfig> = {
    디지털아트: {
        icon: Sparkles,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        description: '고해상도 디지털 아트워크'
    },
    수채화: {
        icon: Palette,
        color: 'text-green-400',
        bgColor: 'bg-green-500/10',
        description: '부드러운 수채화 스타일'
    },
    유화: {
        icon: Layers,
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/10',
        description: '풍부한 질감의 유화 스타일'
    },
    펜화: {
        icon: Image,
        color: 'text-gray-400',
        bgColor: 'bg-gray-500/10',
        description: '섬세한 펜과 잉크 드로잉'
    },
    연필화: {
        icon: Zap,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        description: '세밀한 연필 스케치'
    },
    로고_미니멀: {
        icon: Star,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/10',
        description: '깔끔한 미니멀 로고'
    },
    로고_3D: {
        icon: Award,
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-500/10',
        description: '입체적인 3D 로고'
    },
    로고_그라디언트: {
        icon: Crown,
        color: 'text-pink-400',
        bgColor: 'bg-pink-500/10',
        description: '그라디언트 로고'
    },
    로고_빈티지: {
        icon: Gem,
        color: 'text-amber-400',
        bgColor: 'bg-amber-500/10',
        description: '레트로 빈티지 로고'
    },
    로고_모던: {
        icon: RefreshCw,
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/10',
        description: '모던한 로고 디자인'
    }
}

const colorToneConfig: Record<string, IColorToneConfig> = {
    밝은: {
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        description: '밝고 생생한 색상'
    },
    어두운: {
        color: 'text-gray-400',
        bgColor: 'bg-gray-500/10',
        description: '어둡고 무드있는 색상'
    },
    파스텔: {
        color: 'text-pink-400',
        bgColor: 'bg-pink-500/10',
        description: '부드러운 파스텔 톤'
    },
    흑백: {
        color: 'text-slate-400',
        bgColor: 'bg-slate-500/10',
        description: '클래식한 흑백'
    },
    컬러풀: {
        color: 'text-rainbow-400',
        bgColor: 'bg-gradient-to-r from-red-500/10 to-blue-500/10',
        description: '화려한 컬러풀'
    },
    모노톤: {
        color: 'text-zinc-400',
        bgColor: 'bg-zinc-500/10',
        description: '세련된 모노톤'
    },
    메탈릭: {
        color: 'text-violet-400',
        bgColor: 'bg-violet-500/10',
        description: '고급스러운 메탈릭'
    }
}

// 인기 스타일 조합 추천
const popularCombinations: IPopularCombination[] = [
    { artStyle: '디지털아트', colorTone: '밝은', label: '생생한 디지털아트' },
    { artStyle: '수채화', colorTone: '파스텔', label: '몽환적인 수채화' },
    { artStyle: '로고_미니멀', colorTone: '모노톤', label: '세련된 로고' },
    { artStyle: '유화', colorTone: '어두운', label: '클래식한 유화' },
    { artStyle: '로고_3D', colorTone: '메탈릭', label: '프리미엄 로고' }
]

export function StyleOptions({ options, onChange }: IStyleOptionsProps) {
    const handleChange = (key: keyof IStyleOptions, value: string) => {
        onChange({ ...options, [key]: value })
    }

    const handleCombinationClick = (combination: IPopularCombination) => {
        onChange({
            artStyle: combination.artStyle as IStyleOptions['artStyle'],
            colorTone: combination.colorTone as IStyleOptions['colorTone']
        })
    }

    const currentArtStyle = artStyleConfig[options.artStyle as keyof typeof artStyleConfig]
    const currentColorTone = colorToneConfig[options.colorTone as keyof typeof colorToneConfig]

    return (
        <div className="space-y-8">
            {/* 헤더 */}
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-200 mb-2 flex items-center justify-center gap-2">
                    <Palette className="w-5 h-5 text-purple-400" />
                    스타일 옵션
                </h3>
                <p className="text-sm text-gray-400">
                    원하는 스타일과 색감을 선택하여 이미지를 커스터마이징하세요
                </p>
            </div>

            {/* 현재 선택된 스타일 미리보기 */}
            <div className="grid grid-cols-2 gap-4">
                                    <div className={`${currentArtStyle.bgColor} border border-purple-600/20 rounded-lg p-4`}>
                        <div className="flex items-center gap-2 mb-2">
                            {(() => {
                                const IconComponent = currentArtStyle.icon;
                                return <IconComponent className={`w-5 h-5 ${currentArtStyle.color}`} />;
                            })()}
                            <span className="text-sm font-medium text-gray-200">아트 스타일</span>
                        </div>
                    <p className="text-lg font-semibold text-gray-100 mb-1">
                        {options.artStyle}
                    </p>
                    <p className="text-xs text-gray-400">
                        {currentArtStyle.description}
                    </p>
                </div>

                <div className={`${currentColorTone.bgColor} border border-purple-600/20 rounded-lg p-4`}>
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className={`w-5 h-5 ${currentColorTone.color}`} />
                        <span className="text-sm font-medium text-gray-200">색감</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-100 mb-1">
                        {options.colorTone}
                    </p>
                    <p className="text-xs text-gray-400">
                        {currentColorTone.description}
                    </p>
                </div>
            </div>

            {/* 스타일 선택 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 아트 스타일 선택 */}
                <div className="space-y-4">
                    <label className="block text-base font-medium text-gray-200 flex items-center gap-2">
                        <Image className="w-4 h-4 text-purple-400" />
                        아트 스타일
                    </label>
                    <Select
                        value={options.artStyle}
                        onValueChange={value => handleChange('artStyle', value)}
                    >
                        <SelectTrigger className="bg-gray-900/50 border-purple-600/30 text-gray-200 h-12">
                            <SelectValue placeholder="스타일을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900/95 border-purple-600/30 backdrop-blur-sm">
                            <SelectGroup>
                                <SelectLabel className="text-gray-400 font-medium">
                                    일반 스타일
                                </SelectLabel>
                                {Object.entries(artStyleConfig).slice(0, 5).map(([key, config]) => {
                                    const IconComponent = config.icon;
                                    return (
                                        <SelectItem
                                            key={key}
                                            value={key}
                                            className="text-gray-200 cursor-pointer hover:bg-purple-600/10"
                                        >
                                            <div className="flex items-center gap-2">
                                                <IconComponent className={`w-4 h-4 ${config.color}`} />
                                                <span>{key}</span>
                                            </div>
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                            <SelectSeparator className="bg-purple-600/20" />
                            <SelectGroup>
                                <SelectLabel className="text-gray-400 font-medium">
                                    로고 스타일
                                </SelectLabel>
                                {Object.entries(artStyleConfig).slice(5).map(([key, config]) => {
                                    const IconComponent = config.icon;
                                    return (
                                        <SelectItem
                                            key={key}
                                            value={key}
                                            className="text-gray-200 cursor-pointer hover:bg-purple-600/10"
                                        >
                                            <div className="flex items-center gap-2">
                                                <IconComponent className={`w-4 h-4 ${config.color}`} />
                                                <span>{key.replace('로고_', '')}</span>
                                            </div>
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* 색감 선택 */}
                <div className="space-y-4">
                    <label className="block text-base font-medium text-gray-200 flex items-center gap-2">
                        <Palette className="w-4 h-4 text-purple-400" />
                        색감
                    </label>
                    <Select
                        value={options.colorTone}
                        onValueChange={value => handleChange('colorTone', value)}
                    >
                        <SelectTrigger className="bg-gray-900/50 border-purple-600/30 text-gray-200 h-12">
                            <SelectValue placeholder="색감을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900/95 border-purple-600/30 backdrop-blur-sm">
                            <SelectGroup>
                                <SelectLabel className="text-gray-400 font-medium">
                                    일반 색감
                                </SelectLabel>
                                {Object.entries(colorToneConfig).slice(0, 5).map(([key, config]) => {
                                    return (
                                        <SelectItem
                                            key={key}
                                            value={key}
                                            className="text-gray-200 cursor-pointer hover:bg-purple-600/10"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className={`w-4 h-4 rounded-full ${config.bgColor} border border-gray-600`}></div>
                                                <span>{key}</span>
                                            </div>
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                            <SelectSeparator className="bg-purple-600/20" />
                            <SelectGroup>
                                <SelectLabel className="text-gray-400 font-medium">
                                    로고 색감
                                </SelectLabel>
                                {Object.entries(colorToneConfig).slice(5).map(([key, config]) => {
                                    return (
                                        <SelectItem
                                            key={key}
                                            value={key}
                                            className="text-gray-200 cursor-pointer hover:bg-purple-600/10"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className={`w-4 h-4 rounded-full ${config.bgColor} border border-gray-600`}></div>
                                                <span>{key}</span>
                                            </div>
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* 인기 조합 추천 */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-purple-400" />
                    <h4 className="text-sm font-medium text-gray-200">인기 조합</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                    {popularCombinations.map((combination, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleCombinationClick(combination)}
                            className="bg-gray-800/50 border-purple-600/30 text-gray-300 hover:bg-purple-600/10 hover:border-purple-500/50"
                        >
                            <Star className="w-3 h-3 mr-1 text-purple-400" />
                            {combination.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* 스타일 정보 */}
            <div className="bg-gray-800/30 border border-purple-600/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <h4 className="text-sm font-medium text-gray-200">선택된 스타일</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-purple-600/10 border-purple-600/30 text-purple-300">
                        {options.artStyle}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-600/10 border-blue-600/30 text-blue-300">
                        {options.colorTone}
                    </Badge>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                    선택한 스타일과 색감이 AI 이미지 생성에 적용됩니다.
                </p>
            </div>
        </div>
    )
}

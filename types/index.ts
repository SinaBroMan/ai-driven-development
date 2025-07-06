export interface IPost {
    postId: string
    imageURL: string
    userName: string
    likes: number
    comments: number
    isLiked?: boolean
    prompt?: string
    createdAt?: string
    userProfile?: string
}

export interface IComment {
    id: string
    postId: string
    userName: string
    content: string
    createdAt: string
    userProfile?: string
}

export interface IGenerateImageResponse {
    success: boolean
    imageURL: string
}

// CommentsModal props interface
export interface ICommentsModalProps {
    postId: string
    isOpen: boolean
    onClose: () => void
}

// CommunityFeedCard props interface
export interface ICommunityFeedCardProps {
    post: IPost
}

// StyleOptions props interface
export interface IStyleOptionsProps {
    options: IStyleOptions
    onChange: (options: IStyleOptions) => void
}

// ImageGeneration props interface
export interface IImageGenerationProps {
    onGenerate: () => void
    isGenerating: boolean
    generatedImageUrl: string
}

// GeneratedImageActions props interface
export interface IGeneratedImageActionsProps {
    imageUrl: string
    prompt: string
    styleOptions: IStyleOptions
}

export interface IStyleOptions {
    artStyle:
        | '디지털아트'
        | '수채화'
        | '유화'
        | '펜화'
        | '연필화'
        | '로고_미니멀'
        | '로고_3D'
        | '로고_그라디언트'
        | '로고_빈티지'
        | '로고_모던'
    colorTone:
        | '밝은'
        | '어두운'
        | '파스텔'
        | '흑백'
        | '컬러풀'
        | '모노톤'
        | '메탈릭'
}

export interface IGalleryImage {
    id: string
    userId: string
    imageUrl: string
    prompt: string
    styleOptions: {
        artStyle: string
        colorTone: string
    }
    tags: string[]
    isPublic: boolean
    createdAt: string
    updatedAt: string
}

import { DateRange as DayPickerDateRange } from 'react-day-picker'
export type DateRange = DayPickerDateRange

// GalleryCard props interface
export interface IGalleryCardProps {
    image: IGalleryImage
    onImageClick: () => void
    onShareClick: () => void
    onDelete: (imageId: string) => void
}

// ImageDetailModal props interface
export interface IImageDetailModalProps {
    image: IGalleryImage
    isOpen: boolean
    onClose: () => void
}

// ShareModal props interface
export interface IShareModalProps {
    image: IGalleryImage
    isOpen: boolean
    onClose: () => void
}

// 기존 인터페이스에 추가
export interface IGenerateRequest {
    prompt: string
    styleOptions: {
        artStyle: string
        colorTone: string
    }
}

export interface IGenerateResponse {
    success: boolean
    imageUrl: string
    error?: {
        code: string
        message: string
    }
}

export interface IErrorResponse {
    success: false
    error: {
        code: string
        message: string
    }
}

export interface INavigationItem {
    name: string
    href: string
}

export interface IPopularPrompt {
    prompt: string
    count: number
    style: string
    colorTone: string
}

export interface IGenerationHistoryItem {
    id: string
    prompt: string
    imageUrl: string
    style: string
    colorTone: string
    createdAt: string
}

// StyleOptions 관련 타입들
export interface IArtStyleConfig {
    icon: any
    color: string
    bgColor: string
    description: string
}

export interface IColorToneConfig {
    color: string
    bgColor: string
    description: string
}

export interface IPopularCombination {
    artStyle: string
    colorTone: string
    label: string
}

export interface IGalleryQuery {
    page: number
    limit: number
    artStyle?: string
    colorTone?: string
    startDate?: string
    endDate?: string
    sortBy?: 'latest' | 'oldest'
    isPublic?: boolean
}

export interface IGalleryResponse {
    images: IGalleryImage[]
    totalCount: number
    hasMore: boolean
}

export interface IUpdateImageRequest {
    tags?: string[]
    isPublic?: boolean
}

export interface IUpdateImageResponse {
    success: boolean
    image?: IGalleryImage
    error?: {
        code: string
        message: string
    }
}

export interface ISharePostRequest {
    imageId: number
    title: string
    description: string
    tags: string[]
}

export interface ISharePostResponse {
    success: boolean
    post?: {
        id: number
        imageId: number
        userId: string
        title: string
        description: string | null
        createdAt: Date
        updatedAt: Date
    }
    error?: {
        code: string
        message: string
    }
}

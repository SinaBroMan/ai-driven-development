import { NextRequest, NextResponse } from 'next/server'
import { mockPosts } from '@/utils/mockData'

// 임시 좋아요 상태를 저장할 메모리 저장소 (실제 환경에서는 데이터베이스 사용)
const likeStates = new Map<string, boolean>()

export async function POST(
    req: NextRequest,
    { params }: { params: { postId: string } }
) {
    try {
        const postId = params.postId

        // 게시물 존재 여부 확인
        const post = mockPosts.find(p => p.postId === postId)
        if (!post) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'POST_NOT_FOUND',
                        message: '게시물을 찾을 수 없습니다.'
                    }
                },
                { status: 404 }
            )
        }

        // 좋아요 상태 토글
        const userId = 'dev-user' // 개발 모드에서는 고정 사용자 ID
        const likeKey = `${postId}-${userId}`
        const currentLiked = likeStates.get(likeKey) || false
        const newLiked = !currentLiked
        
        likeStates.set(likeKey, newLiked)

        // 좋아요 수 계산 (기본값 + 토글된 상태)
        const baseLikes = post.likes
        const adjustedLikes = newLiked ? baseLikes + 1 : baseLikes

        return NextResponse.json({
            success: true,
            likes: adjustedLikes,
            isLiked: newLiked
        })
    } catch (error) {
        console.error('좋아요 처리 중 오류 발생:', error)
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_SERVER_ERROR',
                    message: '서버 내부 오류가 발생했습니다.'
                }
            },
            { status: 500 }
        )
    }
}

export async function GET(
    req: NextRequest,
    { params }: { params: { postId: string } }
) {
    try {
        const postId = params.postId

        // 게시물 존재 여부 확인
        const post = mockPosts.find(p => p.postId === postId)
        if (!post) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'POST_NOT_FOUND',
                        message: '게시물을 찾을 수 없습니다.'
                    }
                },
                { status: 404 }
            )
        }

        // 좋아요 상태 확인
        const userId = 'dev-user'
        const likeKey = `${postId}-${userId}`
        const isLiked = likeStates.get(likeKey) || false

        // 좋아요 수 계산
        const baseLikes = post.likes
        const adjustedLikes = isLiked ? baseLikes + 1 : baseLikes

        return NextResponse.json({
            success: true,
            likes: adjustedLikes,
            isLiked
        })
    } catch (error) {
        console.error('좋아요 상태 조회 중 오류 발생:', error)
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_SERVER_ERROR',
                    message: '서버 내부 오류가 발생했습니다.'
                }
            },
            { status: 500 }
        )
    }
}

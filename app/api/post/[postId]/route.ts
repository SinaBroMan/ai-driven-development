import { NextRequest, NextResponse } from 'next/server'
import { mockPosts } from '@/utils/mockData'

export async function GET(
    request: NextRequest,
    { params }: { params: { postId: string } }
) {
    try {
        const postId = params.postId

        // 목업 데이터에서 게시물 찾기
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

        // 추가 정보와 함께 게시물 반환
        const detailedPost = {
            ...post,
            title: `${post.userName}님의 AI 작품`,
            description: `${post.prompt || 'AI로 생성된 이미지'}`,
            userProfile: `https://picsum.photos/50/50?random=${post.postId}`,
            createdAt: new Date(Date.now() - parseInt(post.postId) * 3600000).toISOString()
        }

        return NextResponse.json({
            success: true,
            post: detailedPost
        })
    } catch (error) {
        console.error('Post detail error:', error)
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

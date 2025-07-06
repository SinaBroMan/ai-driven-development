import { NextRequest, NextResponse } from 'next/server'
import { mockComments } from '@/utils/mockData'

// 임시 댓글 저장소 (실제 환경에서는 데이터베이스 사용)
const commentsStore = new Map<string, {
    id: string;
    postId: string;
    userName: string;
    userProfile: string;
    content: string;
    createdAt: string;
}[]>()

// 댓글 목록 조회
export async function GET(
    request: NextRequest,
    { params }: { params: { postId: string } }
) {
    try {
        const postId = params.postId

        // 해당 게시물의 댓글 조회 (기본 목업 데이터 + 동적 댓글)
        const baseComments = mockComments.filter(comment => comment.postId === postId)
        const dynamicComments = commentsStore.get(postId) || []
        
        const allComments = [...baseComments, ...dynamicComments].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )

        return NextResponse.json({
            success: true,
            comments: allComments
        })
    } catch (error) {
        console.error('Comments fetch error:', error)
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'COMMENTS_FETCH_ERROR',
                    message: '댓글을 불러오는 중 오류가 발생했습니다.'
                }
            },
            { status: 500 }
        )
    }
}

// 새 댓글 작성
export async function POST(
    request: NextRequest,
    { params }: { params: { postId: string } }
) {
    try {
        const postId = params.postId

        // 요청 데이터 파싱
        const { content } = await request.json()

        // 입력값 검증
        if (!content || content.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'INVALID_CONTENT',
                        message: '댓글 내용이 누락되었거나 너무 깁니다.'
                    }
                },
                { status: 400 }
            )
        }

        // 새 댓글 생성
        const newComment = {
            id: Date.now().toString(),
            postId,
            userName: '개발자',
            userProfile: 'https://picsum.photos/40/40?random=dev',
            content,
            createdAt: new Date().toISOString()
        }

        // 댓글 저장소에 추가
        const existingComments = commentsStore.get(postId) || []
        commentsStore.set(postId, [newComment, ...existingComments])

        return NextResponse.json({
            success: true,
            comment: newComment
        })
    } catch (error) {
        console.error('Comment creation error:', error)
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'COMMENT_CREATION_ERROR',
                    message: '댓글 작성 중 오류가 발생했습니다.'
                }
            },
            { status: 500 }
        )
    }
}

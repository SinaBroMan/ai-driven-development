import { NextRequest, NextResponse } from 'next/server'
import { mockPosts } from '@/utils/mockData'

export const dynamic = 'force-dynamic'

const DEFAULT_PAGE_SIZE = 12

export async function GET(request: NextRequest) {
    try {
        // URL 파라미터 파싱
        const searchParams = request.nextUrl.searchParams
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(
            searchParams.get('limit') || String(DEFAULT_PAGE_SIZE)
        )
        const sortBy = searchParams.get('sortBy') || 'latest'

        // 목업 데이터에서 페이지네이션 적용
        const offset = (page - 1) * limit
        const sortedPosts = sortBy === 'oldest' ? [...mockPosts].reverse() : [...mockPosts]
        const paginatedPosts = sortedPosts.slice(offset, offset + limit)

        // 각 포스트에 추가 정보 추가
        const formattedPosts = paginatedPosts.map((post, index) => ({
            ...post,
            isLiked: index % 3 === 0, // 임의로 일부 게시물을 좋아요 상태로 설정
            prompt: `AI로 생성된 ${post.userName}의 창작물`,
            createdAt: new Date(Date.now() - index * 3600000).toISOString(),
            userProfile: `https://picsum.photos/50/50?random=${post.postId}`
        }))

        const totalCount = mockPosts.length
        const hasMore = totalCount > page * limit

        return NextResponse.json({
            success: true,
            posts: formattedPosts,
            totalCount,
            hasMore
        })
    } catch (error) {
        console.error('Community feed error:', error)
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'FEED_ERROR',
                    message: '커뮤니티 피드를 불러오는 중 오류가 발생했습니다.'
                }
            },
            { status: 500 }
        )
    }
}

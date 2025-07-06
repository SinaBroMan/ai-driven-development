import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const { imageId, title, description } = await request.json()
        
        // 목업 처리
        console.log('Community share:', { imageId, title, description })
        
        return NextResponse.json({
            success: true,
            message: '커뮤니티에 공유되었습니다.',
            postId: Math.floor(Math.random() * 1000).toString()
        })
    } catch (error) {
        console.error('Community share error:', error)
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'SHARE_ERROR',
                    message: '커뮤니티 공유 중 오류가 발생했습니다.'
                }
            },
            { status: 500 }
        )
    }
}

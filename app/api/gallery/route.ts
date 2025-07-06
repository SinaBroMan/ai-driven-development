import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        // 목업 갤러리 데이터
        const mockGalleryImages = [
            {
                id: '1',
                imageUrl: 'https://picsum.photos/400/400?random=1',
                prompt: '아름다운 풍경',
                createdAt: new Date().toISOString(),
                isPublic: false
            },
            {
                id: '2',
                imageUrl: 'https://picsum.photos/400/400?random=2',
                prompt: '현대적인 건물',
                createdAt: new Date().toISOString(),
                isPublic: true
            }
        ]

        return NextResponse.json({
            success: true,
            images: mockGalleryImages
        })
    } catch (error) {
        console.error('Gallery error:', error)
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'GALLERY_ERROR',
                    message: '갤러리를 불러오는 중 오류가 발생했습니다.'
                }
            },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const { imageId, isPublic } = await request.json()
        
        // 목업 처리
        console.log('Gallery item saved:', { imageId, isPublic })
        
        return NextResponse.json({
            success: true,
            message: '갤러리에 저장되었습니다.'
        })
    } catch (error) {
        console.error('Gallery save error:', error)
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'SAVE_ERROR',
                    message: '갤러리 저장 중 오류가 발생했습니다.'
                }
            },
            { status: 500 }
        )
    }
}

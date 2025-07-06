import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    { params }: { params: { imageId: string } }
) {
    try {
        const imageId = params.imageId

        // 목업 이미지 데이터
        const mockImage = {
            id: imageId,
            imageUrl: `https://picsum.photos/512/512?random=${imageId}`,
            prompt: 'AI로 생성된 이미지',
            artStyle: '디지털아트',
            colorTone: '밝은',
            isPublic: true,
            createdAt: new Date().toISOString()
        }

        return NextResponse.json({
            success: true,
            image: mockImage
        })
    } catch (error) {
        console.error('Gallery image error:', error)
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'IMAGE_ERROR',
                    message: '이미지를 불러오는 중 오류가 발생했습니다.'
                }
            },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { imageId: string } }
) {
    try {
        const imageId = params.imageId
        
        // 목업 처리
        console.log('Image deleted:', imageId)
        
        return NextResponse.json({
            success: true,
            message: '이미지가 삭제되었습니다.'
        })
    } catch (error) {
        console.error('Gallery delete error:', error)
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'DELETE_ERROR',
                    message: '이미지 삭제 중 오류가 발생했습니다.'
                }
            },
            { status: 500 }
        )
    }
}

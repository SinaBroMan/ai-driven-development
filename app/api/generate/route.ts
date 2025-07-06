import { NextRequest, NextResponse } from 'next/server'
import { IGenerateRequest, IGenerateResponse, IErrorResponse } from '@/types'

export async function POST(request: NextRequest) {
    try {
        // 요청 데이터 파싱
        const { prompt, styleOptions }: IGenerateRequest = await request.json()

        // 입력값 검증
        if (!prompt || prompt.length > 500) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'INVALID_PROMPT',
                        message: '프롬프트가 누락되었거나 길이가 초과되었습니다.'
                    }
                } as IErrorResponse,
                { status: 400 }
            )
        }

        // 이미지 생성 시뮬레이션 (3초 대기)
        await new Promise(resolve => setTimeout(resolve, 3000))

        // 90% 성공률로 시뮬레이션
        const isSuccess = Math.random() > 0.1

        if (!isSuccess) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'GENERATION_FAILED',
                        message: '이미지 생성에 실패했습니다. 다시 시도해주세요.'
                    }
                } as IErrorResponse,
                { status: 500 }
            )
        }

        // 목업 이미지 URL 생성
        const randomImageId = Math.floor(Math.random() * 1000) + 1
        const imageUrl = `https://picsum.photos/512/512?random=${randomImageId}`

        // 성공 응답
        return NextResponse.json({
            success: true,
            imageUrl
        } as IGenerateResponse)
    } catch (error) {
        console.error('Image generation error:', error)
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_SERVER_ERROR',
                    message: '서버 내부 오류가 발생했습니다.'
                }
            } as IErrorResponse,
            { status: 500 }
        )
    }
}

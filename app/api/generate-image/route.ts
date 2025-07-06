import { NextRequest, NextResponse } from 'next/server';

// 다양한 테마의 Unsplash 이미지 ID 풀
const unsplashImageIds = [
  'photo-1506905925346-21bda4d32df4', // 산맥
  'photo-1441974231531-c6227db76b6e', // 숲
  'photo-1472214103451-9374bd1c798e', // 바다
  'photo-1502134249126-9f3755a50d78', // 우주
  'photo-1514888286974-6c03e2ca1dba', // 고양이
  'photo-1583337130417-3346a1be7dee', // 강아지
  'photo-1470071459604-3b5ec3a7fe05', // 도시
  'photo-1518837695005-2083093ee35b', // 꽃
  'photo-1548199973-03cce0bbc87b', // 디저트
  'photo-1501594907352-04cda38ebc29', // 자동차
];

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    // 프롬프트 유효성 검사
    if (!prompt || prompt.trim() === '') {
      return NextResponse.json(
        { success: false, error: '프롬프트를 입력해 주세요.' },
        { status: 400 }
      );
    }

    // 실제 AI 이미지 생성 로직 대신 목업 데이터 반환
    // 랜덤 Unsplash 이미지 선택
    const randomImageId = unsplashImageIds[Math.floor(Math.random() * unsplashImageIds.length)];
    const imageURL = `https://images.unsplash.com/${randomImageId}?w=512&h=512&fit=crop&crop=center`;

    // 실제 AI 이미지 생성 시간을 시뮬레이션하기 위한 지연
    await new Promise(resolve => setTimeout(resolve, 2000));

    return NextResponse.json({
      success: true,
      imageURL,
      prompt: prompt.trim(),
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('이미지 생성 오류:', error);
    return NextResponse.json(
      { success: false, error: '이미지 생성에 실패했습니다. 다시 시도해 주세요.' },
      { status: 500 }
    );
  }
} 
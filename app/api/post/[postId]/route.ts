import { NextRequest, NextResponse } from 'next/server';
import { getPostById } from '@/lib/mockData';

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId;
    
    // 게시물 존재 여부 확인
    const post = getPostById(postId);
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: '게시물을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 상세 정보 추가 (실제 구현에서는 DB에서 조회)
    const detailPost = {
      ...post,
      views: Math.floor(Math.random() * 1000) + 100, // 임시 조회수
      description: `${post.prompt}을 AI로 표현해보았습니다. 정말 만족스러운 결과가 나왔어요!`,
      styleOptions: {
        style: 'photorealistic',
        mood: 'serene',
        lighting: 'natural',
        resolution: '512x512'
      }
    };

    return NextResponse.json({
      success: true,
      post: detailPost
    });
  } catch (error) {
    console.error('게시물 상세 정보 조회 오류:', error);
    return NextResponse.json(
      { success: false, error: '게시물 정보를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 
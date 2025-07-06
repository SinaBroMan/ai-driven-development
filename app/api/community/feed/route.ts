import { NextResponse } from 'next/server';
import { mockPosts } from '@/lib/mockData';

export async function GET() {
  try {
    // 실제 API에서는 데이터베이스에서 데이터를 가져오겠지만, 
    // 현재는 목업 데이터를 반환합니다
    return NextResponse.json({
      success: true,
      posts: mockPosts
    });
  } catch {
    return NextResponse.json(
      { success: false, error: '피드 데이터를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 
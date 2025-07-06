import { NextRequest, NextResponse } from 'next/server';
import { getCommentsByPostId, mockComments, Comment } from '@/lib/mockData';

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId;
    const comments = getCommentsByPostId(postId);

    return NextResponse.json({
      success: true,
      comments: comments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    });
  } catch (error) {
    console.error('댓글 조회 오류:', error);
    return NextResponse.json(
      { success: false, error: '댓글을 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId;
    const { content, parentId } = await request.json();

    // 댓글 내용 유효성 검사
    if (!content || content.trim() === '') {
      return NextResponse.json(
        { success: false, error: '댓글 내용을 입력해 주세요.' },
        { status: 400 }
      );
    }

    // 새 댓글 생성
    const newComment: Comment = {
      id: String(Date.now()),
      postId: postId,
      content: content.trim(),
      userName: '현재사용자', // 실제로는 인증된 사용자 정보
      userProfile: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      createdAt: new Date().toISOString(),
      parentId: parentId || undefined
    };

    // 실제 구현에서는 데이터베이스에 저장하지만, 현재는 목업에 추가
    mockComments.push(newComment);

    return NextResponse.json({
      success: true,
      comment: newComment,
      message: '댓글이 등록되었습니다.'
    });
  } catch (error) {
    console.error('댓글 등록 오류:', error);
    return NextResponse.json(
      { success: false, error: '댓글 등록에 실패했습니다.' },
      { status: 500 }
    );
  }
} 
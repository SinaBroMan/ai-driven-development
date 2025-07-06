'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  Eye, 
  ArrowLeft,
  Send,
  Reply,
  Copy,
  Download,
  Sparkles,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { getRelativeTime, getPostById } from '@/lib/mockData';

interface PostDetail {
  postId: string;
  imageURL: string;
  userName: string;
  userProfile: string;
  createdAt: string;
  prompt: string;
  likes: number;
  comments: number;
  scraps: number;
  views: number;
  isLiked: boolean;
  isScrapped: boolean;
  description?: string;
}

interface Comment {
  id: string;
  postId: string;
  content: string;
  userName: string;
  userProfile: string;
  createdAt: string;
  parentId?: string;
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.postId as string;
  
  const [post, setPost] = useState<PostDetail | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // 게시물 상세 정보 로드
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/post/${postId}`);
        const data = await response.json();
        
        if (data.success) {
          setPost(data.post);
        } else {
          setError(data.error || '게시물을 찾을 수 없습니다.');
        }
      } catch {
        setError('게시물을 불러오는데 실패했습니다.');
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/post/${postId}/comments`);
        const data = await response.json();
        
        if (data.success) {
          setComments(data.comments);
        }
      } catch {
        console.error('댓글 로드 실패');
      }
    };

    if (postId) {
      Promise.all([fetchPost(), fetchComments()]).finally(() => {
        setLoading(false);
      });
    }
  }, [postId]);

  // 댓글 제출 핸들러
  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      const response = await fetch(`/api/post/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: commentText.trim(),
          parentId: replyTo
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setComments(prev => [...prev, data.comment]);
        setCommentText('');
        setReplyTo(null);
        // 댓글 수 업데이트
        setPost(prev => prev ? { ...prev, comments: prev.comments + 1 } : null);
      } else {
        setError(data.error || '댓글 작성에 실패했습니다.');
      }
    } catch {
      setError('댓글 등록에 실패했습니다.');
    } finally {
      setSubmittingComment(false);
    }
  };

  // 좋아요 토글
  const handleLike = () => {
    if (!post) return;
    
    const newLiked = !post.isLiked;
    const newLikes = newLiked ? post.likes + 1 : post.likes - 1;
    
    setPost({ ...post, isLiked: newLiked, likes: newLikes });
  };

  // 스크랩 토글
  const handleScrap = () => {
    if (!post) return;
    
    const newScrapped = !post.isScrapped;
    const newScraps = newScrapped ? post.scraps + 1 : post.scraps - 1;
    
    setPost({ ...post, isScrapped: newScrapped, scraps: newScraps });
  };

  // 프롬프트 복사
  const handleCopyPrompt = async () => {
    if (!post) return;
    
    try {
      await navigator.clipboard.writeText(post.prompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch {
      console.error('클립보드 복사 실패');
    }
  };

  // 이미지 다운로드
  const handleDownload = async () => {
    if (!post) return;
    
    try {
      const response = await fetch(post.imageURL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `artify-${post.postId}.jpg`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      console.error('이미지 다운로드 실패');
    }
  };

  // 공유하기
  const handleShare = async () => {
    if (!post) return;
    
    const shareData = {
      title: `${post.userName}의 AI 작품`,
      text: `"${post.prompt}"`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 클립보드에 복사되었습니다!');
      }
    } catch {
      console.error('공유 실패');
    }
  };

  // 답글 대상 댓글 찾기
  const getParentComments = () => {
    return comments.filter(comment => !comment.parentId);
  };

  // 특정 댓글의 답글들 찾기
  const getReplies = (parentId: string) => {
    return comments.filter(comment => comment.parentId === parentId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">게시물 로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">😥</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            게시물을 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {error || '요청하신 게시물이 존재하지 않거나 삭제되었습니다.'}
          </p>
          <Button onClick={() => router.push('/')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
      {/* 헤더 */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>홈으로</span>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-gray-900 dark:text-white">Artify</span>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 이미지 섹션 */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden bg-white dark:bg-slate-800 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative aspect-square bg-gray-100 dark:bg-slate-700">
                    <Image
                      src={post.imageURL}
                      alt={`${post.userName}의 AI 작품`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 66vw"
                      priority
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 정보 및 상호작용 섹션 */}
            <div className="lg:col-span-1 space-y-6">
              {/* 작성자 정보 */}
              <Card className="bg-white dark:bg-slate-800 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="h-12 w-12 ring-2 ring-blue-500/20">
                      <AvatarImage src={post.userProfile} alt={post.userName} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {post.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {post.userName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {getRelativeTime(post.createdAt)}
                      </p>
                    </div>
                  </div>
                  
                  {/* 상호작용 버튼 */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLike}
                        className={`flex items-center space-x-1 hover:bg-red-50 dark:hover:bg-red-900/20 ${
                          post.isLiked ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span className="font-medium">{post.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <MessageCircle className="h-5 w-5" />
                        <span className="font-medium">{post.comments}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleScrap}
                        className={`flex items-center space-x-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 ${
                          post.isScrapped ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        <Bookmark className={`h-5 w-5 ${post.isScrapped ? 'fill-current' : ''}`} />
                        <span className="font-medium">{post.scraps}</span>
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDownload}
                        className="text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleShare}
                        className="text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* 프롬프트 정보 */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          프롬프트
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCopyPrompt}
                          className="text-xs"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          {copiedPrompt ? '복사됨!' : '복사'}
                        </Button>
                      </div>
                      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          &quot;{post.prompt}&quot;
                        </p>
                      </div>
                    </div>
                    
                    {/* 통계 정보 */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>조회 {post.views || 0}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        AI 생성 이미지
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 댓글 섹션 */}
              <Card className="bg-white dark:bg-slate-800 shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* 댓글 헤더 */}
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-5 w-5 text-blue-500" />
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        댓글 ({comments.length})
                      </h4>
                    </div>

                    {/* 댓글 작성 */}
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" alt="현재사용자" />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder={replyTo ? "답글을 작성해 주세요..." : "댓글을 작성해 주세요..."}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="min-h-[80px] resize-none"
                          />
                          <div className="flex items-center justify-between mt-3">
                            {replyTo && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setReplyTo(null)}
                                className="text-gray-500"
                              >
                                답글 취소
                              </Button>
                            )}
                            <Button
                              onClick={handleCommentSubmit}
                              disabled={!commentText.trim() || submittingComment}
                              size="sm"
                              className={`ml-auto ${!replyTo ? 'ml-0' : ''}`}
                            >
                              {submittingComment ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              ) : (
                                <Send className="h-4 w-4 mr-2" />
                              )}
                              {submittingComment ? '등록 중...' : '댓글 등록'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 댓글 목록 */}
                    <div className="space-y-4">
                      {getParentComments().length > 0 ? (
                        getParentComments().map((comment) => (
                          <div key={comment.id} className="space-y-3">
                            {/* 원댓글 */}
                            <div className="flex items-start space-x-3">
                              <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarImage src={comment.userProfile} alt={comment.userName} />
                                <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium text-sm text-gray-900 dark:text-white">
                                    {comment.userName}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {getRelativeTime(comment.createdAt)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 break-words">
                                  {comment.content}
                                </p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setReplyTo(comment.id)}
                                  className="text-gray-500 hover:text-blue-500 h-6 px-2"
                                >
                                  <Reply className="h-3 w-3 mr-1" />
                                  답글
                                </Button>
                              </div>
                            </div>

                            {/* 답글들 */}
                            {getReplies(comment.id).map((reply) => (
                              <div key={reply.id} className="flex items-start space-x-3 ml-8">
                                <Avatar className="h-6 w-6 flex-shrink-0">
                                  <AvatarImage src={reply.userProfile} alt={reply.userName} />
                                  <AvatarFallback className="text-xs">
                                    {reply.userName.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-medium text-sm text-gray-900 dark:text-white">
                                      {reply.userName}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      {getRelativeTime(reply.createdAt)}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700 dark:text-gray-300 break-words">
                                    {reply.content}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                          <p>아직 댓글이 없습니다.</p>
                          <p className="text-sm">첫 번째 댓글을 작성해보세요!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
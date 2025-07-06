'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Heart, Send, MessageCircle, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getRelativeTime } from '@/lib/mockData';

interface Comment {
  id: string;
  postId: string;
  content: string;
  userName: string;
  userProfile: string;
  createdAt: string;
  parentId?: string;
}

interface Post {
  postId: string;
  imageURL: string;
  userName: string;
  userProfile: string;
  likes: number;
  comments: number;
  scraps: number;
  createdAt: string;
  prompt: string;
  isLiked: boolean;
  isScrapped: boolean;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
  onLikeToggle?: (postId: string) => void;
  onScrapeToggle?: (postId: string) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  post,
  onLikeToggle,
  onScrapeToggle
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 댓글 로드
  useEffect(() => {
    if (isOpen && post.postId) {
      loadComments();
    }
  }, [isOpen, post.postId]);

  const loadComments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/post/${post.postId}/comments`);
      const data = await response.json();
      
      if (data.success) {
        setComments(data.comments);
      }
    } catch (error) {
      console.error('댓글 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 댓글 작성
  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/post/${post.postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNewComment('');
        await loadComments(); // 댓글 목록 새로고침
      } else {
        alert(data.error || '댓글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmitComment();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* 이미지 섹션 */}
          <div className="relative aspect-square bg-black">
            <Image
              src={post.imageURL}
              alt={`${post.userName}의 작품`}
              fill
              className="object-contain"
              sizes="50vw"
            />
          </div>

          {/* 댓글 섹션 */}
          <div className="flex flex-col h-full">
            {/* 헤더 */}
            <DialogHeader className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.userProfile} alt={post.userName} />
                    <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-base">{post.userName}</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                      {getRelativeTime(post.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </DialogHeader>

            {/* 프롬프트 */}
            <div className="p-4 border-b">
              <p className="text-sm font-medium mb-2">프롬프트</p>
              <p className="text-sm text-muted-foreground">
                &quot;{post.prompt}&quot;
              </p>
            </div>

            {/* 상호작용 버튼 */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onLikeToggle?.(post.postId)}
                    className="flex items-center space-x-1 hover:bg-red-50"
                  >
                    <Heart 
                      className={`h-5 w-5 ${post.isLiked ? 'fill-current text-red-500' : 'text-muted-foreground'}`} 
                    />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </Button>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onScrapeToggle?.(post.postId)}
                    className="flex items-center space-x-1 hover:bg-blue-50"
                  >
                    <Bookmark 
                      className={`h-5 w-5 ${post.isScrapped ? 'fill-current text-blue-500' : 'text-muted-foreground'}`} 
                    />
                    <span className="text-sm">{post.scraps}</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* 댓글 목록 */}
            <ScrollArea className="flex-1 p-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                </div>
              ) : comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={comment.userProfile} alt={comment.userName} />
                        <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium">{comment.userName}</span>
                          <span className="text-xs text-muted-foreground">
                            {getRelativeTime(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 break-words">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p>아직 댓글이 없습니다.</p>
                  <p className="text-sm">첫 번째 댓글을 작성해보세요!</p>
                </div>
              )}
            </ScrollArea>

            {/* 댓글 작성 */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex space-x-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" alt="현재사용자" />
                  <AvatarFallback>나</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <Textarea
                    placeholder="댓글을 입력하세요... (Ctrl+Enter로 전송)"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="min-h-[60px] resize-none"
                    disabled={isSubmitting}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Ctrl+Enter로 빠른 전송
                    </span>
                    <Button
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim() || isSubmitting}
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>댓글 작성</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal; 
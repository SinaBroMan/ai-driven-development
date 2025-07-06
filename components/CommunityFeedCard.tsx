'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CommentModal from './CommentModal';
import { CommunityFeedCardProps } from '@/types';

const CommunityFeedCard: React.FC<CommunityFeedCardProps> = ({
  postId,
  imageURL,
  userName,
  userProfile,
  likes,
  comments,
  scraps,
  createdAt,
  prompt,
  isLiked = false,
  isScrapped = false,
  onLikeToggle,
  onCommentClick,
  onScrapeToggle,
  priority = false
}) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [localLikes, setLocalLikes] = useState(likes);
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [localScraps, setLocalScraps] = useState(scraps);
  const [localIsScrapped, setLocalIsScrapped] = useState(isScrapped);
  // 상대 시간 계산
  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffMs = now.getTime() - postDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays}일 전`;
    } else if (diffHours > 0) {
      return `${diffHours}시간 전`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}분 전`;
    } else {
      return '방금 전';
    }
  };

  // 좋아요 토글
  const handleLikeToggle = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setLocalIsLiked(!localIsLiked);
    setLocalLikes(localIsLiked ? localLikes - 1 : localLikes + 1);
    onLikeToggle?.(postId);
  };

  // 댓글 모달 열기
  const handleCommentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsCommentModalOpen(true);
  };

  // 스크랩 토글
  const handleScrapeToggle = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setLocalIsScrapped(!localIsScrapped);
    setLocalScraps(localIsScrapped ? localScraps - 1 : localScraps + 1);
    onScrapeToggle?.(postId);
  };

  // 모달에서 좋아요 토글
  const handleModalLikeToggle = (postId: string) => {
    setLocalIsLiked(!localIsLiked);
    setLocalLikes(localIsLiked ? localLikes - 1 : localLikes + 1);
    onLikeToggle?.(postId);
  };

  // 모달에서 스크랩 토글
  const handleModalScrapeToggle = (postId: string) => {
    setLocalIsScrapped(!localIsScrapped);
    setLocalScraps(localIsScrapped ? localScraps - 1 : localScraps + 1);
    onScrapeToggle?.(postId);
  };

  return (
    <>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
        <Link href={`/post/${postId}`}>
          <CardContent className="p-0">
            {/* 이미지 섹션 */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={imageURL}
                alt={`${userName}의 작품: ${prompt}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={priority}
              />
              {/* 호버 시 프롬프트 오버레이 */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <p className="text-white text-sm text-center line-clamp-3 font-medium">
                  &quot;{prompt}&quot;
                </p>
              </div>
            </div>

            {/* 정보 섹션 */}
            <div className="p-4 space-y-3">
              {/* 사용자 정보 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userProfile} alt={userName} />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{userName}</span>
                    <span className="text-xs text-muted-foreground">
                      {getRelativeTime(createdAt)}
                    </span>
                  </div>
                </div>
                {/* 스크랩 아이콘 */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleScrapeToggle}
                  className="p-1 h-auto hover:bg-blue-50"
                >
                  <Bookmark 
                    className={`h-5 w-5 ${localIsScrapped ? 'fill-current text-blue-500' : 'text-muted-foreground'}`} 
                  />
                </Button>
              </div>

              {/* 프롬프트 */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {prompt}
              </p>

              {/* 상호작용 통계 */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLikeToggle}
                    className="flex items-center space-x-1 p-1 h-auto hover:bg-red-50"
                  >
                    <Heart 
                      className={`h-4 w-4 ${localIsLiked ? 'fill-current text-red-500' : 'text-muted-foreground'}`} 
                    />
                    <span className="text-sm font-medium">{localLikes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCommentClick}
                    className="flex items-center space-x-1 p-1 h-auto hover:bg-blue-50"
                  >
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{comments}</span>
                  </Button>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {localScraps} 스크랩
                </Badge>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>

      {/* 댓글 모달 */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        post={{
          postId,
          imageURL,
          userName,
          userProfile,
          likes: localLikes,
          comments,
          scraps: localScraps,
          createdAt,
          prompt,
          isLiked: localIsLiked,
          isScrapped: localIsScrapped
        }}
        onLikeToggle={handleModalLikeToggle}
        onScrapeToggle={handleModalScrapeToggle}
      />
    </>
  );
};

export default CommunityFeedCard; 
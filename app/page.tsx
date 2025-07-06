'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Users } from 'lucide-react';
import CommunityFeedCard from '@/components/CommunityFeedCard';
import PromptInput from '@/components/PromptInput';

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
  isLiked?: boolean;
  isScrapped?: boolean;
}

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  // 커뮤니티 피드 데이터 로드
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/community/feed');
        const data = await response.json();
        
        if (data.success) {
          setPosts(data.posts);
        } else {
          console.error('피드 데이터를 불러오는데 실패했습니다.');
        }
      } catch {
        console.error('네트워크 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 이미지 생성 핸들러
  const handleImageGenerate = async (prompt: string) => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

            if (data.success) {
        // 이미지 생성 결과 페이지로 이동
        const params = new URLSearchParams({
          imageURL: data.imageURL,
          prompt: data.prompt,
          generatedAt: data.generatedAt
        });
        router.push(`/generate?${params.toString()}`);
      } else {
          throw new Error(data.error || '이미지 생성에 실패했습니다.');
        }
      } catch {
        throw new Error('네트워크 오류가 발생했습니다.');
      } finally {
      setIsGenerating(false);
    }
  };

  // 좋아요 토글 핸들러
  const handleLikeToggle = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.postId === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked, 
              likes: post.isLiked ? post.likes - 1 : post.likes + 1 
            }
          : post
      )
    );
  };

  // 스크랩 토글 핸들러
  const handleScrapeToggle = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.postId === postId 
          ? { 
              ...post, 
              isScrapped: !post.isScrapped, 
              scraps: post.isScrapped ? post.scraps - 1 : post.scraps + 1 
            }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
      {/* 헤더 */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Artify
              </h1>
            </div>
            <Badge variant="outline" className="text-sm">
              AI 기반 이미지 생성 플랫폼
            </Badge>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-8">
        {/* 프롬프트 입력 섹션 */}
        <PromptInput
          onImageGenerate={handleImageGenerate}
          isGenerating={isGenerating}
          className="mb-12"
        />

        {/* 커뮤니티 피드 섹션 */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-blue-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                커뮤니티 피드
              </h3>
            </div>
            <Badge variant="secondary" className="text-sm">
              최신 작품들
            </Badge>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2 text-gray-600 dark:text-gray-300">
                피드 로딩 중...
              </span>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <CommunityFeedCard
                  key={post.postId}
                  postId={post.postId}
                  imageURL={post.imageURL}
                  userName={post.userName}
                  userProfile={post.userProfile}
                  likes={post.likes}
                  comments={post.comments}
                  scraps={post.scraps}
                  createdAt={post.createdAt}
                  prompt={post.prompt}
                  isLiked={post.isLiked}
                  isScrapped={post.isScrapped}
                  onLikeToggle={handleLikeToggle}
                  onScrapeToggle={handleScrapeToggle}
                  priority={index < 6} // 처음 6개 카드에만 priority 설정 (above the fold)
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  아직 게시된 작품이 없습니다.
                </p>
              </CardContent>
            </Card>
          )}
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-white dark:bg-slate-900 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 Artify. AI 기반 이미지 생성 플랫폼</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

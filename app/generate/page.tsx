'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Button 
} from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Share2, 
  Heart, 
  ArrowLeft, 
  Sparkles,
  Copy,
  Check
} from 'lucide-react';

function GeneratePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const imageURL = searchParams.get('imageURL');
  const prompt = searchParams.get('prompt');
  const generatedAt = searchParams.get('generatedAt');
  
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URL 파라미터가 없으면 메인 페이지로 리디렉션
    if (!imageURL || !prompt) {
      router.push('/');
      return;
    }
    setLoading(false);
  }, [imageURL, prompt, router]);

  // 프롬프트 복사
  const handleCopyPrompt = async () => {
    if (!prompt) return;
    
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  // 이미지 다운로드
  const handleDownload = () => {
    if (!imageURL) return;
    
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = `artify-generated-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 공유하기 (Web Share API 또는 URL 복사)
  const handleShare = async () => {
    const shareData = {
      title: 'Artify - AI 생성 이미지',
      text: `AI로 생성한 이미지: "${prompt}"`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Web Share API를 지원하지 않는 경우 URL 복사
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 클립보드에 복사되었습니다!');
      }
    } catch (err) {
      console.error('공유 실패:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">로딩 중...</p>
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
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Artify
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🎨 이미지 생성 완료!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            AI가 당신의 상상을 현실로 만들어냈습니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 생성된 이미지 */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src={imageURL || ''}
                    alt={`생성된 이미지: ${prompt}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 정보 및 액션 패널 */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* 프롬프트 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    생성 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">사용된 프롬프트</h4>
                    <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg relative">
                      <p className="text-sm pr-8">
                        &quot;{prompt}&quot;
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyPrompt}
                        className="absolute top-2 right-2 h-6 w-6 p-0"
                      >
                        {copied ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {generatedAt && (
                    <div>
                      <h4 className="font-medium mb-2">생성 시간</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(generatedAt).toLocaleString('ko-KR')}
                      </p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-2">이미지 정보</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">512x512</Badge>
                      <Badge variant="secondary">AI 생성</Badge>
                      <Badge variant="outline">고품질</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 액션 버튼들 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">액션</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={handleDownload}
                    className="w-full" 
                    variant="outline"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    이미지 다운로드
                  </Button>
                  
                  <Button 
                    onClick={handleShare}
                    className="w-full" 
                    variant="outline"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    공유하기
                  </Button>
                  
                  <Button 
                    className="w-full" 
                    variant="outline"
                    disabled
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    갤러리에 저장 (예정)
                  </Button>
                </CardContent>
              </Card>

              {/* 다시 생성하기 */}
              <Card>
                <CardContent className="pt-6">
                  <Link href="/">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      <Sparkles className="mr-2 h-4 w-4" />
                      새로운 이미지 생성하기
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">로딩 중...</p>
        </div>
      </div>
    }>
      <GeneratePageContent />
    </Suspense>
  );
} 
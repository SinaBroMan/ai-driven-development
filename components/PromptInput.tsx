'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles, Palette } from 'lucide-react';

interface PromptInputProps {
  onImageGenerate: (prompt: string) => Promise<void>;
  isGenerating?: boolean;
  className?: string;
}

const PromptInput: React.FC<PromptInputProps> = ({
  onImageGenerate,
  isGenerating = false,
  className = ''
}) => {
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 프롬프트 입력 핸들러
  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
    if (error) setError(null);
  };

  // 이미지 생성 핸들러
  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      setError('프롬프트를 입력해 주세요.');
      return;
    }

    try {
      setError(null);
      await onImageGenerate(prompt.trim());
      setPrompt(''); // 성공 시 프롬프트 초기화
    } catch {
      setError('이미지 생성에 실패했습니다.');
    }
  };

  // 엔터 키 핸들러
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isGenerating) {
      handleGenerateImage();
    }
  };

  return (
    <section className={`text-center ${className}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          상상을 현실로 만들어보세요
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          간단한 텍스트 프롬프트로 놀라운 AI 이미지를 생성하고 커뮤니티와 공유해보세요
        </p>

        {/* 프롬프트 입력 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="생성하고 싶은 이미지를 설명해 주세요... (예: 환상적인 바다 위의 일몰 풍경)"
                value={prompt}
                onChange={handlePromptChange}
                onKeyPress={handleKeyPress}
                className="h-14 text-lg pl-12 pr-4 bg-gray-50 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-blue-500"
                disabled={isGenerating}
              />
              <Palette className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <Button
              onClick={handleGenerateImage}
              disabled={!prompt.trim() || isGenerating}
              className="h-14 text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  이미지 생성 중...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  이미지 생성하기
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromptInput; 
## 이미지 생성 화면 기능명세서

---

### 프론트엔드 기능명세서

#### 1. 화면 레이아웃 및 디자인 명세

- **파일 위치**: `app/generate/page.tsx` ✅ 구현됨

**전체 레이아웃 구조**
- **디자인 테마**: 다크 테마 기반, 보라색 컬러 스킴 적용
- **배경**: `bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900` 그라디언트
- **반응형**: 모바일 퍼스트 접근법으로 구현
- **최대 너비**: 1024px 중앙 정렬
- **패딩**: 상하 24px, 좌우 6px

1. **Hero 섹션** ✅ 구현됨
   - **UI 구성**: 
     - 화면 상단에 배치된 히어로 섹션
     - 보라색 blur 효과가 적용된 제목 (`bg-purple-600/30 blur-3xl`)
     - 그라디언트 텍스트 효과 (`bg-gradient-to-r from-purple-600 to-purple-400`)
   - **제목**: "AI 이미지 생성" (보라색 그라디언트 텍스트)
   - **부제목**: "프롬프트만 입력하면 AI가 당신의 상상을 예술 작품으로 만들어드립니다."
   - **스타일링**: 
     - 제목: 4xl 크기, 볼드체, 클립 텍스트
     - 부제목: xl 크기, 회색 텍스트 (`text-gray-300`)

2. **메인 컨테이너** ✅ 구현됨
   - **배경**: 반투명 블러 효과 (`bg-gray-800/30 backdrop-blur-sm`)
   - **보더**: 보라색 반투명 보더 (`border-purple-600/20`)
   - **모서리**: 둥근 모서리 (`rounded-lg`)
   - **패딩**: 6px 내부 패딩
   - **전체 구조**: 반응형 최대 너비 1024px

#### 2. 핵심 컴포넌트 구조

1. **프롬프트 입력 섹션** ✅ 구현됨
   - **파일 위치**: `components/generate/GenerateImageForm.tsx`
   - **UI 구성**: 
     - 레이블: "프롬프트 입력" (회색 텍스트)
     - Textarea 컴포넌트 (ShadCN UI)
     - 최소 높이: 120px
     - 배경: `bg-gray-900/50`
     - 보더: `border-purple-600/30`
   - **입력 제한**: 
     - 최대 500자 제한
     - 실시간 유효성 검사
     - 생성 중 비활성화 처리
   - **플레이스홀더**: "생성하고 싶은 이미지를 자세히 설명해주세요..."
   - **오류 처리**: 
     - 빈 프롬프트 시 "프롬프트를 입력해 주세요" 메시지
     - 500자 초과 시 "500자 이내로 입력해 주세요" 메시지
     - 빨간색 Alert 컴포넌트로 표시

2. **스타일 옵션 선택 섹션** ✅ 구현됨
   - **파일 위치**: `components/generate/StyleOptions.tsx`
   - **UI 구성**: 
     - 컨테이너: 반투명 블러 효과 (`bg-gray-900/30 backdrop-blur-sm`)
     - 보더: 보라색 반투명 보더 (`border-purple-600/20`)
     - 내부 패딩: 4px
   - **아트 스타일 선택**: 
     - **일반 스타일**: 디지털아트, 수채화, 유화, 펜화, 연필화
     - **로고 스타일**: 미니멀 로고, 3D 로고, 그라디언트 로고, 빈티지 로고, 모던 로고
     - ShadCN Select 컴포넌트 사용
     - 그룹화된 드롭다운 메뉴
   - **색감 선택**: 
     - **일반 색감**: 밝은, 어두운, 파스텔, 흑백, 컬러풀
     - **로고 색감**: 모노톤, 메탈릭
     - 구분선으로 카테고리 분리
   - **기본값**: 디지털아트 + 밝은 색감

3. **이미지 생성 및 미리보기 섹션** ✅ 구현됨
   - **파일 위치**: `components/generate/ImageGeneration.tsx`
   - **UI 구성**: 
     - 컨테이너: 반투명 블러 효과
     - 보더: 보라색 반투명 보더
     - 내부 패딩: 4px
   - **생성 버튼**: 
     - 전체 너비 (`w-full`)
     - 높이: 12 (48px)
     - 배경: `bg-purple-600 hover:bg-purple-700`
     - 로딩 상태: Loader2 아이콘 + "이미지 생성 중..." 텍스트
     - 기본 상태: "이미지 생성하기" 텍스트
   - **이미지 미리보기**: 
     - 생성된 이미지 표시
     - 정사각형 비율 (`aspect-square`)
     - 최대 너비: 512px 중앙 정렬
     - 보라색 링 효과 (`ring-2 ring-purple-600/20`)
     - Next.js Image 컴포넌트 사용

4. **생성된 이미지 액션 섹션** ✅ 구현됨
   - **파일 위치**: `components/generate/GeneratedImageActions.tsx`
   - **UI 구성**: 
     - 컨테이너: 반투명 블러 효과
     - 보더: 보라색 반투명 보더
     - 플렉스박스 레이아웃 (`flex flex-wrap gap-3`)
   - **액션 버튼들**: 
     - **갤러리에 저장하기**: Save 아이콘 + 텍스트
     - **공유하기**: Share2 아이콘 + 텍스트 (준비 중)
     - **다운로드**: Download 아이콘 + 텍스트
   - **버튼 스타일**: 
     - 최소 너비: 200px
     - 반응형: `flex-1` 속성으로 자동 조정
     - 배경: `bg-purple-600 hover:bg-purple-700`
     - 아이콘 크기: 4x4 (16px)

#### 3. 사용자 흐름 및 상호작용

1. **페이지 진입 및 초기화** ✅ 구현됨
   - URL 파라미터로 프롬프트 자동 입력
   - `useSearchParams`로 쿼리 파라미터 읽기
   - `decodeURIComponent`로 URL 디코딩
   - 메인 페이지에서 전달된 프롬프트 자동 설정

2. **프롬프트 입력 및 검증** ✅ 구현됨
   - 실시간 문자 수 제한 (500자)
   - 입력값 변경 시 에러 상태 자동 초기화
   - 생성 중 입력 필드 비활성화
   - 유효성 검사 통과 시에만 생성 가능

3. **스타일 옵션 선택** ✅ 구현됨
   - 드롭다운 메뉴를 통한 스타일 선택
   - 실시간 상태 업데이트
   - 선택된 옵션 시각적 표시
   - 기본값 설정 (디지털아트 + 밝은 색감)

4. **이미지 생성 프로세스** ✅ 구현됨
   - **생성 시작**: 
     - 버튼 비활성화 및 로딩 상태 표시
     - 프롬프트 및 스타일 옵션 검증
     - API 호출 시작
   - **생성 진행**: 
     - Loader2 아이콘 회전 애니메이션
     - "이미지 생성 중..." 텍스트 표시
     - 사용자 입력 차단
   - **생성 완료**: 
     - 이미지 미리보기 표시
     - 액션 버튼 영역 활성화
     - 성공 토스트 메시지 표시
   - **생성 실패**: 
     - 에러 메시지 표시
     - 실패 토스트 메시지 표시
     - 버튼 재활성화

5. **생성된 이미지 관리** ✅ 부분 구현됨
   - **갤러리 저장**: 토스트 메시지만 표시 (실제 저장 로직 미구현)
   - **공유**: 준비 중 메시지 표시 (미구현)
   - **다운로드**: 
     - Fetch API로 이미지 다운로드
     - Blob URL 생성
     - 타임스탬프 기반 파일명 생성
     - 자동 다운로드 시작
     - 성공/실패 토스트 메시지

#### 4. 로딩 및 에러 처리

1. **로딩 상태 관리** ✅ 구현됨
   - `isGenerating` 상태로 로딩 상태 관리
   - 로딩 중 버튼 비활성화
   - 로딩 애니메이션 표시
   - 입력 필드 비활성화

2. **에러 처리** ✅ 구현됨
   - **프롬프트 검증 에러**: 
     - 빈 프롬프트
     - 500자 초과
     - 실시간 에러 메시지 표시
   - **API 에러**: 
     - 네트워크 오류
     - 서버 에러
     - 생성 실패
     - 토스트 메시지로 사용자에게 알림
   - **다운로드 에러**: 
     - 네트워크 오류
     - 파일 접근 오류
     - 콘솔 로그 및 토스트 메시지

3. **사용자 피드백** ✅ 구현됨
   - ShadCN Toast 컴포넌트 사용
   - 성공: 녹색 토스트 메시지
   - 에러: 빨간색 토스트 메시지
   - 정보: 기본 토스트 메시지

---

### 백엔드 기능명세서

#### 1. 이미지 생성 API ✅ 구현됨

- **파일 위치**: `app/api/generate/route.ts`
- **HTTP 메서드**: `POST`
- **AI 엔진**: Replicate Flux-schnell 모델
- **인증**: Clerk 인증 시스템 연동

**요청 데이터**:
```typescript
{
  prompt: string;                    // 최대 500자
  styleOptions: {
    artStyle: '디지털아트' | '수채화' | '유화' | '펜화' | '연필화' 
             | '로고_미니멀' | '로고_3D' | '로고_그라디언트' | '로고_빈티지' | '로고_모던';
    colorTone: '밝은' | '어두운' | '파스텔' | '흑백' | '컬러풀' | '모노톤' | '메탈릭';
  };
}
```

**처리 과정**:
1. **사용자 인증 확인**: 
   - Clerk `getAuth()`로 사용자 ID 확인
   - 미인증 시 401 오류 반환

2. **입력값 검증**: 
   - 프롬프트 존재 여부 확인
   - 프롬프트 길이 제한 (500자) 확인
   - 잘못된 입력 시 400 오류 반환

3. **스타일 매핑 및 프롬프트 향상**: 
   - 한국어 스타일 옵션을 영어 설명으로 변환
   - 아트 스타일별 상세 프롬프트 매핑
   - 색감별 상세 프롬프트 매핑
   - 최종 향상된 프롬프트 생성

4. **Replicate API 호출**: 
   - 모델: `black-forest-labs/flux-schnell`
   - 설정: 
     - `aspect_ratio: '1:1'` (정사각형)
     - `num_outputs: 1` (1개 이미지)
     - `go_fast: true` (빠른 생성)
     - `output_format: 'webp'` (웹 최적화)
     - `output_quality: 90` (고품질)
     - `negative_prompt` (품질 향상)

5. **폴링 및 상태 확인**: 
   - 최대 30초 대기 (1초 간격)
   - 상태 확인: `succeeded` | `failed` | `pending`
   - 타임아웃 또는 실패 시 500 오류 반환

6. **이미지 저장**: 
   - 생성된 이미지 URL에서 Blob 다운로드
   - UUID 기반 파일명 생성
   - Supabase Storage에 업로드
   - 경로: `{userId}/{uuid}.webp`

7. **데이터베이스 저장**: 
   - Drizzle ORM 사용
   - `images` 테이블에 메타데이터 저장
   - 기본적으로 비공개 설정 (`isPublic: false`)

**응답 데이터**:
```typescript
// 성공 응답
{
  success: true;
  imageUrl: string;                  // Supabase Storage URL
}

// 실패 응답
{
  success: false;
  error: {
    code: 'UNAUTHORIZED' | 'INVALID_PROMPT' | 'GENERATION_FAILED' | 'STORAGE_ERROR';
    message: string;
  };
}
```

#### 2. 데이터베이스 구조 ✅ 구현됨

- **ORM**: Drizzle ORM 사용
- **스키마 파일**: `db/schema.ts`
- **테이블**: `images`

**images 테이블 구조**:
```sql
CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  userId VARCHAR NOT NULL,          -- Clerk 사용자 ID
  filePath VARCHAR NOT NULL,        -- Supabase Storage 경로
  prompt TEXT NOT NULL,             -- 생성 프롬프트
  artStyle VARCHAR NOT NULL,        -- 아트 스타일
  colorTone VARCHAR NOT NULL,       -- 색감
  tags TEXT[] DEFAULT '{}',         -- 태그 배열
  isPublic BOOLEAN DEFAULT FALSE,   -- 공개 여부
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

#### 3. 스타일 매핑 시스템 ✅ 구현됨

**아트 스타일 매핑**:
- `디지털아트` → `digital art, highly detailed`
- `수채화` → `watercolor painting, soft brushstrokes`
- `유화` → `oil painting, textured`
- `펜화` → `pen and ink drawing, line art`
- `연필화` → `pencil sketch, detailed shading`
- `로고_미니멀` → `minimal logo design, clean lines, simple shapes, professional, vector style`
- `로고_3D` → `3D logo design, depth, glossy surface, professional branding, modern`
- `로고_그라디언트` → `gradient logo design, smooth color transitions, modern branding, professional`
- `로고_빈티지` → `vintage logo design, retro style, classic branding, timeless`
- `로고_모던` → `modern logo design, contemporary style, sleek, professional branding`

**색감 매핑**:
- `밝은` → `bright colors, vibrant, high key lighting`
- `어두운` → `dark tones, moody, low key lighting`
- `파스텔` → `pastel colors, soft tones`
- `흑백` → `black and white, monochrome`
- `컬러풀` → `colorful, saturated colors`
- `모노톤` → `monochromatic color scheme, professional, clean`
- `메탈릭` → `metallic finish, silver and gold tones, premium look`

#### 4. 파일 저장 시스템 ✅ 구현됨

**Supabase Storage 구성**:
- **버킷**: `images`
- **파일 경로**: `{userId}/{uuid}.webp`
- **접근 권한**: 공개 읽기 가능
- **캐시 설정**: 3600초 (1시간)
- **콘텐츠 타입**: `image/webp`

**URL 생성**:
- **패턴**: `{SUPABASE_URL}/storage/v1/object/public/images/{filePath}`
- **예시**: `https://project.supabase.co/storage/v1/object/public/images/user123/abc-123.webp`

#### 5. 타입 시스템 ✅ 구현됨

- **파일 위치**: `types/index.ts`
- **중앙집중화**: 모든 인터페이스 통합 관리

**주요 타입들**:
```typescript
// 스타일 옵션
export interface IStyleOptions {
  artStyle: '디지털아트' | '수채화' | '유화' | '펜화' | '연필화' 
          | '로고_미니멀' | '로고_3D' | '로고_그라디언트' | '로고_빈티지' | '로고_모던';
  colorTone: '밝은' | '어두운' | '파스텔' | '흑백' | '컬러풀' | '모노톤' | '메탈릭';
}

// API 요청/응답
export interface IGenerateRequest {
  prompt: string;
  styleOptions: IStyleOptions;
}

export interface IGenerateResponse {
  success: boolean;
  imageUrl: string;
  error?: {
    code: string;
    message: string;
  };
}

// 컴포넌트 Props
export interface IStyleOptionsProps {
  options: IStyleOptions;
  onChange: (options: IStyleOptions) => void;
}

export interface IImageGenerationProps {
  onGenerate: () => void;
  isGenerating: boolean;
  generatedImageUrl: string;
}

export interface IGeneratedImageActionsProps {
  imageUrl: string;
  prompt: string;
  styleOptions: IStyleOptions;
}
```

#### 6. 인증 및 보안 ✅ 구현됨

**인증 시스템**:
- **Provider**: Clerk
- **미들웨어**: `middleware.ts`에서 라우트 보호
- **보호된 라우트**: `/generate`, `/api/generate`
- **사용자 식별**: `userId` 기반 파일 저장

**보안 조치**:
- **입력 검증**: 프롬프트 길이 및 내용 검증
- **파일 격리**: 사용자별 디렉터리 분리
- **타임아웃**: 30초 생성 시간 제한
- **오류 처리**: 상세 에러 정보 숨김

#### 7. 성능 최적화 ✅ 구현됨

**이미지 최적화**:
- **포맷**: WebP (용량 최적화)
- **품질**: 90% (고품질 유지)
- **비율**: 1:1 정사각형 (일관성)
- **크기**: 1MP (빠른 생성)

**API 최적화**:
- **빠른 모델**: Flux-schnell 사용
- **병렬 처리**: 단일 이미지 생성
- **캐싱**: Supabase Storage 캐시 활용
- **압축**: 백드롭 블러로 용량 절약

#### 8. 미구현 기능 및 개선사항

**미구현 기능**:
- **갤러리 저장**: 실제 저장 로직 미구현 (토스트 메시지만)
- **커뮤니티 공유**: 공유 기능 미구현
- **이미지 편집**: 후처리 기능 없음
- **배치 생성**: 다중 이미지 생성 없음

**개선 필요사항**:
- **프롬프트 제안**: 자동 완성 기능
- **스타일 프리뷰**: 스타일별 미리보기
- **생성 히스토리**: 이전 생성 결과 보기
- **고급 옵션**: 해상도, 시드값 등 조정
- **실시간 진행률**: 생성 진행 상황 표시

---

### 추가 기능 확장 계획

#### 1. 갤러리 연동
- 생성된 이미지를 사용자 갤러리에 자동 저장
- 태그 및 카테고리 관리
- 즐겨찾기 기능

#### 2. 커뮤니티 연동
- 생성된 이미지를 커뮤니티에 공유
- 프롬프트 및 스타일 정보 공개
- 좋아요 및 댓글 기능

#### 3. 고급 생성 옵션
- 해상도 선택 (512x512, 1024x1024)
- 시드값 고정 (재현 가능한 결과)
- 네거티브 프롬프트 입력
- 이미지 투 이미지 변환

#### 4. 사용자 경험 개선
- 프롬프트 자동 완성
- 스타일 조합 추천
- 생성 시간 예측
- 실시간 진행률 표시 
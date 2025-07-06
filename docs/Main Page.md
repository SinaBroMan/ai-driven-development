## 메인페이지 기능명세서

---

### 프론트엔드 기능명세서

#### 1. 화면 레이아웃 및 디자인 명세

- **파일 위치**: `app/page.tsx` ✅ 구현됨

**전체 레이아웃 구조**
- **디자인 테마**: 다크 테마 기반, 보라색 컬러 스킴 적용
- **배경**: `bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900` 그라디언트
- **반응형**: 모바일 퍼스트 접근법으로 구현

1. **Hero 섹션** ✅ 구현됨
   - **UI 구성**: 
     - 화면 상단에 배치된 히어로 섹션
     - 그리드 패턴 배경 효과 (`bg-grid-white/5`)
     - 보라색 blur 효과가 적용된 제목
   - **제목**: "상상력을 현실로 바꾸는 AI" (그라디언트 텍스트)
   - **부제목**: "프롬프트만 입력하면 AI가 당신의 상상을 예술 작품으로 만들어드립니다."
   - **프롬프트 입력 영역**: 중앙에 배치된 PromptInput 컴포넌트

2. **프롬프트 입력 섹션** ✅ 구현됨
   - **파일 위치**: `components/PromptInput.tsx`
   - **UI 구성**: 
     - ShadCN의 `Input`과 `Button` 컴포넌트 사용
     - 다크 테마 스타일링 (`bg-gray-900/50 border-purple-600/30`)
     - Sparkles 아이콘이 포함된 "생성하기" 버튼
   - **상호작용**: 
     - 실시간 입력 값 검증
     - 빈 프롬프트 시 버튼 비활성화
     - URL 인코딩하여 `/generate` 페이지로 이동
   - **오류 처리**: 
     - 빈 프롬프트 시 "프롬프트를 입력해 주세요" 메시지 표시
     - 빨간색 배경의 에러 메시지 스타일링

3. **커뮤니티 피드 섹션** ✅ 구현됨
   - **파일 위치**: `components/CommunityFeed.tsx`
   - **UI 구성**: 
     - 반응형 그리드 레이아웃 (1/2/3열 자동 조정)
     - 그라디언트 제목과 총 이미지 개수 표시
     - Suspense와 Skeleton을 활용한 로딩 상태 처리
   - **상호작용**: 
     - **무한 스크롤**: react-intersection-observer 사용
     - **페이지네이션**: 12개씩 로드
     - **로딩 상태**: Loader2 아이콘과 함께 "로딩 중..." 표시
     - **빈 상태**: "아직 공유된 이미지가 없습니다" 메시지
   - **데이터 관리**:
     - `/api/community/feed` API 호출
     - 실시간 상태 업데이트 (useState)
     - 에러 처리 및 재시도 로직

4. **커뮤니티 피드 카드** ✅ 구현됨
   - **파일 위치**: `components/CommunityFeedCard.tsx`
   - **타입 시스템**: 중앙집중화된 `IPost` 타입 사용 (`import { IPost } from '@/types'`)
   - **UI 구성**:
     - 카드 배경: `bg-gradient-to-b from-gray-900/90 to-gray-950/90`
     - 보더: `border-purple-600/10`
     - aspect-square 이미지 영역
     - 호버 효과: 이미지 확대, 오버레이, 보더 색상 변경
   - **상호작용**:
     - **이미지 클릭**: `/post/[postId]` 상세 페이지로 이동
     - **좋아요 버튼**: 실시간 토글, 애니메이션 효과
     - **댓글 버튼**: CommentsModal 열기
     - **공유 버튼**: 외부 공유 기능
   - **상태 관리**:
     - 로컬 상태로 좋아요 상태 관리
     - API 호출 중 로딩 상태 표시
     - 토스트 알림으로 에러 처리

5. **댓글 모달** ✅ 구현됨
   - **파일 위치**: `components/CommentsModal.tsx`
   - **타입 시스템**: 중앙집중화된 타입 사용 (`import { Comment, Post, CommentModalProps } from '@/types'`)
   - **UI 구성**:
     - ShadCN Dialog 컴포넌트 사용
     - ScrollArea로 댓글 목록 스크롤
     - Textarea와 Send 버튼으로 댓글 작성
   - **상호작용**:
     - Enter 키로 댓글 작성
     - 실시간 댓글 목록 업데이트
     - 외부 클릭 또는 ESC 키로 모달 닫기

#### 2. 사용자 흐름 및 상호작용

1. **프롬프트 입력 → 이미지 생성 페이지 이동** ✅ 구현됨
   - Hero 섹션의 프롬프트 입력
   - 유효성 검사 통과 시 `/generate?prompt=...` 이동
   - URL 파라미터로 프롬프트 전달

2. **커뮤니티 피드 상호작용** ✅ 구현됨
   - **무한 스크롤**: 스크롤 하단 도달 시 자동 로드
   - **좋아요**: 즉시 UI 업데이트, API 호출로 서버 동기화
   - **댓글**: 모달 열기, 실시간 댓글 작성/조회
   - **상세 보기**: 카드 클릭으로 상세 페이지 이동

3. **로딩 및 에러 처리** ✅ 구현됨
   - Suspense와 Skeleton 활용한 로딩 상태
   - 네트워크 에러 시 콘솔 로그 및 재시도 로직
   - 사용자 친화적인 에러 메시지

---

### 백엔드 기능명세서

#### 1. 데이터베이스 구조 ✅ 구현됨

- **ORM**: Drizzle ORM 사용
- **스키마 파일**: `db/schema.ts`
- **주요 테이블**:
  - `images`: 생성된 이미지 정보
  - `posts`: 커뮤니티에 공유된 게시물
  - `likes`: 좋아요 정보
  - `comments`: 댓글 정보

#### 2. 커뮤니티 피드 API ✅ 구현됨

- **파일 위치**: `app/api/community/feed/route.ts`
- **HTTP 메서드**: `GET`
- **인증**: Clerk 인증 시스템 연동
- **쿼리 파라미터**:
  ```typescript
  {
    page?: number;        // 페이지 번호 (기본값: 1)
    limit?: number;       // 페이지 크기 (기본값: 12)
    sortBy?: 'latest' | 'oldest';  // 정렬 기준 (기본값: 'latest')
  }
  ```

- **데이터베이스 쿼리**:
  - 공개된 이미지만 조회 (`isPublic: true`)
  - 좋아요 수와 댓글 수를 서브쿼리로 계산
  - 현재 사용자의 좋아요 여부 확인
  - Clerk API로 사용자 정보 조회

- **응답 데이터**:
  ```typescript
  {
    success: boolean;
    posts: Array<{
      postId: string;
      imageURL: string;         // Supabase Storage URL
      userName: string;         // Clerk 사용자명
      userProfile?: string;     // Clerk 프로필 이미지
      likes: number;           // 좋아요 수
      comments: number;        // 댓글 수
      isLiked: boolean;        // 현재 사용자 좋아요 여부
      prompt?: string;         // 생성 프롬프트
      createdAt: string;       // ISO 날짜 문자열
    }>;
    totalCount: number;        // 전체 게시물 수
    hasMore: boolean;          // 추가 페이지 존재 여부
  }
  ```

#### 3. 게시물 상세 정보 API ✅ 구현됨

- **파일 위치**: `app/api/post/[postId]/route.ts`
- **HTTP 메서드**: `GET`
- **인증**: Clerk 인증 필요
- **URL 파라미터**: `postId` (게시물 ID)

- **응답 데이터**:
  ```typescript
  {
    success: boolean;
    post: {
      postId: string;
      imageURL: string;
      userName: string;
      userProfile?: string;
      likes: number;
      comments: number;
      isLiked: boolean;
      prompt: string;
      createdAt: string;
      title?: string;
      description?: string;
    };
    error?: {
      code: string;
      message: string;
    };
  }
  ```

#### 4. 좋아요 관리 API ✅ 구현됨

- **파일 위치**: `app/api/post/[postId]/like/route.ts`
- **HTTP 메서드**: `POST` (좋아요 토글)
- **인증**: Clerk 인증 필요
- **URL 파라미터**: `postId` (게시물 ID)

- **데이터베이스 로직**:
  - 기존 좋아요 존재 시 삭제, 없으면 생성
  - 트랜잭션으로 일관성 보장
  - 실시간 좋아요 수 반환

- **응답 데이터**:
  ```typescript
  {
    success: boolean;
    likes: number;           // 업데이트된 좋아요 수
    isLiked: boolean;        // 토글 후 좋아요 상태
    error?: {
      code: string;         // UNAUTHORIZED | POST_NOT_FOUND | DATABASE_ERROR
      message: string;
    };
  }
  ```

#### 5. 댓글 관리 API ✅ 구현됨

- **파일 위치**: `app/api/post/[postId]/comments/route.ts`
- **HTTP 메서드**: 
  - `GET`: 댓글 목록 조회
  - `POST`: 새 댓글 작성
- **인증**: Clerk 인증 필요

**GET 메서드 (댓글 조회)**
- **응답 데이터**:
  ```typescript
  {
    success: boolean;
    comments: Array<{
      id: string;
      postId: string;
      content: string;
      userName: string;
      userProfile?: string;
      createdAt: string;
      parentId?: string;      // 대댓글 지원
    }>;
  }
  ```

**POST 메서드 (댓글 작성)**
- **요청 데이터**:
  ```typescript
  {
    content: string;
    parentId?: string;       // 대댓글인 경우
  }
  ```

- **응답 데이터**:
  ```typescript
  {
    success: boolean;
    comment?: {
      id: string;
      postId: string;
      content: string;
      userName: string;
      userProfile?: string;
      createdAt: string;
      parentId?: string;
    };
    error?: {
      code: string;
      message: string;
    };
  }
  ```

#### 6. 이미지 생성 API ✅ 구현됨

- **파일 위치**: `app/api/generate/route.ts`
- **HTTP 메서드**: `POST`
- **AI 엔진**: Replicate Flux-schnell 모델
- **인증**: Clerk 인증 필요

- **요청 데이터**:
  ```typescript
  {
    prompt: string;
    styleOptions: {
      artStyle: '디지털아트' | '수채화' | '유화' | '펜화' | '연필화' 
               | '로고_미니멀' | '로고_3D' | '로고_그라디언트' | '로고_빈티지' | '로고_모던';
      colorTone: '밝은' | '어두운' | '파스텔' | '흑백' | '컬러풀' | '모노톤' | '메탈릭';
    };
  }
  ```

- **AI 처리 과정**:
  1. 스타일 옵션을 영어 프롬프트로 변환
  2. Replicate API 호출
  3. 폴링으로 생성 상태 확인 (최대 30초)
  4. Supabase Storage에 이미지 저장
  5. 데이터베이스에 메타데이터 저장

- **응답 데이터**:
  ```typescript
  {
    success: boolean;
    imageUrl?: string;       // Supabase Storage URL
    imageId?: string;        // 데이터베이스 이미지 ID
    error?: {
      code: 'UNAUTHORIZED' | 'INVALID_PROMPT' | 'GENERATION_FAILED' | 'STORAGE_ERROR';
      message: string;
    };
  }
  ```

#### 7. 타입 시스템 ✅ 구현됨

- **파일 위치**: `types/index.ts`
- **중앙집중화**: 모든 인터페이스가 하나의 파일에 통합
- **주요 타입들**:
  - `IPost`: 게시물 데이터 구조
  - `IComment`: 댓글 데이터 구조
  - `IStyleOptions`: 스타일 옵션
  - `IGalleryImage`: 갤러리 이미지
  - 각종 Props 인터페이스들

#### 8. 인증 및 보안 ✅ 구현됨

- **인증 시스템**: Clerk
- **미들웨어**: `middleware.ts`에서 라우트 보호
- **공개 라우트**: `/`, `/api/community/feed`
- **보호된 라우트**: `/generate`, `/gallery`, 대부분의 API
- **사용자 정보**: Clerk API로 실시간 조회

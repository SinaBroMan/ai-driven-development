// 타입 정의
export interface User {
  id: string;
  userName: string;
  userProfile: string;
}

export interface Post {
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

export interface Comment {
  id: string;
  postId: string;
  content: string;
  userName: string;
  userProfile: string;
  createdAt: string;
  parentId?: string;
}

// 목업 사용자 데이터
export const mockUsers: User[] = [
  {
    id: '1',
    userName: '자연사진가',
    userProfile: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face',
  },
  {
    id: '2',
    userName: '펫러버',
    userProfile: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
  },
  {
    id: '3',
    userName: '산악사진가',
    userProfile: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
  },
  {
    id: '4',
    userName: '우주여행자',
    userProfile: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop&crop=face',
  },
  {
    id: '5',
    userName: '고양이집사',
    userProfile: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
  },
  {
    id: '6',
    userName: '바다사랑',
    userProfile: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
  },
  {
    id: '7',
    userName: '도시탐험가',
    userProfile: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
  },
  {
    id: '8',
    userName: '꽃사랑',
    userProfile: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=50&h=50&fit=crop&crop=face',
  },
  {
    id: '9',
    userName: '건축사진가',
    userProfile: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&fit=crop&crop=face',
  },
  {
    id: '10',
    userName: '아트디렉터',
    userProfile: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=50&h=50&fit=crop&crop=face',
  },
  {
    id: '11',
    userName: '디저트러버',
    userProfile: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=50&h=50&fit=crop&crop=face',
  },
  {
    id: '12',
    userName: '자동차매니아',
    userProfile: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=50&h=50&fit=crop&crop=face',
  },
];

// 목업 게시물 데이터
export const mockPosts: Post[] = [
  {
    postId: '1',
    imageURL: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&crop=center',
    userName: '자연사진가',
    userProfile: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face',
    likes: 150,
    comments: 23,
    scraps: 31,
    createdAt: '2024-01-15T10:30:00Z',
    prompt: '신비로운 숲 속의 오솔길, 햇살이 스며드는 아름다운 풍경',
    isLiked: false,
    isScrapped: false
  },
  {
    postId: '2',
    imageURL: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&crop=center',
    userName: '펫러버',
    userProfile: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
    likes: 89,
    comments: 12,
    scraps: 18,
    createdAt: '2024-01-14T15:20:00Z',
    prompt: '담요에 싸인 귀여운 강아지, 따뜻하고 아늑한 느낌',
    isLiked: true,
    isScrapped: false
  },
  {
    postId: '3',
    imageURL: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center',
    userName: '산악사진가',
    userProfile: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    likes: 203,
    comments: 31,
    scraps: 45,
    createdAt: '2024-01-13T09:15:00Z',
    prompt: '웅장한 산맥과 호수가 어우러진 장엄한 풍경',
    isLiked: false,
    isScrapped: true
  },
  {
    postId: '4',
    imageURL: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=400&fit=crop&crop=center',
    userName: '우주여행자',
    userProfile: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop&crop=face',
    likes: 156,
    comments: 22,
    scraps: 18,
    createdAt: '2024-01-12T14:45:00Z',
    prompt: '신비로운 우주 공간, 별들이 빛나는 환상적인 은하수',
    isLiked: true,
    isScrapped: true
  },
  {
    postId: '5',
    imageURL: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&crop=center',
    userName: '고양이집사',
    userProfile: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    likes: 67,
    comments: 8,
    scraps: 12,
    createdAt: '2024-01-11T16:30:00Z',
    prompt: '창가에 앉아있는 우아한 고양이, 햇살이 비치는 평화로운 순간',
    isLiked: false,
    isScrapped: false
  },
  {
    postId: '6',
    imageURL: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop&crop=center',
    userName: '바다사랑',
    userProfile: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
    likes: 98,
    comments: 14,
    scraps: 20,
    createdAt: '2024-01-10T11:20:00Z',
    prompt: '황금빛 일몰이 물든 바다, 파도가 해변에 부서지는 로맨틱한 풍경',
    isLiked: false,
    isScrapped: false
  },
  {
    postId: '7',
    imageURL: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop&crop=center',
    userName: '도시탐험가',
    userProfile: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
    likes: 134,
    comments: 19,
    scraps: 26,
    createdAt: '2024-01-09T13:15:00Z',
    prompt: '안개 낀 산속 마을, 몽환적이고 신비로운 분위기',
    isLiked: true,
    isScrapped: false
  },
  {
    postId: '8',
    imageURL: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop&crop=center',
    userName: '꽃사랑',
    userProfile: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=50&h=50&fit=crop&crop=face',
    likes: 76,
    comments: 11,
    scraps: 15,
    createdAt: '2024-01-08T09:45:00Z',
    prompt: '화사한 꽃밭에서 춤추는 나비, 생동감 넘치는 봄의 정취',
    isLiked: false,
    isScrapped: false
  },
  {
    postId: '9',
    imageURL: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center',
    userName: '건축사진가',
    userProfile: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&fit=crop&crop=face',
    likes: 112,
    comments: 16,
    scraps: 22,
    createdAt: '2024-01-07T17:30:00Z',
    prompt: '미래적인 건축물, 기하학적 패턴과 빛의 조화',
    isLiked: false,
    isScrapped: true
  },
  {
    postId: '10',
    imageURL: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center',
    userName: '아트디렉터',
    userProfile: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=50&h=50&fit=crop&crop=face',
    likes: 187,
    comments: 28,
    scraps: 34,
    createdAt: '2024-01-06T12:00:00Z',
    prompt: '추상적인 컬러 패턴, 현대적이고 예술적인 디자인',
    isLiked: true,
    isScrapped: true
  },
  {
    postId: '11',
    imageURL: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop&crop=center',
    userName: '디저트러버',
    userProfile: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=50&h=50&fit=crop&crop=face',
    likes: 93,
    comments: 13,
    scraps: 17,
    createdAt: '2024-01-05T14:20:00Z',
    prompt: '맛있어 보이는 컬러풀한 디저트, 달콤한 유혹',
    isLiked: false,
    isScrapped: false
  },
  {
    postId: '12',
    imageURL: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop&crop=center',
    userName: '자동차매니아',
    userProfile: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=50&h=50&fit=crop&crop=face',
    likes: 145,
    comments: 21,
    scraps: 29,
    createdAt: '2024-01-04T16:45:00Z',
    prompt: '클래식 자동차와 일몰, 빈티지한 감성과 로맨틱한 분위기',
    isLiked: true,
    isScrapped: false
  }
];

// 목업 댓글 데이터
export const mockComments: Comment[] = [
  // 게시물 1의 댓글들
  {
    id: '1',
    postId: '1',
    content: '정말 아름다운 풍경이네요! 어디서 촬영하신 건가요?',
    userName: '자연애호가',
    userProfile: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
    createdAt: '2024-01-15T11:15:00Z',
  },
  {
    id: '2',
    postId: '1',
    content: 'AI가 이런 디테일까지 표현할 수 있다니 놀랍습니다 👍',
    userName: '테크전문가',
    userProfile: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    createdAt: '2024-01-15T12:30:00Z',
  },
  {
    id: '3',
    postId: '1',
    content: '@자연애호가 프롬프트 엔지니어링의 결과물이에요! 실제 장소는 아니지만 정말 사실적이죠 😊',
    userName: '자연사진가',
    userProfile: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face',
    createdAt: '2024-01-15T13:45:00Z',
    parentId: '1',
  },
  
  // 게시물 2의 댓글들
  {
    id: '4',
    postId: '2',
    content: '너무 귀여워요! 우리 강아지와 똑같아요 🐕',
    userName: '댕댕이맘',
    userProfile: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    createdAt: '2024-01-14T16:20:00Z',
  },
  {
    id: '5',
    postId: '2',
    content: '담요 질감까지 정말 리얼하네요',
    userName: '디테일러버',
    userProfile: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
    createdAt: '2024-01-14T17:00:00Z',
  },
  
  // 게시물 3의 댓글들
  {
    id: '6',
    postId: '3',
    content: '이런 풍경을 실제로 보러 가고 싶어요!',
    userName: '여행꿈나무',
    userProfile: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop&crop=face',
    createdAt: '2024-01-13T10:15:00Z',
  },
  {
    id: '7',
    postId: '3',
    content: '산맥의 웅장함이 잘 표현되었네요',
    userName: '산악인',
    userProfile: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    createdAt: '2024-01-13T11:30:00Z',
  },
  
  // 게시물 4의 댓글들
  {
    id: '8',
    postId: '4',
    content: '우주의 신비로움이 느껴져요 ✨',
    userName: '별빛탐험가',
    userProfile: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
    createdAt: '2024-01-12T15:20:00Z',
  },
  {
    id: '9',
    postId: '4',
    content: '은하수 표현이 정말 환상적이에요!',
    userName: '천문학도',
    userProfile: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=50&h=50&fit=crop&crop=face',
    createdAt: '2024-01-12T16:45:00Z',
  },
  
  // 게시물 5의 댓글들
  {
    id: '10',
    postId: '5',
    content: '고양이의 표정이 정말 생생해요 😸',
    userName: '냥집사',
    userProfile: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&fit=crop&crop=face',
    createdAt: '2024-01-11T17:15:00Z',
  },
];

// 유틸리티 함수들
export const getPostById = (postId: string): Post | undefined => {
  return mockPosts.find(post => post.postId === postId);
};

export const getCommentsByPostId = (postId: string): Comment[] => {
  return mockComments.filter(comment => comment.postId === postId);
};

export const getUserByName = (userName: string): User | undefined => {
  return mockUsers.find(user => user.userName === userName);
};

// 상대시간 계산 함수
export const getRelativeTime = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일 전`;
  }
}; 
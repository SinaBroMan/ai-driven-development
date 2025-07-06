import { IPost, IComment, IGalleryImage } from '@/types'

export const mockPosts: IPost[] = [
    {
        postId: '1',
        imageURL: 'https://picsum.photos/400/400?random=1',
        userName: '창작의신',
        likes: 150,
        comments: 23
    },
    {
        postId: '2',
        imageURL: 'https://picsum.photos/400/400?random=2',
        userName: 'AI아티스트',
        likes: 89,
        comments: 12
    },
    {
        postId: '3',
        imageURL: 'https://picsum.photos/400/400?random=3',
        userName: '그림쟁이',
        likes: 234,
        comments: 45
    },
    {
        postId: '4',
        imageURL: 'https://picsum.photos/400/400?random=4',
        userName: '상상마법사',
        likes: 67,
        comments: 8
    },
    {
        postId: '5',
        imageURL: 'https://picsum.photos/400/400?random=5',
        userName: '픽셀아트',
        likes: 445,
        comments: 56
    },
    {
        postId: '6',
        imageURL: 'https://picsum.photos/400/400?random=6',
        userName: '디자인고수',
        likes: 178,
        comments: 34
    },
    {
        postId: '7',
        imageURL: 'https://picsum.photos/400/400?random=7',
        userName: '이미지메이커',
        likes: 92,
        comments: 15
    },
    {
        postId: '8',
        imageURL: 'https://picsum.photos/400/400?random=8',
        userName: '아트디렉터',
        likes: 267,
        comments: 41
    },
    {
        postId: '9',
        imageURL: 'https://picsum.photos/400/400?random=9',
        userName: '컬러마스터',
        likes: 156,
        comments: 28
    },
    {
        postId: '10',
        imageURL: 'https://picsum.photos/400/400?random=10',
        userName: '드림메이커',
        likes: 324,
        comments: 47
    }
]

export const getMockPostDetail = (postId: string): IPost => {
    const basePost = mockPosts.find(post => post.postId === postId)
    if (!basePost) throw new Error('Post not found')

    return {
        ...basePost,
        prompt: '우주를 여행하는 고양이가 우주선 창 밖을 바라보며 지구를 보고 있는 모습, 디테일한 일러스트레이션',
        createdAt: '2024-03-20 15:30',
        userProfile: `https://picsum.photos/50/50?random=${postId}`
    }
}

export const mockComments: IComment[] = [
    {
        id: '1',
        postId: '1',
        userName: '댓글러1',
        content: '정말 멋진 작품이네요! 프롬프트가 너무 독특해요.',
        createdAt: '2024-03-20 10:00',
        userProfile: 'https://picsum.photos/50/50?random=101'
    },
    {
        id: '2',
        postId: '1',
        userName: '댓글러2',
        content: '고양이의 표정이 정말 인상적이에요!',
        createdAt: '2024-03-20 11:30',
        userProfile: 'https://picsum.photos/50/50?random=102'
    }
]

// export const mockGalleryImages: IGalleryImage[] = [
//     {
//         id: '1',
//         userId: 'user1',
//         imageUrl: 'https://picsum.photos/400/400?random=21',
//         prompt: '우주를 나는 고래',
//         styleOptions: {
//             artStyle: '디지털아트',
//             colorTone: '밝은'
//         },
//         categories: ['판타지'],
//         tags: ['우주', '고래', '환상적'],
//         isPublic: true,
//         order: 1,
//         createdAt: '2024-03-20T00:00:00Z',
//         updatedAt: '2024-03-20T00:00:00Z'
//     },
//     {
//         id: '2',
//         userId: 'user1',
//         imageUrl: 'https://picsum.photos/400/400?random=22',
//         prompt: '신비로운 숲속의 요정',
//         styleOptions: {
//             artStyle: '수채화',
//             colorTone: '파스텔'
//         },
//         categories: ['판타지', '자연'],
//         tags: ['요정', '숲', '마법'],
//         isPublic: true,
//         order: 2,
//         createdAt: '2024-03-19T00:00:00Z',
//         updatedAt: '2024-03-19T00:00:00Z'
//     },
//     {
//         id: '3',
//         userId: 'user1',
//         imageUrl: 'https://picsum.photos/400/400?random=23',
//         prompt: '미래도시의 일상',
//         styleOptions: {
//             artStyle: '디지털아트',
//             colorTone: '네온'
//         },
//         categories: ['SF'],
//         tags: ['미래', '도시', '사이버펑크'],
//         isPublic: false,
//         order: 3,
//         createdAt: '2024-03-18T00:00:00Z',
//         updatedAt: '2024-03-18T00:00:00Z'
//     },
//     {
//         id: '4',
//         userId: 'user1',
//         imageUrl: 'https://picsum.photos/400/400?random=24',
//         prompt: '고양이와 책이 있는 아늑한 방',
//         styleOptions: {
//             artStyle: '유화',
//             colorTone: '따뜻한'
//         },
//         categories: ['일상'],
//         tags: ['고양이', '인테리어', '아늑함'],
//         isPublic: true,
//         order: 4,
//         createdAt: '2024-03-17T00:00:00Z',
//         updatedAt: '2024-03-17T00:00:00Z'
//     }
// ]

// 이미지 생성 목업 데이터
export const mockGeneratedImages = [
    'https://picsum.photos/512/512?random=1',
    'https://picsum.photos/512/512?random=2',
    'https://picsum.photos/512/512?random=3',
    'https://picsum.photos/512/512?random=4',
    'https://picsum.photos/512/512?random=5',
];

// 이미지 생성 API 목업 함수
export const mockGenerateImage = async (
    prompt: string,
    styleOptions: { artStyle: string; colorTone: string }
): Promise<{ success: boolean; imageUrl?: string; error?: string }> => {
    // 실제 API 호출을 시뮬레이션하기 위한 지연
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 90% 확률로 성공
    if (Math.random() > 0.1) {
        const randomIndex = Math.floor(Math.random() * mockGeneratedImages.length);
        return {
            success: true,
            imageUrl: mockGeneratedImages[randomIndex]
        };
    } else {
        return {
            success: false,
            error: '이미지 생성에 실패했습니다. 다시 시도해 주세요.'
        };
    }
};

// 프롬프트 제안 목업 데이터
export const mockPromptSuggestions = [
    '아름다운 석양이 지는 바닷가',
    '신비로운 숲 속의 요정',
    '미래도시의 스카이라인',
    '우주 공간에서 바라본 지구',
    '따뜻한 봄날의 꽃밭',
    '고양이가 있는 아늑한 카페',
    '판타지 세계의 마법사',
    '빈티지 자동차가 있는 거리',
    '눈이 내리는 겨울 마을',
    '컬러풀한 추상화 작품'
];

// 인기 프롬프트 목업 데이터
export const mockPopularPrompts = [
    {
        prompt: '아름다운 석양이 지는 바닷가',
        count: 156,
        style: '디지털아트',
        colorTone: '밝은'
    },
    {
        prompt: '신비로운 숲 속의 요정',
        count: 134,
        style: '수채화',
        colorTone: '파스텔'
    },
    {
        prompt: '미래도시의 스카이라인',
        count: 128,
        style: '디지털아트',
        colorTone: '어두운'
    },
    {
        prompt: '우주 공간에서 바라본 지구',
        count: 112,
        style: '디지털아트',
        colorTone: '컬러풀'
    },
    {
        prompt: '따뜻한 봄날의 꽃밭',
        count: 98,
        style: '수채화',
        colorTone: '밝은'
    }
];

// 생성 히스토리 목업 데이터
export const mockGenerationHistory = [
    {
        id: '1',
        prompt: '아름다운 석양이 지는 바닷가',
        imageUrl: 'https://picsum.photos/512/512?random=1',
        style: '디지털아트',
        colorTone: '밝은',
        createdAt: '2024-01-15T10:30:00Z'
    },
    {
        id: '2',
        prompt: '신비로운 숲 속의 요정',
        imageUrl: 'https://picsum.photos/512/512?random=2',
        style: '수채화',
        colorTone: '파스텔',
        createdAt: '2024-01-14T15:45:00Z'
    },
    {
        id: '3',
        prompt: '미래도시의 스카이라인',
        imageUrl: 'https://picsum.photos/512/512?random=3',
        style: '디지털아트',
        colorTone: '어두운',
        createdAt: '2024-01-13T09:20:00Z'
    }
];

// 갤러리 저장 목업 함수
export const mockSaveToGallery = async (
    imageUrl: string,
    prompt: string,
    styleOptions: { artStyle: string; colorTone: string }
): Promise<{ success: boolean; error?: string }> => {
    // 실제 API 호출을 시뮬레이션하기 위한 지연
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 95% 확률로 성공
    if (Math.random() > 0.05) {
        return { success: true };
    } else {
        return {
            success: false,
            error: '갤러리 저장에 실패했습니다. 다시 시도해 주세요.'
        };
    }
};

// 커뮤니티 공유 목업 함수
export const mockShareToCommunity = async (
    imageUrl: string,
    prompt: string,
    styleOptions: { artStyle: string; colorTone: string }
): Promise<{ success: boolean; error?: string }> => {
    // 실제 API 호출을 시뮬레이션하기 위한 지연
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 95% 확률로 성공
    if (Math.random() > 0.05) {
        return { success: true };
    } else {
        return {
            success: false,
            error: '커뮤니티 공유에 실패했습니다. 다시 시도해 주세요.'
        };
    }
};

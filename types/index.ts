// 공통 인터페이스 정의
export interface Comment {
  id: string;
  postId: string;
  content: string;
  userName: string;
  userProfile: string;
  createdAt: string;
  parentId?: string;
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

// 컴포넌트 Props 인터페이스 정의
export interface CommunityFeedCardProps {
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
  onLikeToggle?: (postId: string) => void;
  onCommentClick?: (post: any) => void;
  onScrapeToggle?: (postId: string) => void;
  priority?: boolean; // LCP 최적화를 위한 priority 설정
}

export interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
  onLikeToggle?: (postId: string) => void;
  onScrapeToggle?: (postId: string) => void;
} 
export interface SignupResponse {
  message: string;
}

export interface Post {
  postId: number;
  categoryId: number;
  postName: string;
  postContentName: string;
  postDate: string;
  postView: number;
  likeCount: number;
  memberId: number;
}

export interface Comment {
  commentId: number;
  postId: number;
  commentContent: string;
  commentDate: string;
  memberId: number;
  name: string;
  icon: string;
}
export interface SigninResponse {
  accessToken: string;
  refreshToken: string;
  isSurveyCompleted: 'N' | 'Y';
  memberId: number;
  fg: string;
}

export interface UserDataResponse {
  id: string;
  name: string;
  address: string;
  phone: string;
  icon: string;
}

export interface SurveyScore {
  scores: {
    date: string;
    d1: number;
    d2: number;
    d3: number;
    d4: number;
    d5: number;
    d6: number;
  }[];
}

export interface UserGender {
  F: number;
  M: number;
}

export interface Product {
  groupProduct?: {
    groupProductNo: number;
    leafCategoryId: string;
    groupProductName: string;
  };
  originProduct: {
    statusType:
      | 'WAIT'
      | 'SALE'
      | 'OUTOFSTOCK'
      | 'UNADMISSION'
      | 'REJECTION'
      | 'SUSPENSION'
      | 'CLOSE'
      | 'PROHIBITION'
      | 'DELETE';
    saleType?: 'NEW' | 'OLD';
    leafCategoryId: string;
    name: string;
    detailContent: string;
    images: {
      [key: string]: string; // 이미지 URL 맵핑
    };
    saleStartDate?: string;
    saleEndDate?: string;
    salePrice: number;
    stockQuantity?: number;
    deliveryInfo?: {
      [key: string]: any; // 배송 정보 상세 스펙
    };
    detailAttribute: {
      [key: string]: any; // 상품 상세 속성
    };
  };
  smartstoreChannelProduct?: {
    channelProductName?: string;
    bbsSeq?: number;
    storeKeepExclusiveProduct?: boolean;
    naverShoppingRegistration: boolean;
    channelProductDisplayStatusType: 'WAIT' | 'ON' | 'SUSPENSION';
  };
  windowChannelProduct?: {
    channelProductName?: string;
    bbsSeq?: number;
    storeKeepExclusiveProduct?: boolean;
    naverShoppingRegistration: boolean;
    channelNo: number;
    best?: boolean;
    channelProductDisplayStatusType?: 'WAIT' | 'ON' | 'SUSPENSION';
  };
}

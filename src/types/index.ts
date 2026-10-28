export type VoiceTier = 'free' | 'booth_only' | 'silent' | 'unconfirmed';

export interface TicketOption {
  id: string;
  name: string;
  typeBadge: string;
  subBadge?: string;
  price: number;
  periodText: string;
  hourlyNormalizedRate: number;
  hourlyNormalizedText: string;
  features: string[];
  isRecommended?: boolean;
}

export interface SpaceEnvironment {
  voiceRules: {
    title: string;
    badge: string;
    description: string;
    features: string[];
  };
  phoneBooth: {
    totalCount: number | null;
    badge: string;
    description: string;
    specs?: {
      hardware?: string;
      soundproofing?: string;
      ventilation?: string;
    };
  };
  infrastructure?: {
    power?: {
      title: string;
      description: string;
    };
    network?: {
      title: string;
      description: string;
    };
  };
}

export interface SpaceSourceInfo {
  officialSite?: string;
  spaceCloudUrl?: string;
  googleMapUrl: string;
  userVisitExperience?: string;
  verificationDate?: string;
}

export interface Space {
  id: string;
  name: string;
  branch: string;
  subtitle: string;
  region: string; // '강남/역삼', '성수/서울숲', etc.
  address: string;
  spaceType?: string;
  transit: {
    summary: string;
    walkTime: string;
    details: string;
    subwayLines?: string[];
  };
  operatingHours: string;
  voiceTier: VoiceTier;
  voiceTierLabel: string;
  voiceTierDetails?: string;
  voiceVerificationStatus?: 'confirmed' | 'unconfirmed'; // 발화 정보 확인 여부 ('confirmed': 확인됨, 'unconfirmed': 확인 필요)
  longDurationVoiceAllowed?: 'confirmed' | 'unconfirmed' | 'not_allowed'; // 장시간(하루 6시간 이상) 발화 허용 여부
  longDurationVoiceLabel?: string; // e.g. '하루 6시간 이상 발화: 미확인'
  longDurationVoiceDetails?: string;
  phoneBoothInstalled?: 'confirmed' | 'unconfirmed' | 'none';
  phoneBoothCount: number | null;
  phoneBoothStatus: string; // '즉시 이용 가능', '예약 불필요', '미확인', '설치 확인 (수량 미확인)'
  phoneBoothDetails?: string;
  hourlyRate: number | null; // 1시간 환산 금액 (null if unconfirmed)
  hourlyRateText?: string;
  dayPassPrice: number | null; // 일일권 금액 (null if unconfirmed)
  pricingNotes?: string;
  rating: number;
  reviewCount: number;
  heroImage: string;
  galleryImages: {
    url: string;
    caption: string;
    alt: string;
  }[];
  tags: string[];
  highlights: string[];
  amenities: string[];
  environment: SpaceEnvironment;
  tickets: TicketOption[];
  proTip: string;
  officialSiteUrl: string;
  reservationUrl?: string;
  googleMapPlaceUrl: string;
  naverMapUrl?: string;
  kakaoMapUrl?: string;
  coordinates: {
    lat: number;
    lng: number;
    xPercent: number; // For interactive visual map representation
    yPercent: number;
  };
  activeUsersCount?: number;
  isRealData?: boolean;
  sourceInfo?: SpaceSourceInfo;
}

export interface FilterState {
  region: string;
  voiceTier: VoiceTier | 'all';
  minBooths: number;
  sortBy: 'price_asc' | 'rating_desc' | 'booth_desc';
  only24h: boolean;
  hasMonitor: boolean;
  onlyBookmarked: boolean;
}

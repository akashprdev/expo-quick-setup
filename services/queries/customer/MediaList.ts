import { api } from '@/services/axiosConfig';
import { queryOptions, useQuery } from '@tanstack/react-query';

/* ================================
   TYPES
================================ */

export type MediaType = 'default' | 'just_arrival' | 'random' | 'feed' | 'popular' | 'trending';

export interface UserProfile {
  created_by_id: number;
  created_by_name: string;
  created_by_image: string;
  district_name: string;
  state_name: string;
}

export interface MediaItem {
  product_id: string;
  product_name: string;
  created_at: string;

  short_description: string;
  product_image: string;

  media_id: string;
  media_type: number;

  title: string | null;
  caption: string | null;
  tags: string | null;

  value: string; // video/image path

  user_type: string;
  user_profile: UserProfile;

  category_names: string;

  mrp: string;
  discount_percent: string;
  final_amount_payable: string;

  is_followed: number;
  is_liked: boolean;
  is_viewed: boolean;
  is_wishlisted: number;

  review_count: number;
  view_count: number;
  like_count: number;
  comment_count: number;
  share_count: number;
}

export interface MediaListResponse {
  data: {
    list: MediaItem[];
  };
}

export interface MediaListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  brand_id?: string;
  uploaded_by?: string;
  category_id?: string;
  user_type?: string;
  type?: MediaType;
  product_id?: string;
}

/* ================================
   API CALL
================================ */

export const fetchMediaList = async (params: MediaListParams = {}): Promise<MediaListResponse> => {
  const { page = 0, pageSize = 10, type = 'default', ...rest } = params;

  const queryParams = {
    page,
    page_size: pageSize,
    type,
    ...rest,
  };

  // remove empty values
  const filteredParams = Object.fromEntries(
    Object.entries(queryParams).filter(
      ([_, value]) => value !== '' && value !== undefined && value !== null
    )
  );

  const response = await api.get<MediaListResponse>('/user/media', {
    params: filteredParams,
  });

  return response.data;
};

/* ================================
   QUERY OPTIONS
================================ */

export const useMediaListQueryOptions = (params: MediaListParams = {}) => {
  return queryOptions({
    queryKey: ['reels-list', params],
    queryFn: () => fetchMediaList(params),
    staleTime: 1000 * 60 * 5, // 5 mins
    retry: 0,
  });
};

/* ================================
   HOOK
================================ */

export const useMediaListQuery = (params: MediaListParams = {}) => {
  return useQuery(useMediaListQueryOptions(params));
};

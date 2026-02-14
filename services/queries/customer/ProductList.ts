import { api } from '@/services/axiosConfig';
import { queryOptions, useQuery } from '@tanstack/react-query';

export interface ProductImage {
  media_type: number;
  value: string;
}

export interface Product {
  product_id: string;
  is_assured: boolean;
  product_name: string;
  short_description: string;
  product_created_at: string; // ISO date string
  product_images: ProductImage[];

  mrp: string;
  discount_percent: string;
  final_amount_payable: string;

  comment: number;
  views: number;
  likes: number;
}

interface ProductListResponse {
  data: {
    list: Product[];
  };
}

export type ProductType =
  | 'default'
  | 'just_arrival'
  | 'random'
  | 'popular'
  | 'sponsor'
  | 'trending'
  | 'top_search'
  | 'training_today';

interface ProductListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  brand_id?: string;
  vendor_id?: string;
  category_id?: string;
  type?: ProductType;
}

const DEFAULT_PARAMS: Required<ProductListParams> = {
  page: 0,
  pageSize: 10,
  search: '',
  brand_id: '',
  vendor_id: '',
  category_id: '',
  type: 'default',
};

export const fetchProductList = async (params: ProductListParams = {}) => {
  const { page, pageSize, search, brand_id, vendor_id, category_id, type } = {
    ...DEFAULT_PARAMS,
    ...params,
  };

  const query = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
    ...(search && { search }),
    ...(brand_id && { brand_id }),
    ...(vendor_id && { vendor_id }),
    ...(category_id && { category_id }),
    ...(type && { type }),
  });

  const url = `/user/product?${query.toString()}`;

  const response = await api.get<ProductListResponse>(url);
  return response.data;
};

export const useProductListQueryOptions = (params: ProductListParams = {}) => {
  const merged = { ...DEFAULT_PARAMS, ...params };

  return queryOptions({
    queryKey: ['product-list', merged],
    queryFn: () => fetchProductList(merged),
    staleTime: 1000 * 60 * 5,
    retry: 0,
  });
};

export const useProductListQuery = (params: ProductListParams = {}) => {
  return useQuery(useProductListQueryOptions(params));
};

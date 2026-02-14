import { api } from '@/services/axiosConfig';
import { useInfiniteQuery } from '@tanstack/react-query';

export interface Brand {
  brand_id: number;
  brand_name: string;
  brand_image: string;
  banner_image: string;
  product_count: string;
  vendor_id: string;
}

export interface BrandListResponse {
  data: {
    list: Brand[];
  };
}

const fetchBrandList = async ({
  pageParam = 1,
  pageSize = 10,
}: {
  pageParam?: number;
  pageSize?: number;
}): Promise<BrandListResponse> => {
  const pageIndex = pageParam - 1; // backend is 0-based

  const { data } = await api.get<BrandListResponse>(
    `/user/brand?page=${pageIndex}&page_size=${pageSize}`
  );

  return data;
};

export const useBrandListInfiniteQuery = (pageSize = 10) => {
  const query = useInfiniteQuery({
    queryKey: ['brand-list-infinite', pageSize],

    queryFn: ({ pageParam }) =>
      fetchBrandList({
        pageParam,
        pageSize,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      const list = lastPage?.data?.list ?? [];

      // stop pagination
      if (list.length < pageSize) return undefined;

      // next page
      return allPages.length + 1;
    },

    staleTime: 5 * 60 * 1000,
    retry: 0,
  });
  const brands = query.data?.pages.flatMap((page) => page.data.list) ?? [];

  return {
    ...query,
    data: brands,
  };
};

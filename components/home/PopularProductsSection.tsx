import { useWindow } from '@/hooks/useWindow';
import { Product, useProductListQuery } from '@/services/queries/customer/ProductList';
import { ChevronRight } from 'lucide-react-native';
import React, { useCallback, useMemo } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import ProductCard from '../common/ProductCard';
import ProductCardSkeleton from '../skeletons/ProductCardSkeleton';
const SKELETON_DATA = [1, 2, 3, 4];

const PopularProductsSection = () => {
  const { height } = useWindow();

  const productCardHeight = height * 0.3;

  const {
    data: productList,
    isPending,
    isFetching,
    isError,
  } = useProductListQuery({
    page: 0,
    pageSize: 4,
    type: 'popular',
  });

  const list = productList?.data?.list ?? [];

  const showSkeleton = isPending || isFetching || isError || list.length === 0;

  const data = useMemo(() => (showSkeleton ? SKELETON_DATA : list), [showSkeleton, list]);

  const renderProduct = (item: Product) =>
    showSkeleton ? (
      <View className="w-1/2 px-1">
        <ProductCardSkeleton height={productCardHeight} />
      </View>
    ) : (
      <View className="flex-1">
        <ProductCard item={item} height={productCardHeight} />
      </View>
    );

  const keyExtractor = useCallback(
    (item: any, index: number) => (showSkeleton ? String(index) : String(item.product_id)),
    [showSkeleton]
  );

  return (
    <View className="mt-7">
      <View className="flex-row justify-between items-center px-4">
        <Text className="text-white font-satoshi-bold text-lg">Popular Items</Text>
        <Pressable
          className="flex flex-row items-center gap-1 "
          //   onPress={() => navigate(navigationStrings.PROTECTED.CUSTOMER.HOMEPOPULAR)}
        >
          <ChevronRight color={'#ffff'} size={16} />
        </Pressable>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => renderProduct(item as Product)}
        keyExtractor={keyExtractor}
        numColumns={2}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          paddingVertical: 8,
          gap: 8,
        }}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews
      />
    </View>
  );
};

export default PopularProductsSection;

import { Brand, useBrandListInfiniteQuery } from '@/services/queries/customer/BrandList';
import { getMediaPath } from '@/utility/getMediaPath';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

const TrendingBrandSection = () => {
  const {
    data: brands,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBrandListInfiniteQuery();

  return (
    <View className="flex flex-col">
      {/* Header */}
      <View className="flex-row justify-between items-center pb-3 px-4">
        <Text className="text-white font-satoshi-bold text-lg">Trending Brands</Text>
      </View>

      {/* Brand List */}
      <FlatList
        horizontal
        data={brands}
        renderItem={({ item }) => <BrandDetails item={item} />}
        keyExtractor={(item) => item.brand_id.toString()}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.8}
        ListFooterComponent={isFetchingNextPage ? <TrendingBrandLogoSkeleton /> : null}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      />
    </View>
  );
};

export default TrendingBrandSection;

const BrandDetails = ({ item }: { item: Brand }) => {
  const brandImageUrl = getMediaPath(item.brand_image);
  return (
    <Link href={'/(drawer)/(tabs)/explore'} className="mr-4 items-center gap-2">
      <View className="w-24 h-24 bg-gray-300 rounded-full mx-2" style={{ backgroundColor: '#ccc' }}>
        <Image
          source={{ uri: brandImageUrl }}
          style={{ width: '100%', height: '100%', borderRadius: 9999 }}
          contentFit="cover"
        />
      </View>
    </Link>
  );
};

const TrendingBrandLogoSkeleton = () => {
  return (
    <View className="mr-4 items-center gap-2">
      {/* Banner skeleton */}
      <View className="w-24 h-24 rounded-2xl bg-gray-300 " />

      {/* Logo skeleton
      <View className="w-9 h-9 rounded-full bg-gray-300" /> */}
    </View>
  );
};

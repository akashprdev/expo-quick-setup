import React from 'react';
import { View } from 'react-native';

interface ProductCardSkeletonProps {
  height?: number;
  width?: number;
}

const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ height, width }) => {
  return (
    <View
      className="w-full rounded-2xl overflow-hidden bg-gray-800 animate-pulse"
      style={{ height, width: width ? width : undefined }}
    >
      {/* Background placeholder */}
      <View className="flex-1 bg-gray-300" />

      {/* Bottom overlay */}
      <View className="absolute bottom-0 w-full px-3 py-3 bg-gray-900/60">
        {/* Title */}
        <View className="h-3 w-28 bg-gray-400 rounded mb-2" />

        {/* Rating + reviews */}
        <View className="flex-row items-center mb-2">
          <View className="h-3 w-3 rounded-full bg-gray-400" />
          <View className="h-3 w-6 bg-gray-400 rounded ml-2" />
          <View className="h-3 w-16 bg-gray-400 rounded ml-2" />
        </View>

        {/* Price */}
        <View className="flex-row items-center gap-2">
          <View className="h-4 w-12 bg-gray-400 rounded" />
          <View className="h-3 w-10 bg-gray-300 rounded" />
        </View>
      </View>
    </View>
  );
};

export default ProductCardSkeleton;

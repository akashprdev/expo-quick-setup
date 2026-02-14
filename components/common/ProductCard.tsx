import { Product } from '@/services/queries/customer/ProductList';
import { getMediaPath } from '@/utility/getMediaPath';
import { Image } from 'expo-image';
import React from 'react';
import { View } from 'react-native';

interface ProductCardProps {
  item: Product;
  height: number;
}

const ProductCard = ({ item, height }: ProductCardProps) => {
  const productImageUrl = getMediaPath(item.product_images[0]?.value) || '';

  return (
    <View style={{ flex: 1, height, width: '100%' }}>
      <Image
        source={{
          uri:
            productImageUrl ||
            'https://tse2.mm.bing.net/th/id/OIP.-O6sZQqkbikf9lzotEA7qQHaE8?pid=Api&P=0&h=220',
        }}
        style={{ width: '100%', height: '100%' }}
        contentFit="cover"
      />
    </View>
  );
};

export default ProductCard;

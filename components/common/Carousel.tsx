import { useWindow } from '@/hooks/useWindow';
import { Image } from 'expo-image';
import * as React from 'react';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';

interface Banner {
  image: string;
  productName?: string;
  amount?: string;
  mrp?: string;
  discount?: string;
  productId?: string;
}

interface BannerData {
  data: Banner[];
}

function BannerCarousel({ data }: BannerData) {
  const { width } = useWindow();
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={ref}
        style={{ width, height: 258 }}
        data={data}
        loop
        autoPlay={autoPlay}
        autoPlayInterval={3000}
        snapEnabled={true}
        pagingEnabled
        windowSize={3}
        onScrollStart={() => setAutoPlay(false)}
        onScrollEnd={() => setAutoPlay(true)}
        width={width}
        onProgressChange={progress}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={300}
              placeholder="blurhash"
            />

            <View className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md">
              <View className="flex-row justify-between px-4 py-2">
                {/* Product Info */}
                <View className="flex-1 ml-3">
                  <Text
                    className="text-white font-satoshi-bold"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    //   style={{ fontSize: normalize(16) }}
                  >
                    {item.productName}
                  </Text>

                  <View className="flex-row items-center">
                    <Text
                      className="text-white font-bold"
                      // style={{ fontSize: normalize(18) }}
                    >
                      ₹{Number(item.amount).toFixed(0)}
                    </Text>

                    {Number(item.amount).toFixed(0) !== Number(item.mrp).toFixed(0) && (
                      <Text
                        className="text-gray-300 line-through ml-2"
                        //   style={{ fontSize: normalize(13) }}
                      >
                        ₹{Number(item.mrp).toFixed(0)}
                      </Text>
                    )}

                    {Number(item.discount) > 0 && (
                      <Text
                        className="text-gray-300 ml-2"
                        //   style={{ fontSize: normalize(13) }}
                      >
                        {Number(item.discount)}% off
                      </Text>
                    )}
                  </View>
                </View>

                {/* Buy Button */}
                <TouchableOpacity className="bg-white/[13%] py-2 px-4 rounded-lg self-end">
                  <Text className="text-white font-semibold text-[11px]">Buy Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 5 }}
        onPress={onPressPagination}
      />
    </View>
  );
}

export default BannerCarousel;

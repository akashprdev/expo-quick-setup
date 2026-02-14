import { FlatList, View } from 'react-native';

import PrimaryLayout from '@/components/PrimaryLayout';
import PopularProductsSection from '@/components/home/PopularProductsSection';
import TopBanner from '@/components/home/TopBanner';
import TrendingBrandSection from '@/components/home/TrendingBrandSection';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const homeSections = [
  {
    id: 'topbanner',
    Component: TopBanner,
  },
  {
    id: 'trendingBrand',
    Component: TrendingBrandSection,
  },
  {
    id: 'popularProducts',
    Component: PopularProductsSection,
  },
  // {
  //   id: 'wishlist',
  //   Component: MyWishlistSection,
  //   props: { showPrice: true },
  // },
];
export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <PrimaryLayout>
      <FlatList
        data={homeSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const Section = item.Component;

          return <Section />;
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ marginBottom: Math.max(insets.bottom, 100) }} />}
      />
    </PrimaryLayout>
  );
}

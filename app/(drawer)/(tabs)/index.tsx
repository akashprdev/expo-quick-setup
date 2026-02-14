import { View } from 'react-native';

import PrimaryLayout from '@/components/PrimaryLayout';
import BannerCarousel from '@/components/common/Carousel';
import { useMediaListQuery } from '@/services/queries/customer/MediaList';
import { getMediaPath } from '@/utility/getMediaPath';

export default function HomeScreen() {
  const {
    data,
    isPending: mediaListLoading,
    isError,
  } = useMediaListQuery({
    page: 0,
    pageSize: 3,
    user_type: '2',
    type: 'trending',
  });

  const mediaList = data?.data?.list;
  const bannerData = mediaList?.map((media) => {
    const url = getMediaPath(media.product_image);
    return {
      image: url,
      productName: media.product_name,
      amount: media.final_amount_payable,
      mrp: media.mrp,
      discount: media.discount_percent,
      productId: media.product_id,
    };
  });

  return (
    <PrimaryLayout>
      <View style={{ flex: 1 }}>
        <BannerCarousel data={bannerData ?? []} />
      </View>
    </PrimaryLayout>
  );
}

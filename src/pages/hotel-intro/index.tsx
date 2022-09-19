import { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import { getStoreList } from '@/service/api/hotel-intro';
import Basis from './components/basis';
import Video from './components/video';
import Picture from './components/picture';
import Merchant from './components/merchant';
import Information from './components/information';
import './index.less';

const HotelInfo = () =>  {
  const [info, setInfo] = useState({});

  const fetchStoreList = async () => {
    const res = await getStoreList();
    console.log(res, 444);
  };
  useEffect(() => {
    fetchStoreList();
  }, []);

  return (
    <View className='m-hotel-intro'>
      <View className='bg'></View>
      <View className='u-title'>
        <View className='cover'></View>
      </View>

      {/* 酒店名字、位置 */}
      <Basis />
      {/* 酒店视频 */}
      <Video />
      {/* 酒店图片 */}
      <Picture />
      {/* 酒店资质 */}
      <Merchant />
      {/* 商户信息 */}
      <Information />

    </View>
  );
};

export default HotelInfo;

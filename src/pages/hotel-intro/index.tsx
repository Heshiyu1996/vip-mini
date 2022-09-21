import { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import { getStoreList } from '@/service/api/hotel-intro';
import Basis from './components/basis';
import Video from './components/video';
import IntroItem from './components/intro-item';
import './index.less';

const HotelInfo = () =>  {
  const [info, setInfo] = useState([]);

  const fetchStoreList = async () => {
    const res = await getStoreList();
    setInfo(res);
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
      {
        info?.map((item) => <IntroItem data={item} />)
      }
    </View>
  );
};

export default HotelInfo;

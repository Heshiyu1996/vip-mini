import { Component, PropsWithChildren } from 'react';
import { View } from '@tarojs/components';
import Basis from './components/basis';
import Video from './components/video';
import Picture from './components/picture';
import Merchant from './components/merchant';
import Information from './components/information';
import './index.less';

export default class HotelInfo extends Component<PropsWithChildren> {
  render () {
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
  }
}

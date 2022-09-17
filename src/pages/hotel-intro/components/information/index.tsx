import { Component } from 'react';
import { View, Text } from '@tarojs/components';
import './index.less';

export default class Information extends Component {
  render () {
    return (
      <View className='u-information'>
        <View className='u-title'>商户信息</View>
        <View className='u-content'>
          <Text className='text'>翔顺金水台温泉酒店位于水台镇双和公路南侧；翔顺金水台温泉特色小镇，国家AAAA级旅游景区，位于六祖惠能的故乡——广东禅都新兴，与鹤山、开平、高明、江门四市县接壤，交通便利。其中，新温泉酒店公寓建有800多间特色客房，设有水式、禅式、中式、东南亚式四种主题，并配套金水轩自助餐厅、豪华包间、多功能宴会厅、健身房、瑜伽室等，满足各类客人的多种度假需求。</Text>
        </View>
      </View>
    );
  }
}

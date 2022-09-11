import { Component } from 'react';
import { View } from '@tarojs/components';
import './index.less';

export default class Service extends Component {
  render () {
    return (
      <View className='u-service'>
        <View className='item-wrapper'>
          <View className='label'>会员等级</View>
          <View className='sub-label'>了解优惠折扣</View>
          <View className='icon vip' />
        </View>

        <View className='item-wrapper'>
          <View className='label'>酒店简介</View>
          <View className='sub-label'>提前了解酒店</View>
          <View className='icon hotel' />
        </View>

        <View className='item-wrapper'>
          <View className='label'>联系客服</View>
          <View className='sub-label'>咨询现场客服</View>
          <View className='icon contract' />
        </View>
      </View>
    );
  }
}

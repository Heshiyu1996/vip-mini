import { Component } from 'react';
import { View } from '@tarojs/components';
import './index.less';

export default class Facility extends Component {
  render () {
    return (
      <View className='u-facility'>
        <View className='u-title'>酒店设施</View>
        <View className='u-content'>
          <View className='item-wrapper main'>
            <View className='label'>玩美周末 · 趣玩一夏</View>
            <View className='poster'></View>
          </View>

          <View className='item-wrapper vertical'>
            <View className='sub-item-wrapper'>
              <View className='label'>美食</View>
              <View className='poster'></View>
            </View>
            <View className='sub-item-wrapper'>
              <View className='label'>购物</View>
              <View className='poster'></View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

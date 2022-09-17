import { Component } from 'react';
import { View, Image } from '@tarojs/components';
import './index.less';

export default class Merchant extends Component {
  render () {
    return (
      <View className='u-merchant'>
        <View className='u-title'>酒店资质</View>
        <View className='u-content'>
          <Image
            className='item'
            src='https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67'
          />
        </View>
      </View>
    );
  }
}

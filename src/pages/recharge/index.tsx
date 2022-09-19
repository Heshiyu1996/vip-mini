import { Component } from 'react';
import { View, Text } from '@tarojs/components';
import './index.less';

export default class PageRecharge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: '',
      mobileNum: ''
    };
  }

  render () {
    return (
      <View className='m-page-recharge'>
        <View className='title'>会员卡充值</View>
        <View className='u-balance'>
          <Text className='label'>账户余额</Text>
          <Text className='value'>9931</Text>
          <Text className='btn-history'>充值历史</Text>
        </View>

        <View className='price-wrapper'>
          <View className='item'>10000元</View>
          <View className='item'>20000元</View>
          <View className='item'>30000元</View>
        </View>
      </View>
    );
  }
}

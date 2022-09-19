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
          <View className='item active'>10000元</View>
          <View className='item'>20000元</View>
          <View className='item'>30000元</View>
        </View>

        <View className='right-wrapper'>
          <View className='item'>
            <View className='icon'></View>
            <View className='label'>赠送优惠券</View>
            <View className='desc'>5张</View>
          </View>
          <View className='item'>
            <View className='icon'></View>
            <View className='label'>赠送优惠券</View>
            <View className='desc'>5张</View>
          </View>
          <View className='item'>
            <View className='icon'></View>
            <View className='label'>赠送优惠券</View>
            <View className='desc'>5张</View>
          </View>
          <View className='item'>
            <View className='icon'></View>
            <View className='label'>赠送优惠券</View>
            <View className='desc'>5张</View>
          </View>
          <View className='item'>
            <View className='icon'></View>
            <View className='label'>赠送优惠券</View>
            <View className='desc'>5张</View>
          </View>
        </View>

        <View className='footer'>
          <View className='btn-recharge'>立即充值</View>

          <View className='notice'>
            <View>说明:</View>
            <View>1. 线上充值暂支持 10000元、20000元、50000元 三类面额，若单笔大于5万（不含）请前往线下门店</View>
          </View>
        </View>
      </View>
    );
  }
}

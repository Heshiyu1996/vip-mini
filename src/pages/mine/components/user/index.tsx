import { Component } from 'react';
import { View } from '@tarojs/components';
import './index.less';

export default class User extends Component {
  render () {
    return (
      <View className='u-mine-user'>
        <View className='u-info'>
          <View className='avatar mock'></View>
          <View className='nickname mock'>小柯</View>
          <View className='phone'>
            139****1234
          </View>
        </View>

        <View className='u-content'>
          <View className='vip'></View>
          <View className='wallet-wrapper'>
            <View className='balance-wrapper'>
              <View className='item'>
                <View className='value'>10,0000</View>
                <View className='label'>余额</View>
              </View>
              <View className='item'>
                <View className='value'>16</View>
                <View className='label'>积分</View>
              </View>
            </View>
            <View className='service'>
              <View className='title'>我的服务</View>
              <View className='btn-wrapper'>
                <View className='btn'>
                  <View className='icon recharge'></View>
                  <View className='label'>充值</View>
                </View>
                <View className='btn'>
                  <View className='icon recharge-list'></View>
                  <View className='label'>充值记录</View>
                </View>
                <View className='btn'>
                  <View className='icon consumption-list'></View>
                  <View className='label'>消费记录</View>
                </View>
                <View className='btn'>
                  <View className='icon contract'></View>
                  <View className='label'>联系客服</View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

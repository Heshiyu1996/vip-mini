import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.less';

const Service = () => {
  const doCall = () => {
    Taro.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    });
  };
  return (
    <View className='u-service'>
      <View className='item-wrapper' onClick={() => Taro.navigateTo({ url: `/pages/recharge/index` })}>
        <View className='label'>会员等级</View>
        <View className='sub-label'>了解优惠折扣</View>
        <View className='icon vip' />
      </View>

      <View className='item-wrapper' onClick={() => Taro.navigateTo({ url: `/pages/hotel-intro/index` })}>
        <View className='label'>酒店简介</View>
        <View className='sub-label'>提前了解酒店</View>
        <View className='icon hotel' />
      </View>

      <View className='item-wrapper' onClick={doCall}>
        <View className='label'>联系客服</View>
        <View className='sub-label'>咨询现场客服</View>
        <View className='icon contract' />
      </View>
    </View>
  );
};

export default Service;

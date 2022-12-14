import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { SERVICE_PHONE_NUMBER } from '@/utils/config';
import './index.less';

const Basis = () => {
  const goMap = () => {
    Taro.openLocation({
      latitude: 22.609399,
      longitude: 112.475393,
      name: '翔顺金水台温泉特色小镇',
      address: '广东省云浮市新兴县水台镇翔顺金水台温泉特色小镇',
      scale: 28
    });
  };

  const doCall = () => {
    Taro.makePhoneCall({
      phoneNumber: SERVICE_PHONE_NUMBER
    });
  };

  return (
    <View className='u-basis'>
      <View className='name'>翔顺金水台温泉特色小镇</View>
      <View className='address'>广东省云浮市新兴县水台镇翔顺金水台温泉特色小镇</View>
      <View className='btn-wrapper'>
        <View className='btn btn-map' onClick={goMap}>
          <View className='icon map'></View>
          <View>地图</View>
        </View>
        <View className='btn btn-phone' onClick={doCall}>
          <View className='icon phone'></View>
          <View>电话</View>
        </View>
      </View>
    </View>
  );
};

export default Basis;

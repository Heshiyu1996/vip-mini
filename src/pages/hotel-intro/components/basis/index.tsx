import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.less';

const Basis = () => {
  const goMap = () => {
    window.open('https://surl.amap.com/2VnasEaYe29');
  };

  const doCall = () => {
    Taro.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
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
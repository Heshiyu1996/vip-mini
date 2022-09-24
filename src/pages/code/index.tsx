import { View } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { QRCode } from 'taro-code';
import type CustomTabBar from '../../custom-tab-bar';
import './index.less';

const PageCode = () => {
  
  useDidShow(() => {
    const pageCtx = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar<CustomTabBar>(pageCtx);
    tabbar?.setSelected(2);
  });

  return (
    <View className='m-code'>
      <View className='bg'></View>
      <View className='code-wrapper'>
        <View className='logo'></View>
        <View className='qrcode'>
          <QRCode
            // TODO: 会员ID
            text='1'
            size={200}
            scale={4}
            errorCorrectLevel='M'
            typeNumber={2}
          />
        </View>
        <View className='tip'>会员码每 30 秒自动更新</View>

        <View className='divide' />

        <View className='integral-wrapper'>
          <View className='poster'></View>
          <View className='tip'>门店扫码付款后可累积积分</View>
        </View>
      </View>
        
      <View className='by'>金水台VIP</View>
      <View className='bg-icon' />
    </View>
  );
};

export default PageCode;

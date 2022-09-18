import Taro, { useDidShow } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import type CustomTabBar from '../../custom-tab-bar';
import './index.less';

const PageBook = () => {
  
  useDidShow(() => {
    const pageCtx = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar<CustomTabBar>(pageCtx);
    tabbar?.setSelected(1);
  }, []);

  return (
    <View className='m-book'>
      <View className='room-list'>
        <View className='item'>
          <View className='img' />
          <View className='info'>
            <View className='type'>高级大床房</View>
            <View className='desc'>35㎡ 有窗 大床1.8m（1张）</View>
            <View className='icon down' />
            <View className='price-wrapper'>
              <Text className='price origin'>949</Text>
              <Text className='price current'>949</Text>
            </View>
            <View className='tag'>金礼卡9.5折</View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default PageBook;
import Taro, { useDidShow } from '@tarojs/taro';
import { View } from '@tarojs/components';
import type CustomTabBar from '../../custom-tab-bar';
import './index.less';

const PageOrder = () => {
  
  useDidShow(() => {
    const pageCtx = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar<CustomTabBar>(pageCtx);
    tabbar?.setSelected(3);
  }, []);

  return (
    <View className='m-order'>
      <View className='order-list'>
        <View className='item'>
          <View className='img' />
          <View className='info'>
            <View className='type'>客房预订</View>
            <View className='desc'>1F餐厅</View>
            <View className='status'>已完成</View>
            <View className='price'>949</View>
            <View className='btn-delete'>删除</View>
          </View>
        </View>
        <View className='item'>
          <View className='img' />
          <View className='info'>
            <View className='type'>客房预订</View>
            <View className='desc'>1F餐厅</View>
            <View className='status'>已完成</View>
            <View className='price'>949</View>
            <View className='btn-delete'>删除</View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default PageOrder;
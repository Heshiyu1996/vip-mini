import Taro, { useDidShow } from '@tarojs/taro';
import { View } from '@tarojs/components';
import User from './components/user';
import Book from './components/book';
import Service from './components/service';
import Facility from './components/facility';
import type CustomTabBar from '../../custom-tab-bar';
import './index.less';

const Index = () => {
  
  useDidShow (() => {
    const pageCtx = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar<CustomTabBar>(pageCtx);
    tabbar?.setSelected(0);
  }); 

  return (
    <View className='m-index'>
      <View className='bg'></View>
      <View className='u-title'>
        <View className='cover'></View>
      </View>
        
      <User />
      <Book />
      <Service />
      <Facility />

    </View>
  );
};

export default Index;

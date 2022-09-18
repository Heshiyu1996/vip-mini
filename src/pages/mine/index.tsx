import Taro, { useDidShow } from '@tarojs/taro';
import { View } from '@tarojs/components';
import User from './components/user';
import type CustomTabBar from '../../custom-tab-bar';
import './index.less';

const PageMine = () => {
  
  useDidShow(() => {
    const pageCtx = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar<CustomTabBar>(pageCtx);
    tabbar?.setSelected(4);
  }, []);

  return (
    <View className='m-mine'>
      <User />
    </View>
  );
};
export default PageMine;
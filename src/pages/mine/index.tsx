import Taro, { useDidShow } from '@tarojs/taro';
import { View } from '@tarojs/components';
import User from './components/user';
import type CustomTabBar from '../../custom-tab-bar';
import './index.less';

const { statusBarHeight } = Taro.getSystemInfoSync();
const { height } = Taro.getMenuButtonBoundingClientRect();
const titleBarHeight = statusBarHeight + height;

const PageMine = () => {
  useDidShow(() => {
    const pageCtx = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar<CustomTabBar>(pageCtx);
    tabbar?.setSelected(4);
  });

  return (
    <View className='m-mine' style={{ paddingTop: `${titleBarHeight}px` }}>
      <User />
    </View>
  );
};
export default PageMine;
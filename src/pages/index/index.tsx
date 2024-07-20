import Taro, { useDidShow } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { getToday, getTomorrow } from '@/utils/tool';
import User from './components/user';
import Book from './components/book';
import Service from './components/service';
import Activity from './components/activity';
import type CustomTabBar from '../../custom-tab-bar';
import './index.less';

const today = getToday();
const tomorrow = getTomorrow();

const Index = () => {
  useDidShow (() => {
    const pageCtx = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar<CustomTabBar>(pageCtx);
    tabbar?.setSelected(0);
  }); 

  const goToBook = (startDate, endDate) => {
    if (!startDate || !endDate) {
      Taro.showToast({
        title: '请填写入住、离店日期',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 记录参数到 storage 以便剞劂 switch 不能携带参数问题
    Taro.setStorageSync('startDate', startDate);
    Taro.setStorageSync('endDate', endDate);

    Taro.switchTab({ url: '/pages/book/index' });
  };

  return (
    <View className='m-index'>
      <View className='u-title'>
        <View className='cover'></View>
      </View>
        
      <User />
      <Book className='item-book' defaultStartDate={today} defaultEndDate={tomorrow} btnText='立即预约' onSearch={goToBook} />
      <Service />
      <Activity />

    </View>
  );
};

export default Index;

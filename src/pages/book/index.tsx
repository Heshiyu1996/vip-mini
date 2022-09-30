import { useEffect, useRef, useState } from 'react';
import Taro, { useDidHide, useDidShow } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { getRoomList } from '@/service/api/book';
import { getToday } from '@/utils/tool';
import type CustomTabBar from '../../custom-tab-bar';
import Book from '../index/components/book';
import './index.less';

const today = getToday();
const { statusBarHeight } = Taro.getSystemInfoSync();
const { height } = Taro.getMenuButtonBoundingClientRect();
const titleBarHeight = statusBarHeight + height + 10;

const DefaultImg = 'https://vip.gdxsjt.com/medias/uploads/room_room-config_20220823222146_e97996.png';

const PageBook = () => {
  const [defaultStartDate, setDefaultStartDate] = useState('');
  const [defaultEndDate, setDefaultEndDate] = useState('');
  const [list ,setList] = useState([]);
  const refCurrentPage = useRef(1);
  const fetchBookList = async (startDate, endDate) => {
    if (startDate === endDate) {
      Taro.showToast({
        title: '入住、离店不能为同一天',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    const params = {
      startDate,
      endDate,
    };
    const data = await getRoomList(params);
    // 更新list
    const newList = data;
    setList(newList);
    // 更新当前页码
    refCurrentPage.current++;
  };
  useEffect(() => {
    if (defaultStartDate && defaultEndDate) {
      fetchBookList(defaultStartDate, defaultEndDate);
    }
  }, [defaultStartDate, defaultEndDate]);

  const goToDetail = (id) => {
    Taro.navigateTo({ url: `/pages/book-detail/index?id=${id}&startDate=${defaultStartDate}&endDate=${defaultEndDate}` });
  };
  
  useDidShow(() => {
    const pageCtx = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar<CustomTabBar>(pageCtx);
    tabbar?.setSelected(1);
  });

  useDidShow(() => {
    const startDate = Taro.getStorageSync('startDate') || today;
    const endDate = Taro.getStorageSync('endDate');

    // Taro.removeStorageSync('startDate');
    // Taro.removeStorageSync('endDate');

    setDefaultStartDate(startDate);
    setDefaultEndDate(endDate);
  });

  useDidHide(() => {
    setDefaultStartDate('');
    setDefaultEndDate('');
  });

  const onChange = (startDate, endDate) => {
    setDefaultStartDate(startDate);
    setDefaultEndDate(endDate);

    // 记录参数到 storage 以便剞劂 switch 不能携带参数问题
    Taro.setStorageSync('startDate', startDate);
    Taro.setStorageSync('endDate', endDate);
  };

  return (
    <View className='m-book' style={{ paddingTop: `${titleBarHeight}px` }}>
      <Book 
        className='book-selector'
        defaultStartDate={defaultStartDate}
        defaultEndDate={defaultEndDate}
        visibleBtn={false}
        onChange={onChange}
        onSearch={fetchBookList}
      />

      <View className='room-list'>
        {
          list?.map((item) => 
            <View key={item.id} className='item' onClick={() => goToDetail(item.id)}>
              <Image className='img' src={item.images?.[0] || DefaultImg} />
              <View className='info'>
                <View className='type'>{item.roomType}</View>
                <View className='desc'>{item.roomFacility}</View>
                {/* <View className='icon down' /> */}
                <View className='price-wrapper'>
                  {(item.currentPrice !== item.originPrice) && <Text className='price origin'>{item.originPrice}</Text>}
                  <Text className='price current'>{item.currentPrice}</Text>
                </View>
                {!!item.tag && <View className='tag'>{item.tag}</View>}
              </View>
            </View>)
        }
      </View>
    </View>
  );
};
export default PageBook;
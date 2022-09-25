import { useEffect, useRef, useState } from 'react';
import Taro, { useDidShow } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { getRoomList } from '@/service/api/book';
import type CustomTabBar from '../../custom-tab-bar';
import './index.less';

const { statusBarHeight } = Taro.getSystemInfoSync();
const { height } = Taro.getMenuButtonBoundingClientRect();
const titleBarHeight = statusBarHeight + height;

const DefaultImg = 'https://vip.gdxsjt.com/medias/uploads/room_room-config_20220823222146_e97996.png';

const PageBook = () => {
  const [list ,setList] = useState([]);
  const refCurrentPage = useRef(1);
  const fetchBookList = async () => {
    const params = {
      startDate: '2022-09-25',
      endDate: '2022-09-26',
    };
    const data = await getRoomList(params);
    // 更新list
    const newList = data;
    setList(newList);
    // 更新当前页码
    refCurrentPage.current++;
  };
  useEffect(() => {
    fetchBookList();
  }, []);
  
  useDidShow(() => {
    const pageCtx = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar<CustomTabBar>(pageCtx);
    tabbar?.setSelected(1);
  });

  return (
    <View className='m-book' style={{ paddingTop: `${titleBarHeight}px` }}>
      <View className='room-list'>
        {
          list?.map((item) => 
            <View key={item.id} className='item'>
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
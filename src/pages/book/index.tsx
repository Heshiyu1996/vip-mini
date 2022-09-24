import { useEffect, useMemo, useRef, useState } from 'react';
import Taro, { useDidShow } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { getRoomList } from '@/service/api/book';
import type CustomTabBar from '../../custom-tab-bar';
import './index.less';

const PageBook = () => {
  const [list ,setList] = useState([]);
  const refCurrentPage = useRef(1);
  const refTotal = useRef(1);
  const fetchOrderList = async (isNew?) => {
    const currentPage = isNew ? 1 : refCurrentPage.current;
    const params = {
      currentPage,
      pageSize: 10
    };
    const res = await getRoomList(params);
    const { list: data, total } = res || {};
    // 记录总数
    refTotal.current = total;
    // 更新list
    const newList = list.concat(data);
    setList(newList);
    // 更新当前页码
    refCurrentPage.current++;
  };
  useEffect(() => {
    fetchOrderList(true);
  }, []);

  const hasMore = useMemo(() => {
    return list?.length < refTotal.current;
  }, [list, refTotal.current]);

  
  useDidShow(() => {
    const pageCtx = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar<CustomTabBar>?.(pageCtx);
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
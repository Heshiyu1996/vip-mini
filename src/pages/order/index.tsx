import { useEffect, useState, useRef, useMemo } from 'react';
import Taro, { useDidShow, useReachBottom } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { getOrderList, deleteOrder } from '@/service/api/order';
import Empty from '@/components/empty';
import type CustomTabBar from '../../custom-tab-bar';
import './index.less';

const { statusBarHeight } = Taro.getSystemInfoSync();
const { height } = Taro.getMenuButtonBoundingClientRect();
const titleBarHeight = statusBarHeight + height;

const PageOrder = () => {

  const [list ,setList] = useState([]);
  const refCurrentPage = useRef(1);
  const refTotal = useRef(1);
  const fetchOrderList = async (isNew?) => {
    const currentPage = isNew ? 1 : refCurrentPage.current;
    const params = {
      currentPage,
      pageSize: 10
    };
    const res = await getOrderList(params);
    // const { list: data, total } = res || {};
    const total = 10;
    const data = [
      {
        "id": 4,
        "vipCardName": "朱先生",
        "vipCardId": 3,
        "roomTypeId": 4,
        "roomType": "adf",
        "orderDays": 3,
        "orderStartDate": "2022-08-19 12:00:00",
        "orderEndDate": "2022-08-20 14:00:00",
        "transactionChannelId": 1,
        "transactionChannel": "微信",
        "orderStatusCode": "ACCEPTED",
        "orderStatus": "已确认",
        "totalPrice": 1111.8,
        "coverImage": "https://vip.gdxsjt.com/medias/uploads/room_room-config_20220829151239_a9b81b.jpg"
      },
      {
        "id": 3,
        "vipCardName": "朱先生",
        "vipCardId": 3,
        "roomTypeId": 4,
        "roomType": "adf1",
        "orderDays": 3,
        "orderStartDate": "2022-08-21 12:00:00",
        "orderEndDate": "2022-08-25 14:00:00",
        "transactionChannelId": 1,
        "transactionChannel": "微信",
        "orderStatusCode": "ACCEPTED",
        "orderStatus": "已确认",
        "totalPrice": 33.33,
        "coverImage": "https://vip.gdxsjt.com/medias/uploads/room_room-config_20220825214903_0f9e06.png"
      }
    ];
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

  const removeOrder = async (id) => {
    try {
      const res = await deleteOrder({ id });
      if (res) {
        Taro.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        });
        fetchOrderList();
      }
    } catch (error) {
      console.log(error, 4123);
    }
  };

  useReachBottom(() => {
    // 是否还可加载
    if (hasMore) {
      fetchOrderList();
    }
  });
  
  useDidShow(() => {
    const pageCtx = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar<CustomTabBar>(pageCtx);
    tabbar?.setSelected(3);
  });

  return (
    <View className='m-order' style={{ paddingTop: `${titleBarHeight + 10}px` }}>
      <View className='order-list'>
        {
          list?.length ?
            <View>
              {list?.map((item) => 
                <View key={item.id} className='item'>
                  <Image className='img' src={item.coverImage} />
                  <View className='info'>
                    <View className='type'>{item.roomType}</View>
                    <View className='desc'>
                      <View>到店: {item.orderStartDate}</View>
                      <View>离店: {item.orderEndDate}</View>
                    </View>
                    <View className='status'>{item.orderStatus}</View>
                    <View className='price'>{item.totalPrice}</View>
                    <View className='btn-delete' onClick={() => removeOrder(item.id)}>删除</View>
                  </View>
                </View>)}

              {hasMore ? 
                <View className='tip' onClick={() => fetchOrderList()}>加载更多</View> : 
                <View className='tip'>没有更多了</View>
              }
            </View>
            :
            <Empty className='empty-wrapper' />
        }
      </View>
    </View>
  );
};
export default PageOrder;
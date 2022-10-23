import { useEffect, useState, useRef, useMemo } from 'react';
import { AtTabs } from 'taro-ui';
import Taro, { useDidShow, useReachBottom } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { getOrderList, deleteOrder, applyRefundOrder } from '@/service/api/order';
import Empty from '@/components/empty';
import type CustomTabBar from '../../custom-tab-bar';
import './index.less';

const { statusBarHeight } = Taro.getSystemInfoSync();
const { height } = Taro.getMenuButtonBoundingClientRect();
const titleBarHeight = statusBarHeight + height;
const tabList = [
  { title: '全部', },
  { title: '待确认' },
  { title: '已确认' }, 
  { title: '已拒绝' },
];
const tabCodeMap = ['', 'NEW', 'ACCEPTED', 'REJECTED', ];

const PageOrder = () => {
  const [list ,setList] = useState([]);
  const refCurrentPage = useRef(1);
  const refTotal = useRef(1);
  const fetchOrderList = async (isNew?, orderStatusCode = tabCodeMap[0]) => {
    const currentPage = isNew ? 1 : refCurrentPage.current;
    const params = {
      currentPage,
      pageSize: 10,
      orderStatusCode,
    };
    const res = await getOrderList(params);
    const { list: data, total } = res || {};
    // 记录总数
    refTotal.current = total;
    // 更新list
    const newList = isNew ? data : list.concat(data);
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

  const beforeRemove = (id) => {
    Taro.showModal({
      title: '请确认',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) {
          removeOrder(id);
        }
      }
    });    
  };
  const removeOrder = async (id) => {
    Taro.showLoading({
      title: '正在删除...',
    });
    try {
      await deleteOrder({ id });
      Taro.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 2000
      });
      fetchOrderList(true);
      Taro.hideLoading();
    } catch (error) {
      console.log(error, 4123);
    }
  };

  const beforeRefund = (id) => {
    Taro.showModal({
      title: '请确认',
      content: '是否申请退款？',
      success: function (res) {
        if (res.confirm) {
          refundOrder(id);
        }
      }
    });    
  };
  const refundOrder = async (id) => {
    Taro.showLoading({
      title: '正在申请...',
    });
    try {
      await applyRefundOrder({ id });
      Taro.showToast({
        title: '申请成功，请留意退款状态',
        icon: 'success',
        duration: 2000
      });
      fetchOrderList(true);
      Taro.hideLoading();
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

  const [current, setCurrent] = useState(0);
  const onClick = (index) => {
    setCurrent(index);
    const status = tabCodeMap[index];
    fetchOrderList(true, status);
  };

  return (
    <View className='m-order'>
      <View style={{ marginTop: `${titleBarHeight + 10}px` }}>
        <AtTabs className='u-tabs' current={current} tabList={tabList} onClick={onClick} />
      </View>

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
                    <View className='btn-wrapper'>
                      <View className='btn btn-refund' onClick={() => beforeRefund(item.id)}>申请退款</View>
                      <View className='btn btn-remove' onClick={() => beforeRemove(item.id)}>删除</View>
                    </View>
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
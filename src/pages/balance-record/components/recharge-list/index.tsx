import { useState, useRef, useEffect, useMemo } from 'react';
import { useReachBottom } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { getRechargeList } from '@/service/api/recharge';
import Empty from '@/components/empty';
import { RechargeChannelMap } from '../../type';
import './index.less';

const RechargeList = () => {
  const [list ,setList] = useState([]);
  const refCurrentPage = useRef(1);
  const refTotal = useRef(1);
  const fetchRechargeList = async (isNew?) => {
    const currentPage = isNew ? 1 : refCurrentPage.current;
    const params = {
      currentPage,
      pageSize: 10
    };
    const res = await getRechargeList(params);
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
    fetchRechargeList(true);
  }, []);
  useReachBottom(() => {
    // 是否还可加载
    if (hasMore) {
      fetchRechargeList();
    }
  });

  const hasMore = useMemo(() => {
    return list?.length < refTotal.current;
  }, [list, refTotal.current]);

  return (
    <View className='u-recharge-list'>
      {
        list?.length ?
          <View>
            {list?.map((item) => 
              <View key={item.id} className='item'>
                <View className='channel'>{RechargeChannelMap[item.channel]}充值</View>
                <View className='time'>{item.createTime || '-'}</View>
                <View className='price'>
                  {item.amount}
                </View>
              </View>)}
            {hasMore ? 
              <View className='tip' onClick={() => fetchRechargeList()}>加载更多</View> : 
              <View className='tip'>没有更多了</View>
            }
          </View>
          : 
          <Empty className='empty-wrapper' />
      }
    </View>
  );
};
export default RechargeList;
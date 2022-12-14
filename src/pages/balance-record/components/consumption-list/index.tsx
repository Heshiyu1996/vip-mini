import { useState, useRef, useEffect, useMemo } from 'react';
import { useReachBottom } from '@tarojs/taro';
import { getConsumptionList } from '@/service/api/recharge';
import { View } from '@tarojs/components';
import Empty from '@/components/empty';
import { RechargeChannelMap } from '../../type';
import './index.less';

const ConsumptionList = () => {
  const [list ,setList] = useState([]);
  const refCurrentPage = useRef(1);
  const refTotal = useRef(1);
  const fetchConsumptionList = async (isNew?) => {
    const currentPage = isNew ? 1 : refCurrentPage.current;
    const params = {
      currentPage,
      pageSize: 10
    };
    const res = await getConsumptionList(params);
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
    fetchConsumptionList(true);
  }, []);
  useReachBottom(() => {
    // 是否还可加载
    if (hasMore) {
      fetchConsumptionList();
    }
  });

  const hasMore = useMemo(() => {
    return list?.length < refTotal.current;
  }, [list, refTotal.current]);

  return (
    <View className='u-consumption-list'>
      {
        list?.length ?
          <View>
            {list?.map((item) => 
              <View key={item.id} className='item'>
                <View className='channel'>{item.assetsTypeText}</View>
                <View className='time'>{item.createTime || '-'}</View>
                <View className='price'>
                  {item.amount}
                </View>
              </View>)}
            {hasMore ? 
              <View className='tip' onClick={() => fetchConsumptionList()}>加载更多</View> : 
              <View className='tip'>没有更多了</View>
            }
          </View>
          : 
          <Empty className='empty-wrapper' />
      }
    </View>
  );
};
export default ConsumptionList;
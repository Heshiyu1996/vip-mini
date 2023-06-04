import { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { getPointGiftList } from '@/service';
import { useReachBottom } from '@tarojs/taro';
import './index.less';

const defaultImage = 'https://vip.gdxsjt.com/medias/uploads/null_mp_20220930105542_0ef927.png';

const Activity = () => {
  const [list, setList] = useState([]);
  const refTotal = useRef(1);
  const refCurrentPage = useRef(1);

  const fetchData = async () => {
    const currentPage = refCurrentPage.current;

    const params = {
      currentPage,
      pageSize: 10,
    };
    const { total, list: data } = await getPointGiftList(params);

    // 记录总数
    refTotal.current = total;
    if (total > 0) {
    // 更新list
      const newList = list.concat(data);
      setList(newList);
      // 更新当前页码
      refCurrentPage.current++;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const hasMore = useMemo(() => {
    return list?.length < refTotal.current;
  }, [list, refTotal.current]);
  
  useReachBottom(() => {
    // 是否还可加载
    if (hasMore) {
      fetchData();
    }
  });

  const exchange = () => {

  };


  return (
    <View className='u-gift-list'>
      <View className='u-title'>礼品兑换</View>
      <View className='u-content'>
        {
          list?.map((item) => {
            const isSellout = item?.restBalance === 0;

            return <View key={item.id} className={`item-wrapper ${isSellout ? 'is-sellout' : ''}`}>
              <Image className='poster' src={item?.images?.[0] || defaultImage} />
              <View className='label'>{item.itemName}</View>
              <View className='btn-exchange' onClick={!isSellout ? exchange : () => null}>
                <Text className='price'>{item?.points}积分</Text>
                <Text className='action'>兑换</Text>
              </View>
              <View className='btn-already-amount'>已兑换 {item?.sold} 件</View>
            </View>;
          })
        }
        { hasMore ? 
          <View className='tip' onClick={() => fetchData()}>加载更多</View> : 
          <View className='tip'>没有更多了</View>}
      </View>
    </View>
  );
};

export default Activity;

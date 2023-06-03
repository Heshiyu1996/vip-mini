import { useEffect, useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { getPointGiftList } from '@/service';
import './index.less';

const defaultImage = 'https://vip.gdxsjt.com/medias/uploads/null_mp_20220930105542_0ef927.png';

const Activity = () => {
  const [data, setData] = useState();

  const fetchData = async () => {
    const params = {
      currentPage: 1,
      pageSize: 10,
    };
    const res = await getPointGiftList(params);
    if (res.total > 0) {
      setData(res?.list);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View className='u-gift-list'>
      <View className='u-title'>礼品兑换</View>
      <View className='u-content'>
        {
          data?.map((item) => <View key={item.id} className='item-wrapper'>
            <Image className='poster' src={item?.images?.[0] || defaultImage} />
            <View className='label'>{item.itemName}</View>
            <View className='btn-exchange'>
              <Text className='price'>{item?.points}积分</Text>
              <Text className='action'>兑换</Text>
            </View>
            <View className='btn-already-amount'>已兑换 {item?.sold} 件</View>
          </View>)
        }
      </View>
    </View>
  );
};

export default Activity;

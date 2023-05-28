import { useEffect, useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { getActivityList } from '@/service';
import './index.less';
import Taro from '@tarojs/taro';

const defaultImage = 'https://vip.gdxsjt.com/medias/uploads/null_mp_20220930105542_0ef927.png';

const Activity = () => {
  const [data, setData] = useState();

  // TODO: mock数据
  const fetchData = async () => {
    setData([
      { title: '公仔1' },
      { title: '公仔2' },
      { title: '公仔3' }
    ]);
  };

  // const fetchData = async () => {
  //   const params = {
  //     currentPage: 1,
  //     pageSize: 10,
  //   };
  //   const res = await getActivityList(params);
  //   if (res.total > 0) {
  //     setData(res?.list);
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, []);

  const goPage = (link) => {
    Taro.navigateTo({ url: `/pages/web-view/index?link=${link}` });
  };

  return (
    <View className='u-gift-list'>
      <View className='u-title'>礼品兑换</View>
      <View className='u-content'>
        {
          data?.map((item) => <View key={item.id} className='item-wrapper'>
            <Image className='poster' src={item?.image} />
            <View className='label'>{item.title}</View>
            <View className='btn-exchange'>
              <Text className='price'>998积分</Text>
              <Text className='action'>兑换</Text>
            </View>
            <View className='btn-already-amount'>已兑换1101件</View>
          </View>)
        }
      </View>
    </View>
  );
};

export default Activity;

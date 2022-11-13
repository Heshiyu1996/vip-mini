import { useEffect, useState } from 'react';
import { View, Image } from '@tarojs/components';
import { getActivityList } from '@/service';
import './index.less';
import Taro from '@tarojs/taro';

const defaultImage = 'https://vip.gdxsjt.com/medias/uploads/null_mp_20220930105542_0ef927.png';

// const news = [
//   {
//     title: '定了！十一假期就去这！热气球嘉年华、三料珍稀真温泉···换个角度看世界',
//     image: 'https://vip.gdxsjt.com/medias/uploads/null_mp_20220930105542_0ef927.png',
//     link: ''
//   },
//   {
//     title: '国庆嘉年华！浪漫热气球之旅，加码6大惊喜，连住优惠套票！速度上车！',
//     image: 'https://vip.gdxsjt.com/medias/uploads/null_mp_20220930105805_7e2c16.png',
//     link: ''
//   },
//   {
//     title: '国庆嘉年华！浪漫热气球之旅，加码6大惊喜，连住优惠套票！速度上车！',
//     image: 'https://vip.gdxsjt.com/medias/uploads/null_mp_20220930105805_7e2c16.png',
//     link: ''
//   }
// ];

const Activity = () => {
  const [data, setData] = useState();

  const fetchData = async () => {
    const params = {
      currentPage: 1,
      pageSize: 10,
    };
    const res = await getActivityList(params);
    if (res.total > 0) {
      setData(res?.list);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const goPage = (link) => {
    Taro.navigateTo({ url: `/pages/web-view/index?link=${link}` });
  };

  return (
    <View className='u-activity'>
      <View className='u-title'>最新活动</View>
      <View className='u-content'>
        {
          data?.map((item) => <View key={item.id} className='item-wrapper' onClick={() => goPage(item.link)}>
            <View className='label'>{item.title}</View>
            <Image className='poster' src={item?.image} />
          </View>)
        }
      </View>
    </View>
  );
};

export default Activity;

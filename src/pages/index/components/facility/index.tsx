import { Component } from 'react';
import { View, Image } from '@tarojs/components';
import './index.less';

const news = [
  {
    title: '定了！十一假期就去这！热气球嘉年华、三料珍稀真温泉···换个角度看世界',
    image: 'https://vip.gdxsjt.com/medias/uploads/null_mp_20220930105542_0ef927.png',
    link: ''
  },
  {
    title: '国庆嘉年华！浪漫热气球之旅，加码6大惊喜，连住优惠套票！速度上车！',
    image: 'https://vip.gdxsjt.com/medias/uploads/null_mp_20220930105805_7e2c16.png',
    link: ''
  },
  {
    title: '国庆嘉年华！浪漫热气球之旅，加码6大惊喜，连住优惠套票！速度上车！',
    image: 'https://vip.gdxsjt.com/medias/uploads/null_mp_20220930105805_7e2c16.png',
    link: ''
  }
];

export default class Facility extends Component {
  render () {
    return (
      <View className='u-facility'>
        <View className='u-title'>最新活动</View>
        <View className='u-content'>
          {
            news?.map((item) => <View key={item.link} className='item-wrapper'>
              <View className='label'>{item.title}</View>
              <Image className='poster' src={item.image} />
            </View>)
          }
        </View>
      </View>
    );
  }
}

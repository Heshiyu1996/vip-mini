import { Component } from 'react';
import { View, Image } from '@tarojs/components';
import './index.less';

const ImageList = [
  'https://vip.gdxsjt.com/medias/uploads/null_mp_20220917213812_cdbd97.png',
  'https://vip.gdxsjt.com/medias/uploads/null_mp_20220917213838_bd1aae.png',
  'https://vip.gdxsjt.com/medias/uploads/null_mp_20220917213852_723794.png'
];

export default class Picture extends Component {
  render () {
    return (
      <View className='u-picture'>
        <View className='u-title'>酒店图片</View>
        <View className='u-content'>
          <View className='slide-wrapper'>
            {
              ImageList?.map((item) => <Image className='item' src={item} />)
            }
          </View>
        </View>
      </View>
    );
  }
}

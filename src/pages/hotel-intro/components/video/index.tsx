import { Component } from 'react';
import { View, Video } from '@tarojs/components';
import './index.less';

export default class UVideo extends Component {
  render () {
    return (
      <View className='u-video'>
        <View className='u-title'>酒店视频</View>
        <View className='u-content'>
          <Video
            id='video'
            src='https://vip.gdxsjt.com/medias/uploads/WeChat_20220918001355.mp4'
            poster='https://vip.gdxsjt.com/medias/uploads/null_mp_20220918222805_f50c8e.png'
            initialTime={0}
            controls
            autoplay={false}
            loop={false}
            muted={false}
          />
        </View>
      </View>
    );
  }
}

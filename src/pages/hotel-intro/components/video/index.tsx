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
            src='https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
            poster='https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
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

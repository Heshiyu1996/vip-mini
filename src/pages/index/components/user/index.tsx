import { Component } from 'react';
import { View, Text, OpenData } from '@tarojs/components';
import { AtAvatar, AtIcon } from 'taro-ui';
import './index.less';

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: '',
      mobileNum: ''
    };
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='m-index'>
        <View className='bg'></View>
        <View className='u-title'>
          <View className='cover'></View>
        </View>
        <View className='u-user'>
          {/* 真实环境 */}
          {/* <AtAvatar className='avatar' size='large' circle openData={{ type: 'userAvatarUrl' }}></AtAvatar>
          <OpenData className='nickname' type='userNickName' /> */}
          <View className='avatar mock'></View>
          <View className='nickname mock'>小柯</View>
          <View className='greeting'>
            下午好，尊贵的金臻卡会员
            {/* <AtIcon className='icon-right' value='chevron-right' size='8'></AtIcon> */}
          </View>
        </View>
      </View>
    );
  }
}

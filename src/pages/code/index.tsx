import { Component } from 'react';
import { View  } from '@tarojs/components';
import { QRCode } from 'taro-code';
import './index.less';

const URL = window.location.href;

export default class PageCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: '',
      mobileNum: ''
    };
  }

  render () {
    return (
      <View className='m-code'>
        <View className='bg'></View>
        <div>1</div>
        <View className='code-wrapper'>
          <View className='logo'></View>
          <View className='qrcode'>
            { URL ? <QRCode
              text='world'
              size={200}
              scale={4}
              errorCorrectLevel='M'
              typeNumber={2}
            /> : null }
          </View>
          <View className='tip'>会员码每 30 秒自动更新</View>

          <View className='divide' />

          <View className='integral-wrapper'>
            <View className='poster'></View>
            <View className='tip'>门店扫码付款后可累积积分</View>
          </View>
        </View>
        
        <View className='by'>金水台VIP</View>
        <View className='bg-icon' />
      </View>
    );
  }
}

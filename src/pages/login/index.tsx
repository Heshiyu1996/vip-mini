import Taro from '@tarojs/taro';
import { Component } from 'react';
import { View, Text, Button } from '@tarojs/components';
import { getUserSession } from '@/service';
import { wxGetLoginCode } from '@/utils/wx-tool';

import './index.less';

export default class Login extends Component {
  componentDidMount () {
    // this.initCode();
  }

  initCode = async () => {
    const code = await wxGetLoginCode();

    getUserSession({ code }).then(({ data }) => {
      console.log(data, 123);
      // 更新userSession
      Taro.setStorage({
        key: 'userSession',
        data
      });
    });
  };

  // 微信用户一键登录
  fetUserMobileNumber = async (ev) => {
    console.log(ev, 123);
    const { errMsg } = ev?.detail;
    // 登录失败
    if (errMsg.includes('deny')) {
      Taro.showToast({
        title: '登录失败，请授权后再试',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    const { encryptedData, iv } = ev?.detail;
    // 跳转验证码页
    Taro.navigateTo({ url: `/pages/login/input-code/index?mobileNumber=auth&encryptedData=${encryptedData}&iv=${iv}` });
  };

  render () {
    return (
      <View className='m-login'>
        <View className='u-banner'>
          <View className='img-banner' />
          <View className='title'>金水台VIP</View>
        </View>
        <View className='u-tip'>
          <View className='sub-tip'>授权绑定手机号为您提供更好的服务</View>
        </View>

        <View className='u-operation'>
          {/* 微信用户一键登录 */}
          <Button className='u-wx-login' openType='getPhoneNumber' onGetPhoneNumber={this.fetUserMobileNumber} plain />
          {/* <Button className='u-wx-login' openType='getPhoneNumber' onClick={this.fetUserMobileNumber} plain /> */}

          {/* <View className='u-phone-login' onClick={() => Taro.navigateTo({ url: '/pages/login/input-phone/index' })}>
            <Text>输入手机号码登录/注册</Text>
          </View> */}
        </View>
      </View>
    );
  }
}

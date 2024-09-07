import Taro from '@tarojs/taro';
import { Component } from 'react';
import { View, Button } from '@tarojs/components';
import { getUserSession, checkIfRegistered, associateUserSession, login } from '@/service';
import { wxGetLoginCode } from '@/utils/wx-tool';

import './index.less';

export default class Login extends Component {
  componentDidMount () {
    // 更新 userSession
    this.initCode();
  }

  initCode = async () => {
    const code = await wxGetLoginCode();

    getUserSession({ code }).then((data) => {
      // 更新userSession
      Taro.setStorageSync('userSession', data);
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
    const params = {
      encryptedData,
      iv,
    };

    // 获得用户手机号(用于关联sesssion)
    await associateUserSession(params);

    // 判断是否已注册
    const res = await checkIfRegistered();
    const alreadyRegistered = res;
    
    if (alreadyRegistered) {
      // 调用登录后进入首页
      login().then(() => Taro.switchTab({ url: '/pages/index/index' }));
    } else {
      // 跳转注册页
      Taro.navigateTo({ url: `/pages/auth/register/index` });
    }
  };

  render () {
    return (
      <View className='m-login'>
        <View className='u-banner'>
          <View className='img-banner' />
          <View className='title'>翔顺金水台VIP会员</View>
        </View>
        <View className='u-tip'>
          <View className='sub-tip'>授权绑定手机号为您提供更好的服务</View>
        </View>

        <View className='u-operation'>
          {/* 微信用户一键登录 */}
          <Button className='u-wx-login' openType='getPhoneNumber' onGetPhoneNumber={this.fetUserMobileNumber} plain>
            一键登录
          </Button>
        </View>
      </View>
    );
  }
}

import Taro from '@tarojs/taro';
import { Component } from 'react';
import { View } from '@tarojs/components';
import { AtInput, AtButton } from 'taro-ui';

import './index.less';

interface IState {
  mobileNumber: string
}

const MAX_LENGTH = 11;

export default class PageInputPhone extends Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: ''
    };
  }

  componentDidMount() {
    this.setInputMaxlength();
  }

  setInputMaxlength = () => {
    setTimeout(() => {
      // 兼容TaroUI的Input无法接受maxlength
      const InputElement = document.getElementById('mobileNumber');
      // @ts-ignore
      InputElement.props.maxlength = MAX_LENGTH;
    });
  };

  // 跳转到“验证码”页
  goVerifyCodePage = () => {
    const { mobileNumber } = this.state;
    // 跳转验证码页
    Taro.navigateTo({ url: `/pages/login/input-code/index?mobileNumber=${mobileNumber}` });
  };

  // 修改手机号
  handleChange = (mobileNumber) => {
    this.setState({
      mobileNumber
    });
  };

  render () {
    const { mobileNumber } = this.state;

    return (
      <View className='m-page-input-phone'>
        <View className='header'>
          <View>请输入手机号</View>
          <View className='tip'>为方便取得联系，请输入您的常用手机号码</View>
        </View>

        <View className='content'>
          <AtInput
            clear
            focus
            className='u-input'
            name='mobileNumber'
            // 通过JS兼容TaroUI的Input无法接受maxlength
            // maxlength={MAX_LENGTH}
            border={false}
            type='phone'
            placeholder='11位手机号'
            value={this.state.mobileNumber}
            onChange={this.handleChange}
          />
        </View>

        <View className='footer'>
          <AtButton disabled={mobileNumber.length < MAX_LENGTH} type='primary' onClick={this.goVerifyCodePage}>下一步</AtButton>
        </View>
      </View>
    );
  }
}

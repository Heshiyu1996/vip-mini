import Taro from '@tarojs/taro';
import { Component } from 'react';
import { View, Text } from '@tarojs/components';
import { AtInput, AtButton } from 'taro-ui';
import { debounce } from '@/utils/tool';
import { getVerifyCode, checkIfRegistered, login, regist } from '@/service/api/login';

import './index.less';

const MAX_LENGTH = 4;

interface IState {
  smsCode: string;
  countdown: number;
  encryptedMobileNumber: string;
}

const FULL_TIME = 4;

export default class PageInputCode extends Component<{}, IState> {
  constructor(props) {
    super(props);

    this.state = {
      smsCode: '',
      countdown: FULL_TIME,
      encryptedMobileNumber: '',
    };

    this.timer = null;
  }

  componentDidMount() {
    this.fetchVerifyCode();
    // this.setInputMaxlength();
  }

  encryptedMobileNumber: string;
  timer: NodeJS.Timer;
  answer: string;

  // TODO: 逻辑无效？
  setInputMaxlength = () => {
    setTimeout(() => {
      // 兼容TaroUI的Input无法接受maxlength
      const InputElement = document.getElementById('smsCode');
      // @ts-ignore
      InputElement.props.maxlength = MAX_LENGTH;
    });
  };

  handleChange = (val) => {
    this.setState({ smsCode: val });
  };

  // 获取验证码
  fetchVerifyCode = debounce(() => {
    // 获取验证码
    getVerifyCode().then(res => {
      const { mobileNumber: encryptedMobileNumber, validationCode } = res?.data;
      // 服务端下发的加密手机号
      this.setState({ encryptedMobileNumber });
      this.answer = validationCode;

      // FIXME: 为了测试，验证码答案公布
      Taro.showToast({
        title: validationCode,
        icon: 'none',
        duration: 3000
      });
    });

    // 启动计时器
    this.setState(({ countdown: prevCountDown }) => ({ countdown: prevCountDown - 1 }));

    this.timer = setInterval(() => {
      const { countdown } = this.state;
      if (countdown <= 0) {
        clearInterval(this.timer);
        this.setState({ countdown: FULL_TIME });
        return;
      }
      this.setState(({ countdown: prevCountDown }) => ({ countdown: prevCountDown - 1 }));
    }, 1000);
  });

  beforeSubmit = async () => {
    if (this.answer !== this.state.smsCode) {
      Taro.showToast({
        title: '验证码不正确，请重试!',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    const response = await checkIfRegistered();
    const { driver } = response?.data || {};
    console.log(response, driver);
    
    this.submit(driver);
  };

  submit = (isDriver) => {
    // 已是司机，直接登录
    if (isDriver) {
      login().then(res => {
        Taro.setStorage({
          key: 'userInfo',
          data: res.data
        });
        Taro.login();
        
        this.afterSubmit(res);
      });
      return;
    }

    // 获取用户微信信息
    Taro.getUserProfile({
      desc: '用于完善司机资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: ({ userInfo: { nickName, avatarUrl } }) => {
        // 未注册司机，先注册
        const params = {
          nickname: nickName,
          avatarUrl,
          // TODO: 跳过司机认证过程，idNumber默认为1996
          idNumber: 1996
        };
        console.log(params, 41);
        regist(params).then(res => this.afterSubmit(res));
      },
      fail: (err) => {
        console.log(err, 42);
        Taro.showToast({
          title: '注册失败，请授权后再试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  };

  afterSubmit = (result) => {
    // 跳转到登录页
    Taro.switchTab({
      url: '/pages/index/index'
    });
    // TODO: 登录/注册成功后下发的用户信息
    console.log(result, 123);
  };

  render () {
    const { encryptedMobileNumber, smsCode, countdown } = this.state;

    return (
      <View className='m-page-input-code'>
        <View className='content'>
          <View className='header'>
            <View className='tip'>
              <Text>已发送至手机：+86 {encryptedMobileNumber}</Text>
            </View>
          </View>

          <AtInput
            focus
            maxLength={4}
            className='u-input'
            name='smsCode'
            border={false}
            type='phone'
            placeholder='请输入验证码'
            value={smsCode}
            onChange={this.handleChange}
          >
            <AtButton disabled={countdown !== FULL_TIME} className='u-verify-code' size='small' onClick={this.fetchVerifyCode}>
              {countdown === FULL_TIME ? '获取验证码' : `${countdown}s后重试`}
            </AtButton>
          </AtInput>
        </View>

        <AtButton className='u-submit' openType='getUserInfo' type='primary' onClick={this.beforeSubmit} disabled={smsCode.length < MAX_LENGTH}>
            提交
        </AtButton>
      </View>
    );
  }
}

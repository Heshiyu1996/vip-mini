import { Component } from 'react';
import { View, } from '@tarojs/components';
import { AtInput, AtButton, AtForm } from 'taro-ui';
import { 
  // getVerifyCode, 
  regist
} from '@/service/api/login';

import './index.less';

const MAX_LENGTH = 4;

interface IState {
  nickname: string;
  idNumber: string;
  smsCode: string;
  countdown: number;
}

const FULL_TIME = 4;

export default class PageRegister extends Component<{}, IState> {
  constructor(props) {
    super(props);

    this.state = {
      nickname: '',
      idNumber: '',

      smsCode: '',
      countdown: FULL_TIME,
    };
  }

  componentDidMount() {
  }

  handleChange = (val, key) =>{
    this.setState({ [key]: val });
  };

  onSubmit = async () => {
    const { nickname, idNumber } = this.state;
    const params = {
      nickname,
      idNumber
    };
    try {
      const res = await regist(params);
      console.log(res, 998);
            
    } catch (error) {
      
    }
  };

  render () {
    const { nickname, idNumber, smsCode, countdown } = this.state;

    return (
      <View className='m-page-register'>
        <AtForm
          className='u-form'
          onSubmit={this.onSubmit}
        >
          <AtInput 
            name='value' 
            type='text' 
            placeholder='请输入姓名' 
            value={nickname} 
            onChange={(val) => this.handleChange(val, 'nickname')} 
          />
          <AtInput 
            name='value' 
            type='text' 
            placeholder='请输入身份证' 
            value={idNumber} 
            onChange={(val) => this.handleChange(val, 'idNumber')} 
          />

          <AtInput
            focus
            maxLength={4}
            className='u-input'
            name='smsCode'
            border={false}
            type='phone'
            placeholder='请输入验证码'
            value={smsCode}
            onChange={(val) => this.handleChange(val, 'smsCode')} 
          >
            <AtButton className='u-verify-code' size='small'>
              获取验证码
            </AtButton>
            {/* <AtButton disabled={countdown !== FULL_TIME} className='u-verify-code' size='small' onClick={this.fetchVerifyCode}>
              {countdown === FULL_TIME ? '获取验证码' : `${countdown}s后重试`}
            </AtButton> */}
          </AtInput>
          <AtButton className='u-submit' formType='submit' type='primary'>
            提交
          </AtButton>
          {/* <AtButton className='u-submit' formType='submit' type='primary' onClick={this.beforeSubmit} disabled={smsCode.length < MAX_LENGTH}>
            提交
          </AtButton> */}
        </AtForm>
      </View>
    );
  }
}

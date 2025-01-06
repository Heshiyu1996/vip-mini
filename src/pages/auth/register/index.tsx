import { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text } from '@tarojs/components';
import { AtInput, AtButton } from 'taro-ui';
import { 
  getVerifyCode, 
  regist,
  login
} from '@/service/api/login';
import { debounce, isName, isIdCard } from '@/utils/tool';
import Taro from '@tarojs/taro';
import './index.less';

const MAX_LENGTH_CODE = 4;
const FULL_TIME = 60;

const PageRegister = () => {
  const [ownerName, setOwnerName] = useState('');
  // const [idNumber, setIdNumber] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [encryMobile, setEncryMobile] = useState('');
  const [countdown, setCountdown] = useState(FULL_TIME);

  const refAnswer = useRef('');
  const refTimer = useRef('');

  const checkValue = () => {
    // 检查姓名
    if (!isName(ownerName)){
      Taro.showToast({
        title: '请填写正确的姓名',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    // 检查身份证
    // if (!isIdCard(idNumber)) {
    //   Taro.showToast({
    //     title: '请填写正确的身份证号码',
    //     icon: 'none',
    //     duration: 2000
    //   });
    //   return false;
    // }

    // 检查验证码
    if (!refAnswer?.current) {
      Taro.showToast({
        title: '请先获取验证码',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    // 检查验证码
    if (!refAnswer?.current) {
      Taro.showToast({
        title: '请先获取验证码',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    // 检查验证码
    if (refAnswer?.current !== smsCode) {
      Taro.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    return true;
  };
  const onSubmit = () => {
    if (!checkValue()) return;

    // 获取用户微信信息
    Taro.getUserProfile({
      desc: '用于完善金水台vip资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: async ({ userInfo: { nickName, avatarUrl } }) => {
        const params = {
          // 微信昵称
          nickname: nickName,
          // 真实名称
          ownerName,
          avatarUrl,
          // identityNumber: idNumber
        };
        try {
          const res = await regist(params);
          if (res) {
            Taro.showToast({
              title: '注册成功',
              icon: 'none',
              duration: 2000
            });
            // 调用登录后进入首页
            login().then(() => Taro.switchTab({ url: '/pages/index/index' }));
          }
        } catch (error) {
          // 已注册，调用登录后进入首页
          login().then(() => Taro.switchTab({ url: '/pages/index/index' }));
        }
      },
      fail: () => {
        Taro.showToast({
          title: '注册失败，请稍后再试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  };

  // 获取验证码
  const fetchVerifyCode = debounce(() => {
    // 获取验证码
    getVerifyCode().then(res => {
      const { mobileNumber, validationCode } = res || {};
      // 服务端下发的加密手机号
      setEncryMobile(mobileNumber);
      refAnswer.current = validationCode;

      // FIXME: 为了测试，验证码答案公布
      // Taro.showToast({
      //   title: validationCode,
      //   icon: 'none',
      //   duration: 3000
      // });
    });

    // 启动计时器
    setIsTimerStart(true);
  });

  const [isTimerStart, setIsTimerStart] = useState(false);
  useEffect(() => {
    if (!isTimerStart) {
      setCountdown(FULL_TIME);
      return;
    }
    refTimer.current = setInterval(() => {
      if (countdown <= 0) {
        clearInterval(refTimer.current);
        // 暂停计时器
        setIsTimerStart(false);
        return;
      }
      setCountdown(countdown - 1);
    }, 1000);

    return () => {
      clearInterval(refTimer.current);
    };
  }, [isTimerStart, countdown]);

  const isRequired = useMemo(() => {
    return ownerName?.length&& smsCode?.length === MAX_LENGTH_CODE 
    // && idNumber?.length 
    ;
  }, [ownerName, smsCode,
    // idNumber
  ]);

  return (
    <View className='m-page-register'>
      <View className='u-form'>
        <AtInput 
          name='value' 
          type='text' 
          placeholder='请输入姓名' 
          value={ownerName} 
          onChange={setOwnerName} 
        />
        {/* <AtInput 
          name='value' 
          type='text' 
          placeholder='请输入身份证' 
          value={idNumber} 
          onChange={setIdNumber} 
        /> */}

        <AtInput
          focus
          maxLength={4}
          className='u-input'
          name='smsCode'
          border={false}
          type='phone'
          placeholder='请输入验证码'
          value={smsCode}
          onChange={setSmsCode} 
        >
          <AtButton disabled={countdown !== FULL_TIME} className='u-verify-code' size='small' onClick={fetchVerifyCode}>
            {countdown === FULL_TIME ? '获取验证码' : `${countdown}s后重试`}
          </AtButton>
        </AtInput>

        {!!encryMobile && <View className='smscode-tip'>
          <View className='tip'>
            <Text>已发送至手机：+86 {encryMobile}</Text>
          </View>
        </View>}
        <AtButton 
          className='u-submit' 
          formType='submit' 
          type='primary' 
          disabled={!isRequired}
          onClick={onSubmit} 
        >
          提交
        </AtButton>
      </View>
    </View>
  );
};

export default PageRegister;

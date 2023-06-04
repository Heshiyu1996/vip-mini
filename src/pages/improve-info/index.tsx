import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { updateUserInfo } from '@/service';
import { withContext } from '@/components/context';
import './index.less';

const PageImproveInfo = (props) => {
  
  const [nickname, setNickname] = useState(props?.userInfo?.nickname);
  const [hobby, setHobby] = useState(props?.userInfo?.hobby);
  const [disabled, setDisabled] = useState(false);
  
  useEffect(() => {
    if (!props?.userInfo) return;
    const { nickname: currentNickname, hobby: currenThobby } = props?.userInfo || {};
    setNickname(currentNickname);
    setHobby(currenThobby);
  }, [props?.userInfo]);

  const onSubmit = async () => {
    if (disabled) return;

    Taro.showLoading({
      title: '正在提交...',
    });
    const params = {
      nickname,
      hobby,
    };
    setDisabled(true);

    try {
      await updateUserInfo(params);
      Taro.showToast({
        title: '提交成功，正在跳转',
        icon: 'none',
        duration: 2000,
      });
      // 2s后跳转订单页面
      setTimeout(() => {
        Taro.switchTab({ url: '/pages/mine/index' });
        setDisabled(false);
        Taro.hideLoading();
      }, 2000);
    } catch (error) {
      Taro.showToast({
        title: '系统异常，请稍后再试!',
        icon: 'none',
        duration: 2000
      });
      Taro.hideLoading();
      setDisabled(false);
    }
  };

  const getInfo = async () => {
    // try {
    //   const inputStorage = Taro.getStorageSync('bookInput');
    //   const { username, contactNumber } = inputStorage || {};
    //   setNickname(username);
    //   setContactNumber(contactNumber);
    // } catch (error) {
      
    // }
  };
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <View className='m-improve-info'>
      <View className='card form-wrapper'>
        <View className='content'>
          <View className='item'>
            <Text className='label'>会员名</Text>
            <Input className='value' placeholder='请输入' value={nickname} onInput={val => setNickname(val.detail.value)} />
          </View>
          <View className='item'>
            <Text className='label'>兴趣爱好</Text>
            <Input className='value' placeholder='请输入' value={hobby} onInput={val => setHobby(val.detail.value)} />
          </View>
        </View>
      </View>
      <View className='operate-wrapper'>
        <View className='btn-submit' onClick={onSubmit}>提交</View>
      </View>
    </View>
  );
};
export default withContext(PageImproveInfo);

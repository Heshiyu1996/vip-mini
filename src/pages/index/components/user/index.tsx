import { useEffect, useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { getUserInfo } from '@/service';
import Taro, { useDidShow } from '@tarojs/taro';
import bus from '@/utils/bus';
import './index.less';

// 默认用户头像
const defaultAvatarUrl = "https://vip.gdxsjt.com/medias/uploads/null_mp_20220924111228_cad9ff.svg";

// 判断问候语时间段
const getGreetTime = () => {
  const date = new Date();
  const hour = date.getHours();
  if (hour < 6) {
    return '凌晨好';
  } else if (hour < 10) {
    return '早上好';
  } else if (hour < 13) {
    return '中午好';
  } else if (hour < 18) {
    return '下午好';
  } else if (hour < 24) {
    return '晚上好';
  }
};

const User = () => {
  // 获取用户信息
  const [userInfo, setUserInfo] = useState({});
  const fetchUserInfo = async () => {
    try {
      const data = await getUserInfo();
      console.log(data, 1234);
      setUserInfo(data);
      // 手动设置ifLogin
      setIfLogin(true);
    } catch (error) {
      // TODO: 在这判断未登录
      console.log(error, 3949);
      
    }
  };
  // useEffect(() => {
  //   fetchUserInfo();
  // }, []);

  useDidShow(() => {
    fetchUserInfo();
  });

  const [ifLogin, setIfLogin] = useState(true);
  useEffect(() => {
    // 监听一个事件，接受参数
    bus.on('ifLogin', (data) => {
      setIfLogin(data);
    });
  }, []);

  const goLogin = () => {
    Taro.redirectTo({
      url: '/pages/auth/index'
    });
  };

  return (
    <View className='u-user'>
      <Image className='avatar' src={userInfo.avatarUrl || defaultAvatarUrl}></Image>
      {
        ifLogin ? 
          <View className='if-login'>
            <View className='nickname'>
              {userInfo.ownerName}
              <Text className='id'>(No.{userInfo.id})</Text>
            </View>
      
            <View className='greeting'>
              {getGreetTime()}，尊贵的{userInfo.currentLevel}
            </View>
          </View> : 
          <View className='no-login' onClick={goLogin}>
            <View className='tip'>
              请登录
            </View>
          </View>
      }
    </View>
  );
};

export default User;

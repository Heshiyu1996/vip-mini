import { useEffect, useState } from 'react';
import { View, Image } from '@tarojs/components';
import { getUserInfo } from '@/service';
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
    const data = await getUserInfo();
    setUserInfo(data);
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <View className='u-user'>
      <Image className='avatar' src={userInfo.avatarUrl || defaultAvatarUrl}></Image>
      <View className='nickname'>{userInfo.ownerName}</View>
      <View className='greeting'>
        {getGreetTime()}，尊贵的{userInfo.currentLevel}
      </View>
    </View>
  );
};

export default User;

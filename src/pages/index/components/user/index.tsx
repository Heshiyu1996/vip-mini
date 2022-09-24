import { useEffect, useState } from 'react';
import { View, Image } from '@tarojs/components';
import { getUserInfo } from '@/service';
import './index.less';

// 默认用户头像
const defaultAvatarUrl = "https://vip.gdxsjt.com/medias/uploads/null_mp_20220924111228_cad9ff.svg";

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
    <View className='m-index'>
      <View className='bg'></View>
      <View className='u-title'>
        <View className='cover'></View>
      </View>
      <View className='u-user'>
        <Image className='avatar mock' src={userInfo.avatarUrl || defaultAvatarUrl}></Image>
        <View className='nickname mock'>{userInfo.ownerName}</View>
        <View className='greeting'>
            下午好，尊贵的{userInfo.currentLevel}
        </View>
      </View>
    </View>
  );
};

export default User;

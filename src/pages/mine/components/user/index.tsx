import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui';
import { View, Text, Image } from '@tarojs/components';
import { getUserInfo } from '@/service';
import { formatPrice } from '@/utils/tool';
import './index.less';
import { SERVICE_PHONE_NUMBER } from '@/utils/config';

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


  const doCall = () => {
    Taro.makePhoneCall({
      phoneNumber: SERVICE_PHONE_NUMBER
    });
  };

  return (
    <View className='u-mine-user'>
      <View className='u-info'>
        <Image className='avatar' src={userInfo.avatarUrl} />
        <View className='nickname'>{userInfo.ownerName}</View>
        <View className='phone'>
          {userInfo.mobileNumber}
        </View>
      </View>

      <View className='u-content'>
        <View className='vip' onClick={() => Taro.navigateTo({ url: `/pages/vip-instruction/index` })}>
          <Text className='level'>{userInfo.currentLevel}</Text>
          <View className='link'>
          查看会员权益
            <AtIcon className='icon-right' value='chevron-right' size='12'></AtIcon>
          </View>
        </View>
        <View className='wallet-wrapper'>
          <View className='balance-wrapper'>
            <View className='item'>
              <View className='value'>{typeof userInfo.totalBalance !== 'undefined' ? formatPrice(userInfo.totalBalance)  : '-'}</View>
              <View className='label'>余额</View>
            </View>
            <View className='item'>
              <View className='value'>-</View>
              <View className='label'>积分</View>
            </View>
          </View>
          <View className='service'>
            <View className='title'>我的服务</View>
            <View className='btn-wrapper'>
              <View className='btn' onClick={() => Taro.navigateTo({ url: `/pages/recharge/index` })}>
                <View className='icon recharge'></View>
                <View className='label'>充值</View>
              </View>
              <View className='btn' onClick={() => Taro.navigateTo({ url: `/pages/balance-record/index` })}>
                <View className='icon recharge-list'></View>
                <View className='label'>充值记录</View>
              </View>
              <View className='btn' onClick={() => Taro.navigateTo({ url: `/pages/balance-record/index?type=1` })}>
                <View className='icon consumption-list'></View>
                <View className='label'>消费记录</View>
              </View>
              <View className='btn' onClick={doCall}>
                <View className='icon contract'></View>
                <View className='label'>联系客服</View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default User;

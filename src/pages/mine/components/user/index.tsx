import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { getUserInfo } from '@/service';
import { formatPrice } from '@/utils/tool';
import './index.less';

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
          <Text className='link'>查看会员权益</Text>
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
              <View className='btn' onClick={() => Taro.makePhoneCall({ phoneNumber: '1340000' })}>
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

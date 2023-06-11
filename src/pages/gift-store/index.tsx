import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { getPointBalance, pointCheckIn, getCheckInStatus } from '@/service';
import GiftList from './components/gift-list';
import './index.less';
import { previewVipOperateDoc } from '@/utils/tool';

const PageGiftStore = () => {
  // 获取当前积分
  const [totalBalance, setTotalBalance] = useState(0);
  const fetchPointBalance = async () => {
    const res = await getPointBalance();
    setTotalBalance(res);
  };
  // 查询今日签到状态
  const [alreadyCheckIn, setAlreadyCheckIn] = useState(false);
  const fetchCheckInStatus = async () => {
    const res = await getCheckInStatus();
    const { hasCheckedIn } = res || {};
    setAlreadyCheckIn(hasCheckedIn);
  };
  useEffect(() => {
    fetchPointBalance();
    fetchCheckInStatus();
  }, []);

  const checkIn = async () => {
    try {
      await pointCheckIn();
      Taro.showToast({
        title: '签到成功',
        icon: 'success',
        duration: 2000
      });
      fetchCheckInStatus();
    } catch (error) {
      
    }
  };

  return (
    <View className='m-page-gift-store'>
      <View className='u-gift-balance'>
        <View className='label'>
          当前积分
          <Text className='icon-rule' onClick={previewVipOperateDoc} />
        </View>
        
        <Text className='value'>{totalBalance}</Text>
        <Text className='btn-history' onClick={() => Taro.navigateTo({ url: `/pages/gift-record/index` })}>积分记录</Text>
        {
          alreadyCheckIn ? 
            <View className='btn-sign disabled'>今日已签到</View>
            :
            <View className='btn-sign' onClick={checkIn}>立即签到</View>
        }
      </View>

      <GiftList />
    </View>
  );
};

export default PageGiftStore;

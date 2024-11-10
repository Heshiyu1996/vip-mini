import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { View, Text, Input } from '@tarojs/components';
import { getRewardBalance, withdrawReward } from '@/service';
import './index.less';

const PageReward = () => {

  // 获取用户奖励金余额
  const [totalBalance, setTotalBalance] = useState(0);
  const fetchUserInfo = async () => {
    const res = await getRewardBalance();
    console.log(res, 1231231321312);
    setTotalBalance(res || 0);
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const [amount, setAmount] = useState('');
  const onSubmit = async () => {
    try {
      const apiParams = {
        amount
      };
      const data = await withdrawReward(apiParams);
      console.log(data, 4567);
      
    } catch (error) {
      
    }
  };

  const onInputAll = () => {
    setAmount(totalBalance);
  };


  return (
    <View className='m-page-reward'>
      <View className='u-balance'>
        <Text className='label'>奖励金</Text>
        <Text className='value'>{totalBalance}</Text>
        <Text className='btn-history' onClick={() => Taro.navigateTo({ url: `/pages/reward-record/index` })}>提现明细</Text>
      </View>

      <View className='operate-wrapper'>
        <View className='title'>提现金额</View>
        <View className='input-wrapper'>
          <Text className='sign'>￥</Text>
          <Input 
            placeholderStyle='color: #999999, font-size: 14px' 
            className='value amount'
            placeholder='请输入要提现的金额' 
            value={amount} 
            onInput={val => setAmount(val.detail.value)}
          />
        </View>
        <View className='btn-input-all' onClick={onInputAll}>全部提现</View>
        <View className='tip'>预计实时到账</View>
      </View>

      <View className='footer'>
        <View className='btn-recharge' onClick={onSubmit}>提现</View>
      </View>
    </View>
  );
};

export default PageReward;

import Taro from '@tarojs/taro';
import { useState, useEffect, useMemo } from 'react';
import { View, Text, Input } from '@tarojs/components';
import { getUserInfo, getRechargeConfigList, placeOrder } from '@/service';
// import { AtCheckbox } from 'taro-ui';
import './index.less';
// import { previewVipDoc } from '@/utils/tool';
// import ModalContract from './components/modal-contract';

const PageReward = () => {
  const [rechargeConfig, setRechargeConfigList] = useState([]);
  const [selected, setSelected] = useState({});

  const currentConfig = useMemo(() => {
    if (!selected?.id || !rechargeConfig?.length) return;
    const target = rechargeConfig.find((item) => item.id === selected?.id) || {};
    return target;
  }, [selected?.id, rechargeConfig]);

  const fetchRechargeConfig = async () => {
    const res = await getRechargeConfigList();
    setRechargeConfigList(res?.list);
  };
  useEffect(() => {
    fetchRechargeConfig();
  }, []);

  useEffect(() => {
    if (!rechargeConfig?.length) return;

    // 默认选中第一个
    const defaultItem = rechargeConfig?.[0];
    // setSelected(defaultItem?.id);
    setSelected(defaultItem);
  }, [rechargeConfig]);

  // 获取用户余额
  const [totalBalance, setTotalBalance] = useState(0);
  const fetchUserInfo = async () => {
    const res = await getUserInfo();
    const { totalBalance } = res;
    setTotalBalance(totalBalance);
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const [selectedReadList, setSelectedReadList] = useState([]);
  const onChangeRead = (val) => {
    setSelectedReadList(val);
  };

  const beforeSubmit = () => {
    // 显示条约弹窗
    setVisibleContract(true);
  };

  // 充值
  const submit = async () => {
    // 隐藏条约弹窗
    setVisibleContract(false);

    try {
      const apiParams = {
        tradeType: 'RECHARGE', // 充值
        amount: selected?.amount, // 金额
      };
      const data = await placeOrder(apiParams);

      const wxApiParams = {
        ...data,
        success (res) {
          console.log(res, 111);
          Taro.showToast({
            title: '充值成功，正在跳转...',
            icon: 'none',
            duration: 3000,
          });
          // 3s后跳转
          setTimeout(() => {
            Taro.switchTab({ url: '/pages/index/index' });
          }, 3000);
        },
        fail (res) {
          if (res?.errMsg.includes('cancel')) return;
          Taro.showToast({
            title: '充值失败，请稍后重试...',
            icon: 'none',
            duration: 3000
          });
        }
      };

      wx.requestPayment(wxApiParams);
    } catch (error) {
      
    }
  };

  const [visibleContract, setVisibleContract] = useState(false);
  const [remark, setRemark] = useState('');

  return (
    <View className='m-page-reward'>
      <View className='u-balance'>
        <Text className='label'>奖励金</Text>
        <Text className='value'>{totalBalance}</Text>
        <Text className='btn-history' onClick={() => Taro.navigateTo({ url: `/pages/reward-record/index` })}>提现明细</Text>
      </View>

      <View className='operate-wrapper'>
        <View className='title'>提现金额</View>
        <Input className='value' placeholder='请输入要提现的金额' value={remark} onInput={val => setRemark(val.detail.value)} />
        <View className='tip'>预计实时到账</View>
      </View>

      <View className='footer'>
        {/* <ModalContract visible={visibleContract} onOk={submit} onClose={() => setVisibleContract(false)} /> */}
        <View className='btn-recharge' onClick={beforeSubmit}>提现</View>
      </View>
    </View>
  );
};

export default PageReward;

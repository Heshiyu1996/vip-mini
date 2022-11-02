import Taro from '@tarojs/taro';
import { useState, useEffect, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import { getUserInfo, getRechargeConfigList, placeOrder } from '@/service';
import { AtCheckbox } from 'taro-ui';
import './index.less';

const PageRecharge = () => {
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
    if (!selectedReadList?.length) {
      Taro.showToast({
        title: '请勾选“我已详细阅读并了解充值服务须知”',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    submit();
  };

  // 充值
  const submit = async () => {
    try {
      const apiParams = {
        tradeType: 'RECHARGE', // 充值
        amount: selected?.amount, // 金额
      };
      const data = await placeOrder(apiParams);
      console.log(data, 1234213421);

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
          console.log(res, 222);

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


  return (
    <View className='m-page-recharge'>
      <View className='u-balance'>
        <Text className='label'>账户余额</Text>
        <Text className='value'>{totalBalance}</Text>
        <Text className='btn-history' onClick={() => Taro.navigateTo({ url: `/pages/balance-record/index` })}>充值历史</Text>
      </View>

      <View className='price-selector'>
        <View className='bg'></View>
        <View className='price-wrapper'>
          {
            rechargeConfig?.map((item) => 
              <View 
                key={item.id} 
                className={`item ${selected?.id === item.id ? 'active' : ''}`}
                onClick={() => setSelected(item)}
              >
                {item.amount}元
              </View>
            )
          }
        </View>
      </View>

      <View className='right-wrapper'>
        <View className='row'>
          {!!currentConfig?.giftAmount && <View className='item'>
            <View className='icon vip-discount'></View>
            <View className='label'>赠送金</View>
            <View className='desc'>{currentConfig?.giftAmount}元</View>
          </View>}
          {!!currentConfig?.roomTicketAmount && <View className='item'>
            <View className='icon hot-spring-or-park-discount'></View>
            <View className='label'>住房券</View>
            <View className='desc'>{currentConfig?.roomTicketAmount}张</View>
          </View>}
        </View>
      </View>
      {/* <View className='right-wrapper'>
        <View className='row'>
          <View className='item'>
            <View className='icon vip-discount'></View>
            <View className='label'>会员折扣</View>
            <View className='desc'>门市价{currentConfig?.vipDiscount}折</View>
          </View>
          <View className='item'>
            <View className='icon hot-spring-or-park-discount'></View>
            <View className='label'>温泉/乐园</View>
            <View className='desc'>直客通价{currentConfig?.hotSpringOrParkDiscount}元</View>
          </View>
          <View className='item'>
            <View className='icon vip-day-discount'></View>
            <View className='label'>会员日折扣</View>
            <View className='desc'>门市价{currentConfig?.vipDayDiscount}折</View>
          </View>
        </View>
        <View className='row'>
          <View className='item'>
            <View className='icon dining-discount'></View>
            <View className='label'>餐饮折扣</View>
            <View className='desc'>门市价{currentConfig?.diningDiscount}折</View>
          </View>
          <View className='item'>
            <View className='icon birthday-package'></View>
            <View className='label'>生日大礼包</View>
            <View className='desc'>{currentConfig?.birthdayPackage}</View>
          </View>
          <View className='item'>
            <View className='icon privilege'></View>
            <View className='label'>专享特权</View>
            <View className='desc'>{currentConfig?.privilege}</View>
          </View>
        </View>
      </View> */}

      <View className='footer'>
        <AtCheckbox
          className='confirm-wrapper'
          selectedList={selectedReadList}
          options={[{
            label: '我已详细阅读并了解充值服务须知',
            value: true
          }]}
          onChange={onChangeRead}
        />

        <View className='btn-recharge' onClick={beforeSubmit}>立即充值</View>

        <View className='notice'>
          <View>说明:</View>
          <View>1. 线上充值暂支持 10000元、20000元、50000元 三类面额，若单笔大于5万（不含）请前往线下门店</View>
        </View>
      </View>
    </View>
  );
};

export default PageRecharge;

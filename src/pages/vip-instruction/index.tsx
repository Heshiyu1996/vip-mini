import Taro from '@tarojs/taro';
import { useState, useEffect, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
// import { getRechargeConfigList } from '@/service';
import { previewVipDoc } from '@/utils/tool';
import './index.less';

const PageVipInstruction = () => {
  // const [vipConfigList, setVipConfigList] = useState([]);
  const [vipConfig, setVipConfigList] = useState([]);
  const [selected, setSelected] = useState({});

  const currentConfig = useMemo(() => {
    if (!selected?.id || !vipConfig?.length) return;
    const target = vipConfig.find((item) => item.id === selected?.id) || {};
    return target;
  }, [selected?.id, vipConfig]);

  // const fetchRechargeConfig = async () => {
  //   const res = await getRechargeConfigList();
  //   setRechargeConfigList(res?.list);
  // };
  // useEffect(() => {
  //   fetchRechargeConfig();
  // }, []);

  useEffect(() => {
    if (!vipConfig?.length) return;

    // 默认选中第一个
    const defaultItem = vipConfig?.[0];
    // setSelected(defaultItem?.id);
    setSelected(defaultItem);
  }, [vipConfig]);

  console.log(vipConfig, 12312321);

  useEffect(() => {
    const configList = Taro.getStorageSync('vipConfig');
    setVipConfigList(configList);
    // console.log(vipConfig, 998);
  }, []);

  return (
    <View className='m-page-recharge'>
      <View className='price-selector'>
        <View className='bg'></View>
        <View className='price-wrapper'>
          {
            vipConfig?.map((item) => 
              <View 
                key={item.id} 
                className={`item ${selected?.id === item.id ? 'active' : ''}`}
                onClick={() => setSelected(item)}
              >
                {item.levelName}
              </View>
            )
          }
        </View>
      </View>

      {/* <View className='right-wrapper'>
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
      </View> */}
      <View className='right-wrapper'>
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
      </View>

      <View className='footer'>
        <View className='notice'>
          <View>更多说明详见<Text className='link-doc' onClick={previewVipDoc}>《金水台VIP会员卡充值消费服务协议》</Text></View>
        </View>
      </View>
    </View>
  );
};

export default PageVipInstruction;

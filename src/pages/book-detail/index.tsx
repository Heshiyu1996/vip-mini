import { getRoomList } from '@/service';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useMemo, useState } from 'react';
import BillDetail from './components/price-detail';
import ModalPolicyCovid from './components/policy-covid';
import './index.less';
import { getDateGap, getDay } from '@/utils/tool';

const PageBookDetail = () => {
  const [data, setData] = useState({});
  const startDate = Taro.getCurrentInstance().router?.params?.startDate;
  const endDate = Taro.getCurrentInstance().router?.params?.endDate;

  const fetchDetail = async () => {
    const targetId = Taro.getCurrentInstance().router?.params?.id || '-1';
    const params = {
      startDate,
      endDate,
    };
    const res = await getRoomList(params);
    const info = res?.find((item) => item.id === Number(targetId)) || {};
    setData(info);
  };
  useEffect(() => {
    fetchDetail();
  }, []);

  const onSubmit = async () => {
    Taro.showToast({
      title: '正在对接微信支付，请稍等',
      icon: 'none',
      duration: 2000
    });
  };

  const privilegePackages = useMemo(() => {
    const userInfo = Taro.getStorageSync('userInfo');
    // 拿到会员卡code
    console.log(userInfo);
  }, []);

  return (
    <View className='m-book-detail'>
      <View className='info-wrapper'>
        <View className='item date'>
          {startDate} 周{getDay(startDate)} ~ {endDate} 周{getDay(endDate)} (共 {getDateGap(startDate, endDate)} 晚)
        </View>
        <View className='item basis'>
          <View className='type'>{data.roomType}</View>
        </View>

        <View className='item facility-extra'>
          <View className='title'>房型设施</View>
          <View className='content'>{data.roomFacility}</View>
        </View>
        
        <View className='item policy'>
          <View className='title'>入住及取消政策</View>
          <View className='content'>
            {data.policyDesc}
          </View>
        </View>
      </View>

      <View className='card form-wrapper'>
        <View className='title'>入住信息</View>
        <View className='content'>
          <View className='item'>
            <Text className='label'>房间数</Text>
            <Input className='value' />
          </View>
          <View className='item'>
            <Text className='label'>入住人</Text>
            <Input className='value' />
          </View>
          <View className='item'>
            <Text className='label'>手机号</Text>
            <Input className='value' />
          </View>
          <View className='item'>
            <Text className='label'>备注</Text>
            <Input className='value' />
          </View>
        </View>
      </View>

      <View className='card gift-wrapper'>
        <View className='title'>入住礼包</View>
        <View className='content'>
          凡官方预订客房，入住即可享受自助早餐+无限次露天温泉
        </View>
      </View>
      
      <View className='bottom-wrapper'>
        {/* 总价与账单明细 */}
        <BillDetail />

        <Text className='btn-submit' onClick={onSubmit}>提交订单</Text>
      </View>

      {/* 防疫政策 */}
      <ModalPolicyCovid />
    </View>
  );
};
export default PageBookDetail;
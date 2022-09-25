import { getRoomList } from '@/service';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import ModalPolicyCovid from './components/policy-covid';
import './index.less';

const PageBookDetail = () => {
  const [data, setData] = useState({});

  const fetchDetail = async () => {
    const targetId = Taro.getCurrentInstance().router?.params?.id || '-1';
    const params = {
      startDate: '2022-09-25',
      endDate: '2022-09-26',
    };
    const res = await getRoomList(params);
    const info = res?.find((item) => item.id === Number(targetId)) || {};
    setData(info);
  };
  useEffect(() => {
    fetchDetail();
  }, []);

  return (
    <View className='m-book-detail'>
      <View className='info-wrapper'>
        <View className='item date'>
          7月9日
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
        <View className='price-wrapper'>
          <Text className='label'>订单金额</Text>
          <Text className='value'>¥ 949</Text>
        </View>
        <Text className='btn-detail'>明细</Text>
        <Text className='btn-submit'>提交订单</Text>
      </View>

      <ModalPolicyCovid />
    </View>
  );
};
export default PageBookDetail;
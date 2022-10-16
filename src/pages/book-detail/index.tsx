import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useMemo, useState } from 'react';
import { AtInputNumber } from 'taro-ui';
import { getDateGap, getDay } from '@/utils/tool';
import { getRoomList, bookRoom } from '@/service';
import PriceDetail from './components/price-detail';
import ModalPolicyCovid from './components/policy-covid';
import './index.less';

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

  const [amount, setAmount] = useState(0);
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [remark, setRemark] = useState('');
  const onSubmit = async () => {
    const params = {
      amount,
      contactName,
      contactNumber,
      remark
    };
    console.log(params);
    // const res = await getRoomList(params);
    // bookRoom();
    // Taro.showToast({
    //   title: '正在对接微信支付，请稍等',
    //   icon: 'none',
    //   duration: 2000
    // });
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
          {startDate} ({getDay(startDate)}) ~ {endDate} ({getDay(endDate)})
          <View className='count'>共 {getDateGap(startDate, endDate)} 晚</View>
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
            <AtInputNumber
              className='value room-amount'
              min={0}
              step={1}
              value={amount}
              onChange={val => setAmount(val)}
            />
          </View>
          <View className='item'>
            <Text className='label'>入住人</Text>
            <Input className='value' value={contactName} onInput={val => setContactName(val.detail.value)} />
          </View>
          <View className='item'>
            <Text className='label'>手机号</Text>
            <Input className='value' value={contactNumber} onInput={val => setContactNumber(val.detail.value)} />
          </View>
          <View className='item'>
            <Text className='label'>备注</Text>
            <Input className='value' value={remark} onInput={val => setRemark(val.detail.value)} />
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
        <PriceDetail amount={amount} roomId={data.id} startDate={startDate} endDate={endDate} />

        <Text className='btn-submit' onClick={onSubmit}>提交订单</Text>
      </View>

      {/* 防疫政策 */}
      <ModalPolicyCovid />
    </View>
  );
};
export default PageBookDetail;
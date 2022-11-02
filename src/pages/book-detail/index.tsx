import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useMemo, useState } from 'react';
import { AtInputNumber, AtCheckbox, AtButton } from 'taro-ui';
import { getDateGap, getDay } from '@/utils/tool';
import { getRoomList, bookRoom } from '@/service';
import PriceDetail from './components/price-detail';
import ModalPolicyCovid from './components/policy-covid';
import './index.less';
import PaymentType from './components/payment-type';

const PageBookDetail = () => {
  const [data, setData] = useState({});
  const startDate = Taro.getCurrentInstance().router?.params?.startDate;
  const endDate = Taro.getCurrentInstance().router?.params?.endDate;
  const id = Taro.getCurrentInstance().router?.params?.id || '-1';

  const fetchDetail = async () => {
    const params = {
      startDate,
      endDate,
    };
    const res = await getRoomList(params);
    const info = res?.find((item) => item.id === Number(id)) || {};
    setData(info);
  };
  useEffect(() => {
    fetchDetail();
  }, []);

  const beforeSubmit = () => {
    if (!selectedReadList?.length) {
      Taro.showToast({
        title: '请勾选“我已详细阅读并了解入住须知”',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (!amount || !contactName || !contactNumber) {
      Taro.showToast({
        title: '请填写完整预订信息',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    setVisiblePaymentTypeDrawer(true);
  };

  const [amount, setAmount] = useState(1);
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [remark, setRemark] = useState('');
  const [visiblePaymentTypeDrawer, setVisiblePaymentTypeDrawer] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const onSubmit = async (type) => {
    if (disabled) return;
    Taro.showLoading({
      title: '正在支付...',
    });
    const params = {
      id,
      amount,
      contactName,
      contactNumber,
      remark,
      startDate,
      endDate,
      type,
    };
    setDisabled(true);
    try {
      await bookRoom(params);
      Taro.showToast({
        title: '预订成功，正在跳转订单页',
        icon: 'none',
        duration: 2000,
      });
      // 2s后跳转订单页面
      setTimeout(() => {
        Taro.switchTab({ url: '/pages/order/index' });
        setDisabled(false);
        Taro.hideLoading();
      }, 2000);
    } catch (error) {
      Taro.showToast({
        title: '系统异常，请稍后再试!',
        icon: 'none',
        duration: 2000
      });
      Taro.hideLoading();
      setDisabled(false);
    }
  };

  const [selectedReadList, setSelectedReadList] = useState([]);
  const onChangeRead = (val) => {
    setSelectedReadList(val);
  };
  
  const attach = useMemo(() => {
    return {
      startDate,
      endDate,
      amount,
      contactName,
      contactNumber,
      type: data.roomType,
    };
  }, [startDate, endDate, amount, contactName, contactNumber, data.roomType]);

  const [actualPrice, setActualPrice] = useState(0);

  return (
    <View className='m-book-detail'>
      <View className='info-wrapper'>
        <View className='item basis'>
          <View className='type'>{data.roomType}</View>
        </View>
        <View className='item date'>
          {startDate} ({getDay(startDate)}) ~ {endDate} ({getDay(endDate)})
          <Text className='count'>共 {getDateGap(startDate, endDate)} 晚</Text>
        </View>
      </View>

      <View className='card form-wrapper'>
        <View className='title'>入住信息</View>
        <View className='content'>
          <View className='item'>
            <Text className='label'>房间数</Text>
            <AtInputNumber
              className='value room-amount'
              min={1}
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

      <View className='card info-wrapper'>
        <View className='title'>入住礼包</View>
        <View className='content'>
          <View className='item facility-extra'>
            <View className='sub-title'>房型设施</View>
            <View className='content'>{data.roomFacility}</View>
          </View>
        </View>
      </View>

      <View className='card info-wrapper'>
        <View className='title'>入住须知</View>
        <View className='content'>
          <View className='item facility-extra'>
            <View className='sub-title'>房型设施</View>
            <View className='content'>{data.roomFacility}</View>
          </View>
          <View className='item gift'>
            <View className='sub-title'>入住礼包</View>
            <View className='content'>
              {data.giftPackages || '无'}
            </View>
          </View>
        
          <View className='item policy'>
            <View className='sub-title'>入住及取消政策</View>
            <View className='content'>
              {data.policyDesc}
            </View>
          </View>
        </View>
      </View>
      
      <AtCheckbox
        className='card confirm-wrapper'
        selectedList={selectedReadList}
        options={[{
          label: '我已详细阅读并了解入住须知',
          value: true
        }]}
        onChange={onChangeRead}
      />

      <View className='bottom-wrapper'>
        {/* 总价与账单明细 */}
        <PriceDetail amount={amount} roomId={data.id} startDate={startDate} endDate={endDate} setPrice={setActualPrice} />

        <AtButton className='btn-submit' onClick={beforeSubmit}>提交订单</AtButton>
      </View>

      {/* 防疫政策 */}
      <ModalPolicyCovid />

      <PaymentType 
        disabled={disabled}
        visible={visiblePaymentTypeDrawer} 
        data={data}
        price={actualPrice}
        attach={attach}
        setVisible={setVisiblePaymentTypeDrawer}
        onFinish={onSubmit}
      />
    </View>
  );
};
export default PageBookDetail;
import { placeOrder } from '@/service';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useMemo } from 'react';
import { AtFloatLayout, AtIcon } from "taro-ui";
import './index.less';

enum EPaymentType {
  balance = 0,
  // wechat = 1, // 微信支付不用调用业务侧下订单
  ticket = 2,
}

const PaymentType = (props) => {
  const { visible, disabled, data, price, attach, setVisible, onFinish } = props;

  const disabledBtnTicket = useMemo(() => !data?.enableRoomTicket, [data?.enableRoomTicket]);
  const payByTicket = () => {
    if (disabledBtnTicket) return;
    onFinish(EPaymentType.ticket);
  };

  const payByWechat = async () => {
    try {
      const apiParams = {
        tradeType: 'BOOKING_ROOM', // 订房
        amount: price, // 金额
        attach
      };
      console.log(apiParams, 888);
      
      const data = await placeOrder(apiParams);

      const wxApiParams = {
        ...data,
        success () {
          Taro.showToast({
            title: '支付成功，正在跳转...',
            icon: 'none',
            duration: 3000,
          });
          // 3s后跳转
          setTimeout(() => {
            Taro.switchTab({ url: '/pages/order/index' });
          }, 3000);
        },
        fail (res) {
          if (res?.errMsg.includes('cancel')) return;
          Taro.showToast({
            title: '支付失败，请稍后重试...',
            icon: 'none',
            duration: 3000
          });
        }
      };

      wx.requestPayment(wxApiParams);
    } catch (error) {
      console.log(error, 98);
      
    }
  };
  
  return (
    <View className='u-payment-type'>
      {/* 明细浮层 */}
      <AtFloatLayout
        className='u-modal-type-detail'
        isOpened={visible}
        title='请选择'
        onClose={() => setVisible(false)}
      >
        <View className={`item-wrapper ${disabled ? 'disabled' : ''}`}>
          <View className='item' onClick={() => onFinish(EPaymentType.balance)}>
            <Text className='icon balance' />
            <Text className='text'>卡内余额(含赠送金)</Text>
            <AtIcon className='icon-right' value='chevron-right' color='#ccc' size='16'></AtIcon>
          </View>
          <View className='item' onClick={payByWechat}>
            <Text className='icon wechat' />
            <Text className='text'>微信支付</Text>
            <AtIcon className='icon-right' value='chevron-right' color='#ccc' size='16'></AtIcon>
          </View>
          <View className={`item ${disabledBtnTicket ? 'disabled' : '' }`} onClick={payByTicket}>
            <Text className='icon ticket' />
            <Text className='text'>住房券</Text>
            {disabledBtnTicket && <View className='sub-text'>(该房型不支持使用)</View>}
            <AtIcon className='icon-right' value='chevron-right' color='#ccc' size='16'></AtIcon>
          </View>
        </View>
      </AtFloatLayout>
    </View>
    
  );
};
export default PaymentType;
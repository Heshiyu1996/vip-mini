import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtFloatLayout, AtIcon } from "taro-ui";
import './index.less';

enum EPaymentType {
  balance = 0,
  wechat = 1,
  ticket = 2,
}

const ModalPriceDetail = (props) => {
  const { visible, disabled, setVisible, onFinish } = props;

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
          {/* <View className='item' onClick={() => onFinish(EPaymentType.wechat)}> */}
          <View className='item' onClick={() => 
            Taro.showToast({
              title: '微信支付对接中',
              icon: 'none',
              duration: 2000
            })
          }
          >
            <Text className='icon wechat' />
            <Text className='text'>微信支付</Text>
            <AtIcon className='icon-right' value='chevron-right' color='#ccc' size='16'></AtIcon>
          </View>
          <View className='item' onClick={() => onFinish(EPaymentType.ticket)}>
            <Text className='icon ticket' />
            <Text className='text'>住房券</Text>
            <AtIcon className='icon-right' value='chevron-right' color='#ccc' size='16'></AtIcon>
          </View>
        </View>
      </AtFloatLayout>
    </View>
    
  );
};
export default ModalPriceDetail;
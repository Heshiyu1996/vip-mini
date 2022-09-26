import { View, Text } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { AtFloatLayout, AtIcon } from "taro-ui";
import { getPriceDetail } from '@/service';
import './index.less';

const ModalPriceDetail = () => {
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState({});
  const fetchPriceDetail = async () => {
    const params = {
      startDate: '2022-09-25',
      endDate: '2022-09-25',
      roomId: '4'
    };
    const res = await getPriceDetail(params) || {};
    // const res = {
    //   "totalPrice": 60,
    //   "actualPrice": 46,
    //   "priceDetail": [{
    //     "date": "2010-10-02",
    //     "price": "24"
    //   }],
    //   "discountDetail": [{
    //     "item": "Ut consectetur",
    //     "price": "17"
    //   }]
    // };
    setData(res);
  };
  useEffect(() => {
    fetchPriceDetail();
  }, []);

  return (
    <View className='u-price-detail'>
      {/* 金额与明细按钮 */}
      <View className='u-total-price'>
        <View className='price-wrapper'>
          <Text className='label'>订单金额</Text>
          <Text className='value'>¥ {data.actualPrice}</Text>
        </View>
        <View className='btn-detail' onClick={() => setVisible(true)}>
          明细
          <AtIcon className='icon-up' value='chevron-up' size='12'></AtIcon>
        </View>
      </View>

      {/* 明细浮层 */}
      <AtFloatLayout
        className='u-modal-price-detail'
        isOpened={visible}
        onClose={() => setVisible(false)}
      >
        <View className='item-wrapper'>
          <View className='summary'>
            <View className='label'>订单总价</View>
            <View className='value'>¥ {data?.totalPrice?.toFixed(2)}</View>
          </View>

          <View className='price-list'>
            {
              Object.keys(data?.priceDetail || [])?.map((date) =>
                <View key={date} className='item'>
                  <View className='label'>{date} 入住</View>
                  <View className='value'>¥ {data?.priceDetail?.[date]?.toFixed(2)}</View>
                </View>)
            }
          </View>
        </View>
        <View className='item-wrapper'>
          <View className='summary'>
            <View className='label'>共减</View>
            <View className='value'>¥ {(data?.totalPrice - data?.actualPrice)?.toFixed(2)}</View>
          </View>

          <View className='price-list'>
            {
              Object.keys(data?.discountDetail || [])?.map((date) =>
                <View key={date} className='item'>
                  <View className='label'>{date}</View>
                  <View className='value'>¥ {data?.discountDetail?.[date]?.toFixed(2)}</View>
                </View>)
            }
          </View>
        </View>

        <View className='item-wrapper'>
          <View className='summary'>
            <View className='label'>合计</View>
            <View className='value'>¥ {(data?.actualPrice)?.toFixed(2)}</View>
          </View>
        </View>
      </AtFloatLayout>

    </View>
    
  );
};
export default ModalPriceDetail;
import { View, Text } from '@tarojs/components';
import './index.less';

const PageBookDetail = () => {
  return (
    <View className='m-book-detail'>
      <View className='info-wrapper'>
        <View className='item date'>
          7月9日
        </View>
        <View className='item basis'>
          <View className='type'>高级双床房</View>
          <View className='desc'>35㎡ 有窗 大床1.8m（1张）</View>
        </View>

        <View className='item facility-extra'>
          <View className='title'>房型设施</View>
          <View className='content'>牙刷（房内提供）、牙膏（房内提供）、沐浴露、洗发水、吹风机、电视机、拖鞋、空调、无线网络</View>
        </View>
        
        <View className='item policy'>
          <View className='title'>入住及取消政策</View>
          <View className='content'>
            1、早餐时间：7:30-10:00
            2、入住时间：15:00以后
            3、退房时间：次日中午12:00前
            4、儿童政策：该房型允许携带儿童入住。（儿童早餐：1.2米以下免票，1.2-1.5米儿童票40元/位，1.5米以上按成人票55元/位）
            5、加床政策：300元/张（折叠床），包含1人自助早餐、莲花温泉门票
            6、取消政策：平日入住前一天18点可免费取消，周五/六入住前三天18点可免费取消，国家规定节假日不可取消。
          </View>
        </View>
      </View>

      <View className='card form-wrapper'>
        <View className='title'>入住信息</View>
        <View className='content'>
          <View></View>
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
    </View>
  );
}
export default PageBookDetail;
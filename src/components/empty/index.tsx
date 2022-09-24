import { View, Image } from '@tarojs/components';
import './index.less';

const EmptyImg = 'https://vip.gdxsjt.com/medias/uploads/null_mp_20220924145933_f40572.png';

const UEmpty = (props) => {
  return <View className={`u-empty ${props.className}`}>
    <View className='content'>
      <Image src={EmptyImg} className='img' />
      <View className='empty-tip'>暂无数据，看看其它吧</View>
    </View>
  </View>;
};

export default UEmpty;

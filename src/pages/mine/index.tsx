import { View } from '@tarojs/components';
import User from './components/user';
import './index.less';

const PageMine = () => {
  return (
    <View className='m-mine'>
      <User />
    </View>
  );
}
export default PageMine;
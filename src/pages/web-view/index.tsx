import Taro from '@tarojs/taro';
import { View, WebView } from '@tarojs/components';

const defaultUrl = 'https://mp.weixin.qq.com/';

const UWebView = () => {
  const link = decodeURIComponent(Taro.getCurrentInstance().router?.params?.link || defaultUrl);
  return (
    <View className='m-web-view'>
      <WebView src={link} />
    </View>
  );
};

export default UWebView;

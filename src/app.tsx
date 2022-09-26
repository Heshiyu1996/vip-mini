import Taro from '@tarojs/taro';
import { useEffect } from 'react';
import 'taro-ui/dist/style/index.scss';
import './app.less';
import { getUserInfo, getVipConfigList } from './service';

const App = (props) => {
  const fetchVipConfigList = async () => {
    try {
      const data = await getVipConfigList();
      Taro.setStorageSync('vipConfig', data);
    } catch (error) {
      
    }
  };

  const fetchUserInfo = async () => {
    const data = await getUserInfo();
    Taro.setStorageSync('userInfo', data);
  };

  const init = () => {
    fetchVipConfigList();
    fetchUserInfo();
  };
  useEffect(() => {
    init ();
  }, []);

  return props.children;
};

export default App;

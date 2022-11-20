import Taro from '@tarojs/taro';
import { useEffect } from 'react';
import 'taro-ui/dist/style/index.scss';
import './app.less';
import { getUserInfo } from './service';

const App = (props) => {
  const fetchUserInfo = async () => {
    const data = await getUserInfo();
    Taro.setStorageSync('userInfo', data);
  };

  const init = () => {
    fetchUserInfo();
  };
  useEffect(() => {
    init ();
  }, []);

  return props.children;
};

export default App;

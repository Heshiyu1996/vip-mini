/* eslint-disable no-multi-spaces */
import Taro from '@tarojs/taro';
import { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserInfo } from './../../service';

import { Provider } from './with-context';

const EnvComponent = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const fetchUserInfo = async () => {
    const data = await getUserInfo();
    Taro.setStorageSync('userInfo', data);
    setUserInfo(data);
  };

  const init = () => {
    fetchUserInfo();
  };
  useLayoutEffect(() => {
    init();
  }, []);

  return (
    <Provider
      value={{
        userInfo,
        fetchUserInfo,
      }}
    >
      {children}
    </Provider>
  );
};

EnvComponent.propTypes = {
  children: PropTypes.element.isRequired
};

export default EnvComponent;

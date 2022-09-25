import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { useState } from 'react';
import { AtTabs, AtTabsPane } from 'taro-ui';
import ReChargeList from './components/recharge-list';
import ConsumptionList from './components/consumption-list';
import './index.less';

const { statusBarHeight } = Taro.getSystemInfoSync();
const { height } = Taro.getMenuButtonBoundingClientRect();
const titleBarHeight = statusBarHeight + height;
const tabList = [
  { title: '充值' }, 
  { title: '消费' },
];

const PageBalanceRecord = () => {
  const defaultCurrent = Taro.getCurrentInstance().router.params?.type || 0;
  const [current, setCurrent] = useState(Number(defaultCurrent));

  const onClick = (val) => {
    setCurrent(val);
  };

  return (
    <View className='m-balance-record'>
      <AtTabs className='u-tabs' current={current} tabList={tabList} onClick={onClick}>
        <AtTabsPane className='content' current={current} index={0} >
          <ReChargeList />
        </AtTabsPane>

        <AtTabsPane className='content'  current={current} index={1}>
          <ConsumptionList />
        </AtTabsPane>
      </AtTabs>
    </View>
  );
};
export default PageBalanceRecord;
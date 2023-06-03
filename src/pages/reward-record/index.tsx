import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { useState } from 'react';
import { AtTabs, AtTabsPane } from 'taro-ui';
import IncomeList from './components/income-list';
import WithdrawList from './components/withdraw-list';
import './index.less';

// const { statusBarHeight } = Taro.getSystemInfoSync();
// const { height } = Taro.getMenuButtonBoundingClientRect();
// const titleBarHeight = statusBarHeight + height;
const tabList = [
  { title: '收入' }, 
  { title: '提现' },
];

const PageBalanceRecord = () => {
  const defaultCurrent = Taro.getCurrentInstance().router?.params?.type || 0;
  const [current, setCurrent] = useState(Number(defaultCurrent));

  const onClick = (val) => {
    setCurrent(val);
  };

  return (
    <View className='m-reward-record'>
      <AtTabs className='u-tabs' current={current} tabList={tabList} onClick={onClick}>
        <AtTabsPane className='content' current={current} index={0} >
          <IncomeList />
        </AtTabsPane>

        <AtTabsPane className='content'  current={current} index={1}>
          <WithdrawList />
        </AtTabsPane>
      </AtTabs>
    </View>
  );
};
export default PageBalanceRecord;
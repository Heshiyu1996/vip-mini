import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import { AtTabs, AtTabsPane } from 'taro-ui'
import ReChargeList from './components/recharge-list';
import './index.less';

const tabList = [
  { title: '充值' }, 
  { title: '消费' },
]

const PageBalanceRecord = () => {
  const [current, setCurrent] = useState(0);

  const onClick = (val) => {
    setCurrent(val);
  }

  return (
    <View className='m-balance-record'>
      <AtTabs className='u-tabs' current={current} tabList={tabList} onClick={onClick}>
        <AtTabsPane className='content' current={current} index={0} >
          <ReChargeList />
        </AtTabsPane>

        <AtTabsPane className='content'  current={current} index={1}>
          <ReChargeList />
        </AtTabsPane>
      </AtTabs>
    </View>
  );
}
export default PageBalanceRecord;
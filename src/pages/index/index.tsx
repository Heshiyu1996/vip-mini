import Taro from '@tarojs/taro';
import { Component, PropsWithChildren } from 'react';
import { View } from '@tarojs/components';
import User from './components/user';
import Book from './components/book';
import Service from './components/service';
import Facility from './components/facility';
import type CustomTabBar from '../../custom-tab-bar';
import './index.less';

export default class Index extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page;

  componentDidShow () {
    const tabbar = Taro.getTabBar<CustomTabBar>(this.pageCtx);
    tabbar?.setSelected(0);
  }

  render () {
    return (
      <View className='m-index'>
        <View className='bg'></View>
        <View className='u-title'>
          <View className='cover'></View>
        </View>
        
        <User />
        <Book />
        <Service />
        <Facility />

      </View>
    );
  }
}

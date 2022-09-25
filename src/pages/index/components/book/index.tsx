import { Component } from 'react';
import { View, Picker } from '@tarojs/components';
import { AtIcon, AtList, AtListItem } from 'taro-ui';
import './index.less';

export default class Book extends Component {

  state = {
    dateSel: '2018-04-22'
  };
  
  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    });
  };
  
  render () {
    return (
      <View className='u-book'>
        <View className='date-wrapper'>
          {/* 入住日期 */}
          <Picker mode='date' onChange={this.onDateChange}>
            <View className='date-item'>
              <View className='label'>入住</View>
              <View className='value-date'>7月9日</View>
              <View className='value-day'>周六</View>
            </View>
          </Picker>

          {/* 离店日期 */}
          <View className='date-item'>
            <View className='label'>离店</View>
            <View className='value-date'>7月10日</View>
            <View className='value-day'>周日</View>
          </View>
          <View className='total-item'>
            <View className='total-item'>
            共 1 晚
              <AtIcon className='icon-right' value='chevron-right' size='12'></AtIcon>
            </View>
          </View>
        </View>
        <View className='btn-wrapper'>
          <View className='btn-book'>立即预约</View>
        </View>
      </View>
    );
  }
}

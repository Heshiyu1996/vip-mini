import { useMemo, useState } from 'react';
import { View, Picker } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { getDay, getDateGap, getYesterday, getTomorrow } from '@/utils/tool';
import './index.less';

const Book = () => {
  const [startDate, setStartDate] = useState('');
  const [startDay, setStartDay] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endDay, setEndDay] = useState('');

  const onChangeStartDate = e => {
    const date = e.detail.value;
    setStartDate(date);
  };
  const onChangeEndDate = e => {
    const date = e.detail.value;
    setEndDate(date);
  };

  const modifiedStartDate = useMemo(() => {
    if (!startDate) return '请选择';
    const [_, month, day] = startDate?.split('-');
    const shortDate = `${`${Number(month)}`}月${`${Number(day)}`}日`;

    setStartDay(`周${getDay(startDate)}`);
    return shortDate;
  }, [startDate]);

  const modifiedEndDate = useMemo(() => {
    if (!endDate) return '请选择';
    const [_, month, day] = endDate?.split('-');
    const shortDate = `${`${Number(month)}`}月${`${Number(day)}`}日`;

    setEndDay(`周${getDay(endDate)}`);
    return shortDate;
  }, [endDate]);

  const gapDays = useMemo(() => {
    if (!startDate || !endDate) return '';
    console.log(startDate, endDate);
    
    return getDateGap(startDate, endDate);
  }, [startDate, endDate]);
  
  return (
    <View className='u-book'>
      <View className='date-wrapper'>
        {/* 入住日期 */}
        <Picker mode='date' end={getYesterday(endDate)} onChange={onChangeStartDate}>
          <View className='date-item'>
            <View className='label'>入住</View>
            <View className='value-date'>{modifiedStartDate}</View>
            <View className='value-day'>{startDay}</View>
          </View>
        </Picker>

        {/* 离店日期 */}
        <Picker mode='date' start={getTomorrow(startDate)} onChange={onChangeEndDate}>
          <View className='date-item'>
            <View className='label'>离店</View>
            <View className='value-date'>{modifiedEndDate}</View>
            <View className='value-day'>{endDay}</View>
          </View>
        </Picker>

        <View className='total-item' style={{ visibility: gapDays ? 'visible' : 'hidden' }}>
          <View className='total-item'>
            共 {gapDays} 晚
            <AtIcon className='icon-right' value='chevron-right' size='12'></AtIcon>
          </View>
        </View>
      </View>
      <View className='btn-wrapper'>
        <View className='btn-book'>立即预约</View>
      </View>
    </View>
  );
};

export default Book;

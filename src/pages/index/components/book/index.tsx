import { useEffect, useMemo, useRef, useState } from 'react';
import { View, Picker } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { getDay, getDateGap, getYesterday, getTomorrow, getToday } from '@/utils/tool';
import './index.less';

const Book = (props) => {
  const { className, visibleBtn = true, defaultStartDate = '', defaultEndDate = '', from = '', btnText = '提交', onChange = () => '', onSearch } = props;
  
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [startDay, setStartDay] = useState('');
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [endDay, setEndDay] = useState('');

  const startDateRef = useRef({ current: defaultStartDate });
  const endDateRef = useRef({ current: defaultEndDate });

  useEffect(() => {
    if (!defaultStartDate || !defaultEndDate) return;
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
    if (from === 'book') {
      setTimeout(() => {
        onSearch(startDateRef.current, endDateRef.current);
      }, 1000)
    }
  }, [defaultStartDate, defaultEndDate]);


  const gapDays = useMemo(() => {
    if (!startDate || !endDate) return '';
    console.log(startDate, endDate);
    startDateRef.current = startDate;
    endDateRef.current = endDate;
    
    return getDateGap(startDate, endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    // 如果 gap 为负数或同一天，离店时间默认为后一天
    if (gapDays <= 0) {
      setEndDate(getTomorrow(startDate));
    }
  }, [gapDays]);

  const onChangeStartDate = e => {
    const date = e.detail.value;
    setStartDate(date);
    onChange(date, endDate);
  };
  const onChangeEndDate = e => {
    const date = e.detail.value;
    setEndDate(date);
    onChange(startDate, date);
  };

  const modifiedStartDate = useMemo(() => {
    if (!startDate) return '请选择';
    setStartDay(`${getDay(startDate)}`);

    const [_, month, day] = startDate?.split('-');
    const shortDate = `${`${Number(month)}`}月${`${Number(day)}`}日`;
    return shortDate;
  }, [startDate]);

  const modifiedEndDate = useMemo(() => {
    if (!endDate) return '请选择';
    setEndDay(`${getDay(endDate)}`);

    const [_, month, day] = endDate?.split('-');
    const shortDate = `${`${Number(month)}`}月${`${Number(day)}`}日`;
    return shortDate;
  }, [endDate]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(startDate, endDate);
    }
  };
  
  return (
    <View className={`u-book ${className}`}>
      <View className='date-wrapper'>
        {/* 入住日期 */}
        {/* <Picker mode='date' start={getToday()} end={getYesterday(endDate)} onChange={onChangeStartDate}> */}
        <Picker mode='date' value={startDate} start={getToday()} onChange={onChangeStartDate}>
          <View className='date-item'>
            <View className='label'>入住</View>
            <View className='value-date'>{modifiedStartDate}</View>
            <View className='value-day'>{startDay}</View>
          </View>
        </Picker>

        {/* 离店日期 */}
        <Picker mode='date' value={endDate} start={getTomorrow(startDate)} onChange={onChangeEndDate}>
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
      {visibleBtn && <View className='btn-wrapper' onClick={handleSearch}>
        <View className='btn-book'>{btnText}</View>
      </View>}
    </View>
  );
};

export default Book;

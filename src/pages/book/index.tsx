import { useEffect, useRef, useState } from 'react';
import Taro, { useDidHide, useDidShow } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { getRoomList } from '@/service/api/book';
import { getToday } from '@/utils/tool';
import { withContext } from '@/components/context';
import type CustomTabBar from '../../custom-tab-bar';
import Book from '../index/components/book';
import './index.less';
import RoomShare from './components/share';

const today = getToday();
const { statusBarHeight } = Taro.getSystemInfoSync();
const { height } = Taro.getMenuButtonBoundingClientRect();
const titleBarHeight = statusBarHeight + height + 10;

const DefaultImg = 'https://vip.gdxsjt.com/medias/uploads/room_room-config_20220823222146_e97996.png';

const PageBook = (props) => {
  const { userInfo } = props || {};
  const { isStaff } = userInfo || {};
  
  const [defaultStartDate, setDefaultStartDate] = useState('');
  // TODO: 
  const [defaultEndDate, setDefaultEndDate] = useState('2023-06-12');
  const [list ,setList] = useState([]);
  const refCurrentPage = useRef(1);
  const fetchBookList = async (startDate, endDate) => {
    if (startDate === endDate) {
      Taro.showToast({
        title: '入住、离店不能为同一天',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    const params = {
      startDate,
      endDate,
    };
    const data = await getRoomList(params);
    // 更新list
    const newList = data;
    setList(newList);
    // 更新当前页码
    refCurrentPage.current++;
  };
  useEffect(() => {
    if (defaultStartDate && defaultEndDate) {
      fetchBookList(defaultStartDate, defaultEndDate);
    }
  }, [defaultStartDate, defaultEndDate]);

  const goToDetail = (id) => {
    Taro.navigateTo({ url: `/pages/book-detail/index?id=${id}&startDate=${defaultStartDate}&endDate=${defaultEndDate}` });
  };
  
  useDidShow(() => {
    const pageCtx = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar<CustomTabBar>(pageCtx);
    tabbar?.setSelected(1);
  });

  useDidShow(() => {
    const startDate = Taro.getStorageSync('startDate') || today;
    const endDate = Taro.getStorageSync('endDate');

    setDefaultStartDate(startDate);
    setDefaultEndDate(endDate);
  });

  useDidHide(() => {
    setDefaultStartDate('');
    setDefaultEndDate('');
  });

  const onChange = (startDate, endDate) => {
    setDefaultStartDate(startDate);
    setDefaultEndDate(endDate);

    // 记录参数到 storage 以便剞劂 switch 不能携带参数问题
    Taro.setStorageSync('startDate', startDate);
    Taro.setStorageSync('endDate', endDate);
  };

  // TODO: 默认false
  const [visibleRoomShare, setVisibleRoomShare] = useState(true);
  const [roomShareInfo, setRoomShareInfo] = useState({});
  const shareRoom = (item) => {
    setRoomShareInfo(item);
    setVisibleRoomShare(true);
  };

  return (
    <View className='m-book' style={{ paddingTop: `${titleBarHeight}px` }}>
      <Book 
        className='book-selector'
        defaultStartDate={defaultStartDate}
        defaultEndDate={defaultEndDate}
        visibleBtn={false}
        onChange={onChange}
        onSearch={fetchBookList}
      />

      <View className='room-list'>
        {
          list?.map((item) => 
            <View key={item.id} className='item'>
              <Image className='img' src={item.images?.[0] || DefaultImg} onClick={() => {
                Taro.previewImage({
                  current: item.images?.[0] || '', // 当前显示图片的http链接
                  urls: item.images || [] // 需要预览的图片http链接列表
                });
              }}
              />
              <View className='tag-count'>{item?.images?.length}</View>
              <View className='info' onClick={() => goToDetail(item.id)}>
                <View className='type'>{item.roomType}</View>
                {isStaff && <View className='icon-share' onClick={(ev) =>{
                  ev.stopPropagation();
                  shareRoom(item);
                }}
                />}
                <View className='desc'>{item.roomFacility}</View>
                {/* <View className='icon down' /> */}
                <View className='price-wrapper'>
                  {(item.currentPrice !== item.originPrice) && <Text className='price origin'>{item.originPrice}</Text>}
                  <Text className='price current'>{item.currentPrice}</Text>
                </View>
                {
                  item?.tag?.length && <View className='tag-wrapper'>
                    {item?.tag?.map((tag) => <View className='tag'>{tag}</View>)}
                  </View>
                }
              </View>
            </View>)
        }
      </View>

      <RoomShare 
        visible={visibleRoomShare} 
        roomShareInfo={roomShareInfo} 
        close={() => setVisibleRoomShare(false)} 
      />
    </View>
  );
};
export default withContext(PageBook);
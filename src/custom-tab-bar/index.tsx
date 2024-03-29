import Taro from '@tarojs/taro';
import { Component } from 'react';
import { View, Image, CoverView } from '@tarojs/components';
import bus from '@/utils/bus';
// import ImgCode from '../images/tab-bar/code.png';
import ImgBg from '../images/tab-bar/bg.png';
import './index.less';

// 自定义导航栏（仅小程序模式有效，H5无效）
export default class CustomTabbar extends Component {
  constructor(props) {
    super(props);

    bus.on('switchTabbar', (visible) => {
      this.setState({ visible });
    });
  }

  state = {
    visible: true,
    selected: 0,
    color: '#AEAEAE',
    selectedColor: '#152736',
    list: [
      {
        pagePath: '/pages/index/index',
        selectedIconPath: '/images/tab-bar/index-active.png',
        iconPath: '/images/tab-bar/index.png',
        text: '首页'
      },
      {
        pagePath: '/pages/book/index',
        selectedIconPath: '/images/tab-bar/book-active.png',
        iconPath: '/images/tab-bar/book.png',
        text: '订房'
      },
      {
        pagePath: '/pages/code/index',
        selectedIconPath: '/images/tab-bar/code.png',
        iconPath: '/images/tab-bar/code.png',
        isCenter: true,
        isHide: true,
      },
      {
        pagePath: '/pages/order/index',
        selectedIconPath: '/images/tab-bar/order-active.png',
        iconPath: '/images/tab-bar/order.png',
        text: '订单'
      },
      {
        pagePath: '/pages/mine/index',
        selectedIconPath: '/images/tab-bar/mine-active.png',
        iconPath: '/images/tab-bar/mine.png',
        text: '我的'
      }
    ]
  };

  switchTab(index, url) {
    // this.setSelected(index);
    Taro.switchTab({ url });
  }

  setSelected (idx: number) {
    this.setState({
      selected: idx
    });
  }

  jumpIntellect = () => {
    Taro.switchTab({url: '/pages/code/index'});
  };


  render() {
    const { visible, list, selected, color, selectedColor } = this.state;

    return (
      <View className={`tab-bar ${visible ? '' : 'hidden'}`}>
        <Image className='tab-bar-bg' src={ImgBg} />
        <View className='tab-bar-bg-bottom'></View>

        <View className='tab-bar-btn-wrapper'>
          {list.map((item, index) =>
            (
              <View key={index} className='item' onClick={this.switchTab.bind(this, index, item.pagePath)}>
                <Image className={`icon ${item.isHide ? 'hide' : ''}`} src={selected === index ? item.selectedIconPath : item.iconPath} />
                <View className='text' style={{ color: selected === index ? selectedColor : color }}>{item.isHide ? '' : item.text}</View>
              </View>
            )
          )}
        </View>

        <CoverView className='tab-bar-btn-code' onClick={this.jumpIntellect} />
      </View>
    );
  }
}
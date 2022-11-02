import { useMemo, useRef, useState } from 'react';
import { View, Image, Text } from '@tarojs/components';
import './index.less';
import Taro from '@tarojs/taro';

const ImageList = [
  'https://vip.gdxsjt.com/medias/uploads/null_mp_20220917213812_cdbd97.png',
  'https://vip.gdxsjt.com/medias/uploads/null_mp_20220917213838_bd1aae.png',
  'https://vip.gdxsjt.com/medias/uploads/null_mp_20220917213852_723794.png'
];

const IntroItem = (props) => {
  const { data } = props;
  const { label, value, images = ImageList } = data || {};

  const isMultiImages = useMemo(() => images?.length > 1, [images]);
  const currentRef = useRef('');

  return (
    <View className='u-intro-item'>
      <View className='u-title'>{label}</View>
      <View className='u-content'>
        {!!value && <Text className='text'>{value}</Text>}
        {
          isMultiImages ?
            <View
              className='slide-wrapper'
              onClick={() => {
                Taro.previewImage({
                  current: currentRef.current || '', // 当前显示图片的http链接
                  urls: images // 需要预览的图片http链接列表
                });
              }}
            >
              {
                images?.map((item) => <Image className='item' src={item} onClick={() => (currentRef.current = item)} />)
              }
            </View>
            :
            <Image 
              className='single-image'
              src={images?.[0]}
              onClick={() => {
                Taro.previewImage({
                  current: images?.[0] || '', // 当前显示图片的http链接
                  urls: images // 需要预览的图片http链接列表
                });
              }}
            />
        }
        
      </View>
    </View>
  );
};

export default IntroItem;

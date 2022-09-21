import { useMemo } from 'react';
import { View, Image, Text } from '@tarojs/components';
import './index.less';

const ImageList = [
  'https://vip.gdxsjt.com/medias/uploads/null_mp_20220917213812_cdbd97.png',
  'https://vip.gdxsjt.com/medias/uploads/null_mp_20220917213838_bd1aae.png',
  'https://vip.gdxsjt.com/medias/uploads/null_mp_20220917213852_723794.png'
];

const IntroItem = (props) => {
  const { data } = props;
  const { label, value, images } = data || {};

  const isMultiImages = useMemo(() => images?.length > 1, [images]);

  return (
    <View className='u-intro-item'>
      <View className='u-title'>{label}</View>
      <View className='u-content'>
        {!!value && <Text className='text'>{value}</Text>}
        {
          isMultiImages ?
            <View className='slide-wrapper'>
              {
                ImageList?.map((item) => <Image className='item' src={item} />)
              }
            </View>
            :
            <Image 
              className='single-image'
              src={images?.[0]}
            />
        }
        
      </View>
    </View>
  );
};

export default IntroItem;

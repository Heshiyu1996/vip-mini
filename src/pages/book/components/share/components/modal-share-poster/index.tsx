// import { useState } from 'react';
import { Button, View, Image } from "@tarojs/components";
// import Taro from "@tarojs/taro";
import { useState } from "react";
import { QRCode } from "taro-code";
import { AtModal, AtModalAction, AtModalContent, AtModalHeader } from "taro-ui";
import './index.less';

const DefaultImg = 'https://vip.gdxsjt.com/medias/uploads/room_room-config_20220823222146_e97996.png';

const ModalSharePoster = (props) => {
  const { visible, data, onClose } = props;
  const { id, images, originPrice, roomType, roomFacility } = data || {};
  
  const [link, setLink] = useState('default link');
  // TODO: 保存图片
  const onOk = () => {
    // onClose();
  };

  return (
    <AtModal
      className='u-modal-share-poster'
      isOpened={visible}
      closeOnClickOverlay={false}
    >
      <AtModalHeader>海报分享</AtModalHeader>
      <AtModalContent>
        <Image className='poster' src={images?.[0] || DefaultImg} />
        <View className='info'>
          <View className='left'>
            <View className='title'>{roomType}</View>
            <View className='desc'>{roomFacility}</View>
          </View>

          <View className='right'>
            <View className='price'>{originPrice}</View>
            <QRCode
            // TODO: 扫码后的url
              className='code'
              text={link}
              size={70}
              scale={4}
              errorCorrectLevel='M'
              typeNumber={2}
            />
            <View className='tip'>识别二维码<br />直达购买</View>
          </View>

        </View>
      </AtModalContent>
      <AtModalAction> 
        <Button onClick={onClose}>取消</Button> 
        <Button onClick={onOk}>保存海报</Button> 
      </AtModalAction>
    </AtModal>
  );
};
export default ModalSharePoster;
// import { useState } from 'react';
import { Button, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
// import { useState } from "react";
import { QRCode } from "taro-code";
import { AtModal, AtModalAction, AtModalContent, AtModalHeader } from "taro-ui";
import './index.less';

const ModalShareScan = (props) => {
  const { visible, data, link, onClose } = props;
  console.log(props, 12321);
  const { id, roomType, roomFacility } = data || {};
  
  // const [link, setLink] = useState('default link');
  // TODO: 保存图片
  const onOk = () => {
    Taro.saveImageToPhotosAlbum({
      success: function (res) { }
    });
    // onClose();
  };

  return (
    <AtModal
      className='u-modal-share-scan'
      isOpened={visible}
      closeOnClickOverlay={false}
    >
      <AtModalHeader>扫码分享</AtModalHeader>
      <AtModalContent>
        <View className='info'>
          <View className='title'>{roomType}</View>
          <View className='desc'>{roomFacility}</View>
        </View>
        <View className='link'>
          {link && <QRCode
            // TODO: 扫码后的url
            className='code'
            text={link}
            size={170}
            scale={4}
            errorCorrectLevel='M'
            typeNumber={2}
          />}
        </View>
      </AtModalContent>
      <AtModalAction> 
        <Button onClick={onClose}>取消</Button> 
        <Button onClick={onOk}>保存图片</Button> 
      </AtModalAction>
    </AtModal>
  );
};
export default ModalShareScan;
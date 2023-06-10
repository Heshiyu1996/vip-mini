// import { useState } from 'react';
import { Button, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { AtModal, AtModalAction, AtModalContent, AtModalHeader } from "taro-ui";
import './index.less';

const ModalShareLink = (props) => {
  const { visible, data, onClose } = props;
  console.log(props, 12321);
  const { id, roomType, roomFacility } = data || {};
  
  const [link, setLink] = useState('default link');
  const onOk = () => {
    Taro.setClipboardData({
      data: link,
      success: function (res) {
        Taro.getClipboardData({
          success: function (res) {
            console.log(res.data, 94848); // data
          }
        });
      }
    });
    // onClose();
  };

  return (
    <AtModal
      className='u-modal-share-link'
      isOpened={visible}
      closeOnClickOverlay={false}
    >
      <AtModalHeader>链接分享</AtModalHeader>
      <AtModalContent>
        <View className='info'>
          <View className='title'>{roomType}</View>
          <View className='desc'>{roomFacility}</View>
        </View>
        <View className='link'>{link}</View>
      </AtModalContent>
      <AtModalAction> 
        <Button onClick={onClose}>取消</Button> 
        <Button onClick={onOk}>复制</Button> 
      </AtModalAction>
    </AtModal>
  );
};
export default ModalShareLink;
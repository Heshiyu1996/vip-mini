// import { useState } from 'react';
import { Button, View } from "@tarojs/components";
import { AtModal, AtModalAction, AtModalContent, AtModalHeader } from "taro-ui";
import './index.less';

const ModalShareLink = (props) => {
  const { visible, onOk, onClose } = props;
  console.log(props, 12321);

  return (
    <AtModal
      className='u-modal-share-link'
      isOpened={visible}
      confirmText='同意'
      cancelText='取消'
      onConfirm={onOk}
      onCancel={onClose}
      closeOnClickOverlay={false}
    >
      <AtModalHeader>链接分享</AtModalHeader>
      <AtModalContent>
        <View className='info'>
          <View className='title'>高级大床房</View>
          <View className='desc'>大床1.8m（1张）</View>
        </View>
        <View className='link'>http://vip.gdxsjt.com/xxx/xxx?id=123456</View>
      </AtModalContent>
      <AtModalAction> 
        <Button>取消</Button> 
        <Button>确定</Button> 
      </AtModalAction>
    </AtModal>
  );
};
export default ModalShareLink;
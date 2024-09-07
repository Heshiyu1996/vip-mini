// import { useState } from 'react';
import { Button, Input, Text, View } from "@tarojs/components";
import { useState } from "react";
import { AtModal, AtModalAction, AtModalContent, AtModalHeader } from "taro-ui";
import Taro from "@tarojs/taro";
import { sendShareRoomMsg } from "@/service";
import './index.less';

const ModalShareMessage = (props) => {
  const { visible, data, link, onClose } = props;

  const { id, roomType, roomFacility } = data || {};
  
  const [mobile, setMobile] = useState();
  const onOk = async () => {
    const params = {
      targetMobileNumber: mobile,
      roomId: id,
    };
    await sendShareRoomMsg(params);

    Taro.showToast({
      title: '发送短信成功!',
      icon: 'none',
      duration: 1000,
      success: () => {
        onClose();
      },
    });
  };

  return (
    <AtModal
      className='u-modal-share-message'
      isOpened={visible}
      closeOnClickOverlay={false}
    >
      <AtModalHeader>短信分享</AtModalHeader>
      <AtModalContent>

        <View className='item'>
          <Text className='label'>接收手机号</Text>
          <Input className='value' placeholder='请输入' value={mobile} onInput={val => setMobile(val.detail.value)} maxlength={11} />
        </View>
        <View className='info'>
          <View className='title'>{roomType}</View>
          <View className='desc'>{roomFacility}</View>
        </View>
        <View className='message'>【温泉好房推荐】你的朋友分享给您翔顺金水台温泉特色小镇的特色好房，点击链接 {link} 可查看或预订客房，咨询电话0766-2513333</View>
      </AtModalContent>
      <AtModalAction> 
        <Button onClick={onClose}>取消</Button> 
        <Button onClick={onOk}>发送</Button> 
      </AtModalAction>
    </AtModal>
  );
};
export default ModalShareMessage;
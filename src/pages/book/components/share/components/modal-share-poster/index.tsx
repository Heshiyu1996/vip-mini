// import { useState } from 'react';
import { Button, View, Image } from "@tarojs/components";
// import Taro from "@tarojs/taro";
import { useState } from "react";
import { QRCode } from "taro-code";
import { AtModal, AtModalAction, AtModalContent, AtModalHeader } from "taro-ui";
import './index.less';

const DefaultImg = 'https://vip.gdxsjt.com/medias/uploads/room_room-config_20220823222146_e97996.png';

const defaultData = {
  "id": 4,
  "roomType": "豪华双床房",
  "originPrice": 1880,
  "currentPrice": 1786,
  "enableRoomTicket": true,
  "roomFacility": "房间面积约33㎡；有窗、阳台、2张1.3米单人床、吹风机、空调、电视、座机、，毛巾、浴袍、一次性牙膏牙刷、一次性浴帽、梳子、拖鞋、无线网络",
  "policyDesc": "1、取消政策：平日入住前一天18点可免费取消，周五/六入住前三天18点可免费取消，国家规定节假日不可取消。\n2、酒店办理入住时间：15：00-24：00。\n3、酒店退房时间：次日中午12：00前。\n4、产品咨询热线：0766-2513111",
  "giftPackages": "1、双人自助早餐\n2、双人无限次莲花温泉\n3、12月31日前，入住赠送一份茶叶手礼",
  "tag": [
    "金礼卡享9.5折",
    "奖励金10.72元"
  ],
  "rewardPercent": 3.4,
  "images": [
    "https://vip.gdxsjt.com/medias/uploads/room_room-config_20220829151239_a9b81b.jpg",
    "https://vip.gdxsjt.com/medias/uploads/room_room-config_20221018171620_360dfd.jpg"
  ],
  "vipDiscount": true
};


const ModalSharePoster = (props) => {
  const { visible, data, onClose } = props;
  // TODO: defaultData
  const { id, images, originPrice, roomType, roomFacility } = defaultData || data || {};
  console.log(props, defaultData, 12321);
  
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
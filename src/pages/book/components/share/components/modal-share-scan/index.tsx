import { Button, View } from "@tarojs/components";
import Taro, { getSetting, authorize } from "@tarojs/taro";
import { useRef } from "react";
import { QRCode } from "taro-code";
import { AtModal, AtModalAction, AtModalContent, AtModalHeader } from "taro-ui";
import './index.less';

const ModalShareScan = (props) => {
  const { visible, data, link, onClose } = props;
  const { roomType, roomFacility } = data || {};
  // TODO: 保存图片
  const beforeCheckAuth = () => {
    getSetting({
      success({ authSetting }) {
        if (!authSetting['scope.writePhotosAlbum']) {
          authorize({
            scope: 'scope.writePhotosAlbum',
            success(res) {
              handleWriteFile();
            },
          });
          return;
        }
        handleWriteFile();
      },
    });
  };

  const handleWriteFile = () => {
    const { src } = qrCodeRef.current.childNodes[0]?.props;
    const srcData = src?.split('.')?.[0];
    base64ToBuffer(srcData, localUrl => {
      //存入相册
      Taro.saveImageToPhotosAlbum({
        filePath: localUrl,
        success: function () { 
          Taro.showToast({
            title: '保存成功!',
            icon: 'success',
            duration: 2000
          });
          onClose();
        },
        fail(res) {
          console.log(res, 222);
        },
      });
    });
  };

  const base64ToBuffer = (base64data, calback) => {
    const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
    if (!format) {
      return new Error('ERROR_BASE64SRC_PARSE');
    }
    let FILE_BASE_NAME = new Date().getTime();
    // const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
    const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.png`;
    const buffer = wx.base64ToArrayBuffer(bodyData);
    const fsm = wx.getFileSystemManager();
    fsm.writeFile({
      filePath,
      data: buffer,
      encoding: 'binary',
      success() {
        calback(filePath);
      },
      fail() {
        calback(base64data); // return (new Error(‘ERROR_BASE64SRC_WRITE’));
      }
    });
  };

  const qrCodeRef = useRef<any>();

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
        <View className='link' ref={qrCodeRef}>
          {link && <QRCode
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
        <Button onClick={beforeCheckAuth}>保存图片</Button> 
      </AtModalAction>
    </AtModal>
  );
};
export default ModalShareScan;
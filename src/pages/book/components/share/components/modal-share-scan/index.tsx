import { base64ToBuffer } from "@/utils/tool";
import { Button, Canvas, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useRef } from "react";
import { QRCode } from "taro-code";
import { AtModal, AtModalAction, AtModalContent, AtModalHeader } from "taro-ui";
import './index.less';

const ModalShareScan = (props) => {
  const { visible, data, link, onClose } = props;
  const { roomType, roomFacility } = data || {};

  const qrCodeRef = useRef<any>();


  const qrCodeCanvasRef = useRef<any>();

  /**
   * drawImage() 定义绘制图片的方法
   */
  const drawImage = (res) => {
    const canvas = res[0].node;
    
    qrCodeCanvasRef.current = canvas;
    const ctx = canvas.getContext('2d');

    // 设备像素比
    // 这里根据像素比来设置 canvas 大小
    const dpr = Taro.getSystemInfoSync().pixelRatio;
    
    canvas.width = 278 * dpr;
    canvas.height = 300 * dpr;
    ctx.scale(dpr, dpr);

    // 绘制背景色
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 278, 300);

    // 绘制房型介绍（容器）
    ctx.fillStyle = 'rgba(111, 139, 161, 0.15)';
    ctx.fillRect(10, 10, 258, 60);
    // 绘制房型介绍（房型）
    ctx.font = `normal 700 20px PingFangSC-Light,PingFang`;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.66)';
    const roomTypeText = roomType?.length > 10 ? `${roomType.slice(0, 10)}...` : roomType;
    ctx.fillText(roomTypeText, 20, 36);
    // 绘制房型介绍（配置）
    ctx.font = `normal 500 12px PingFangSC-Light,PingFang`;
    ctx.fillStyle = '#666';
    const roomFacilityText = roomFacility?.length > 20 ? `${roomFacility.slice(0, 20)}...` : roomFacility;
    ctx.fillText(roomFacilityText, 20, 56);

    // 绘制二维码
    const { image: imageSrc } = qrCodeRef.current;
    const srcData = imageSrc?.split('.')?.[0];

    base64ToBuffer(srcData, localUrl => {
      // 创建一个图片对象
      // 二维码是 base64 字符串，则需要使用 base64src 函数保存到本地后得到 url，因为 drawImage 不能绘制 base64。（开发者工具上可以，真机上不行。）
      const img = canvas.createImage();
      img.src = localUrl;
      img.onload = () => {
        // 绘制图像到画布
        ctx.drawImage(img, 40, 85, 200, 200);
      };
    });
  };

  /**
  * saveCard() 保存图片到本地
  */
  const saveCard = () => {
    const dpr = Taro.getSystemInfoSync().pixelRatio;
    Taro.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 278 * dpr,
      height: 300 * dpr,
      destWidth: 278 * dpr,
      destHeight: 300 * dpr,
      canvasId: '#cardCanvas',
      canvas: qrCodeCanvasRef.current,
      success(res) {
        Taro.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(saveRes) {
            console.log(saveRes, 'saveRes');
            onClose();
            Taro.showModal({
              title: '保存成功',
              content: '已成功保存到相册，快去分享吧',
              showCancel: false,
              confirmText: '好的'
            });
          }
        });
      },
      fail(fail) {
        console.log(fail);
        Taro.showModal({
          title: '图片保存失败',
          content: '请重新尝试!',
          showCancel: false,
          confirmText: '确认'
        });
      }
    });
  };

  // 绘制qrcode-canvas
  useEffect(() => {
    if (!visible) return;

    // 创建一个选择器对象
    const query = Taro.createSelectorQuery();
    if (query.select('#qrcodeCanvasId')) {
      query.select('#qrcodeCanvasId').fields({ node: true, size: true })
        .exec((res) => {
          drawImage(res);
        });
    }
  }, [visible]);

  return (
    <AtModal
      className='u-modal-share-scan'
      isOpened={visible}
      closeOnClickOverlay={false}
    >
      <AtModalHeader>扫码分享</AtModalHeader>
      <AtModalContent>
        <View className='content'>
          <Canvas
            id='qrcodeCanvasId'
            className='qrcode-canvas'
            canvasId='qrcodeCanvasId'
            canvas-id='qrcodeCanvasId'
            // style='width: 320px; height: 450px'
            type='2d'
          >
          </Canvas>
          {link && <QRCode
            ref={qrCodeRef}
            className='code'
            style={{ display: 'none' }}
            text={link}
            // text='http://vip.gdxsjt.com/landing/?invitation=eyJpZCI6Miwicm9vbUlkIjo0fQ=='
            size={170}
            scale={4}
            errorCorrectLevel='M'
            typeNumber={2}
          />}
        </View>
      </AtModalContent>
      <AtModalAction> 
        <Button onClick={onClose}>取消</Button> 
        <Button onClick={saveCard}>保存图片</Button> 
      </AtModalAction>
    </AtModal>
  );
};
export default ModalShareScan;
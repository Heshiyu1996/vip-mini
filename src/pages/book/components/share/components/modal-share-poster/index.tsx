import { base64ToBuffer, drawText } from "@/utils/tool";
import { Button, View, Canvas } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useRef } from "react";
import { QRCode } from "taro-code";
import { AtModal, AtModalAction, AtModalContent, AtModalHeader } from "taro-ui";
import './index.less';

const DefaultImg = 'https://vip.gdxsjt.com/medias/uploads/room_room-config_20220823222146_e97996.png';

const ModalSharePoster = (props) => {
  const { visible, data, link, onClose } = props;
  const { 
    // id, 
    images, 
    originPrice,  
    roomType, 
    roomFacility
  } = data || {};
  console.log(visible, images, 6678);
  

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
    
    canvas.width = 288 * dpr;
    canvas.height = 340 * dpr;
    ctx.scale(dpr, dpr);

    // 绘制背景色
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 288, 340);

    // 绘制海报
    const modifinedImages = images?.filter(item => item);
    Taro.getImageInfo({
      src: modifinedImages?.[0] || DefaultImg,  // 图片线上地址
      success(imageRes) {
        // 创建一个图片对象
        const img = canvas.createImage();
        img.src = imageRes.path;
        img.onload = () => {
          // 绘制图像到画布
          ctx.drawImage(img, 0, 0, 288, 200);
        };
      }
    });

    // 绘制价格
    ctx.font = `normal 700 20px PingFangSC-Light,PingFang`;
    ctx.fillStyle = '#FF2929';
    const originPriceText = originPrice?.length > 5 ? `${originPrice.slice(0, 5)}...` : originPrice;
    ctx.fillText(`￥${originPriceText}`, 215, 230);
    
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
        ctx.drawImage(img, 210, 240, 70, 70);
      };
    });

    // 绘制提示
    ctx.font = `normal 300 12px PingFangSC-Light,PingFang`;
    ctx.fillStyle = '#999999';
    ctx.fillText(`扫码直接购买`, 210, 330);
    
    // 绘制房型介绍（房型）
    ctx.font = `normal 700 20px PingFangSC-Light,PingFang`;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.66)';
    const roomTypeText = roomType?.length > 8 ? `${roomType.slice(0, 8)}...` : roomType;
    ctx.fillText(roomTypeText, 10, 230);
    // 绘制房型介绍（配置）
    ctx.font = `normal 500 12px PingFangSC-Light,PingFang`;
    ctx.fillStyle = '#AEAEAE';
    const roomFacilityText = roomFacility?.length > 60 ? `${roomFacility.slice(0, 60)}...` : roomFacility;
    drawText(roomFacilityText, 10, 230, 150, ctx);
  };
  /**
  * saveCard() 保存图片到本地
  */
  const saveCard = () => {
    const dpr = Taro.getSystemInfoSync().pixelRatio;
    Taro.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 288 * dpr,
      height: 340 * dpr,
      destWidth: 288 * dpr,
      destHeight: 340 * dpr,
      canvasId: '#posterCanvasId',
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
    if (query.select('#posterCanvasId')) {
      query.select('#posterCanvasId').fields({ node: true, size: true })
        .exec((res) => {
          drawImage(res);
        });
    }
  }, [visible]);
  
  return (
    <AtModal
      className='u-modal-share-poster'
      isOpened={visible}
      closeOnClickOverlay={false}
    >
      <AtModalHeader>海报分享</AtModalHeader>
      <AtModalContent>
        <View className='content poster'>
          <Canvas
            id='posterCanvasId'
            className='poster-canvas'
            canvasId='posterCanvasId'
            canvas-id='posterCanvasId'
            type='2d'
          >
          </Canvas>
          {link && <QRCode
            ref={qrCodeRef}
            className='code'
            style={{ display: 'none' }}
            text={link}
            size={50}
            scale={4}
            errorCorrectLevel='M'
            typeNumber={2}
          />}
        </View>
      </AtModalContent>
      <AtModalAction> 
        <Button onClick={onClose}>取消</Button> 
        <Button onClick={saveCard}>保存海报</Button> 
      </AtModalAction>
    </AtModal>
  );
};
export default ModalSharePoster;
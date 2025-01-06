import bus from "@/utils/bus";
import { useEffect, useState } from "react";
import { AtActionSheet, AtActionSheetItem } from "taro-ui";
import { getShareRoomLink } from "@/service";
import ModalShareLink from "./components/modal-share-link";
import ModalShareMessage from "./components/modal-share-message";
import ModalSharePoster from "./components/modal-share-poster";
import ModalShareScan from "./components/modal-share-scan";
import './index.less';

// eg: http://vip.gdxsjt.com/landing/?invitation=eyJpZCI6MTQsInJvb21JZCI6NH0=
const UrlLandingPrefix = `http://vip.gdxsjt.com/landing/`;

const RoomShare = (props) => {
  const { visible, close, roomShareInfo } = props;
  
  const [visibleModalShareLink, setVisibleModalShareLink] = useState(false);
  const [visibleModalShareMessage, setVisibleModalShareMessage] = useState(false);
  const [visibleModalShareScan, setVisibleModalShareScan] = useState(false);
  const [visibleModalSharePoster, setVisibleModalSharePoster] = useState(false);
  
  const [link, setLink] = useState('');
  useEffect(() => {
    if (!Object.keys(roomShareInfo).length) return;
    console.log(roomShareInfo, 1992);
    (async () => {
      const { id: roomId } = roomShareInfo;
      // TODO: 接口403
      const res = await getShareRoomLink({ roomId });
      console.log(res, 1993);
      // const res = 'invitation=eyJpZCI6MzB9';
      setLink(`${UrlLandingPrefix}?${res}`);
    })();
    
  }, [roomShareInfo]);


  const onSelect = (type) => {
    switch (type) {
    case 'scan':
      setVisibleModalShareScan(true);
      break;
    case 'poster':
      setVisibleModalSharePoster(true);
      break;

    case 'link':
      setVisibleModalShareLink(true);
      break; 
    case 'message':
      setVisibleModalShareMessage(true);
      break;   
    default:
      break;
    }

    // 关闭选择
    close();
  };

  useEffect(() => {
    bus.trigger('switchTabbar', !visible);
  }, [visible]);

  return (
    <>
      <AtActionSheet 
        className='u-room-share' 
        isOpened={visible} 
        onCancel={close}
        cancelText='取消' 
      >
        <AtActionSheetItem onClick={() => onSelect('scan')}>扫码分享</AtActionSheetItem>
        {/* <AtActionSheetItem onClick={() => onSelect('poster')}>海报分享</AtActionSheetItem> */}
        <AtActionSheetItem onClick={() => onSelect('link')}>链接分享</AtActionSheetItem>
        <AtActionSheetItem onClick={() => onSelect('message')}>短信分享</AtActionSheetItem>
      </AtActionSheet>

      <ModalShareLink visible={visibleModalShareLink} data={roomShareInfo} link={link} onClose={() => setVisibleModalShareLink(false)} />
      <ModalShareMessage visible={visibleModalShareMessage} data={roomShareInfo} link={link} onClose={() => setVisibleModalShareMessage(false)} />
      <ModalShareScan visible={visibleModalShareScan} data={roomShareInfo} link={link} onClose={() => setVisibleModalShareScan(false)} />
      <ModalSharePoster visible={visibleModalSharePoster} data={roomShareInfo} link={link} onClose={() => setVisibleModalSharePoster(false)} />
    </>
  );
};
export default RoomShare;
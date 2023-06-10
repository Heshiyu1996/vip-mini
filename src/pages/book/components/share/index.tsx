import { useState } from "react";
import { AtActionSheet, AtActionSheetItem } from "taro-ui";
import ModalShareLink from "./components/modal-share-link";
import ModalShareMessage from "./components/modal-share-message";
import ModalSharePoster from "./components/modal-share-poster";
import ModalShareScan from "./components/modal-share-scan";
import './index.less';

const RoomShare = (props) => {
  const { visible, close, roomShareInfo } = props;
  
  const [visibleModalShareLink, setVisibleModalShareLink] = useState(false);
  const [visibleModalShareMessage, setVisibleModalShareMessage] = useState(false);
  const [visibleModalShareScan, setVisibleModalShareScan] = useState(false);
  // TODO: 
  const [visibleModalSharePoster, setVisibleModalSharePoster] = useState(true);

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


  return (
    <>
      <AtActionSheet 
        className='u-room-share' 
        isOpened={visible} 
        cancelText='取消' 
      >
        <AtActionSheetItem onClick={() => onSelect('scan')}>扫码分享</AtActionSheetItem>
        <AtActionSheetItem onClick={() => onSelect('poster')}>海报分享</AtActionSheetItem>
        <AtActionSheetItem onClick={() => onSelect('link')}>链接分享</AtActionSheetItem>
        <AtActionSheetItem onClick={() => onSelect('message')}>短信分享</AtActionSheetItem>
      </AtActionSheet>

      <ModalShareLink visible={visibleModalShareLink} data={roomShareInfo} onClose={() => setVisibleModalShareLink(false)} />
      <ModalShareMessage visible={visibleModalShareMessage} data={roomShareInfo} onClose={() => setVisibleModalShareMessage(false)} />
      <ModalShareScan visible={visibleModalShareScan} data={roomShareInfo} onClose={() => setVisibleModalShareScan(false)} />
      <ModalSharePoster visible={visibleModalSharePoster} data={roomShareInfo} onClose={() => setVisibleModalSharePoster(false)} />
    </>
  );
};
export default RoomShare;
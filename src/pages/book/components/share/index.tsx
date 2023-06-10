import { useState } from "react";
import { AtActionSheet, AtActionSheetItem } from "taro-ui";
import ModalShareLink from "./components/modal-share-link";
import './index.less';

const RoomShare = (props) => {
  const { visible, close } = props;
  
  // TODO: 默认false
  const [visibleModalShareLink, setVisibleModalShareLink] = useState(false);
  const onSelect = (type) => {
    switch (type) {
    case 'scan':
        
      break;
    case 'poster':
          
      break;

    case 'link':
      setVisibleModalShareLink(true);
      break; 
    case 'message':
              
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

      <ModalShareLink visible={visibleModalShareLink} />
    </>
  );
};
export default RoomShare;
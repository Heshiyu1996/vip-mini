import { AtActionSheet, AtActionSheetItem } from "taro-ui";
import './index.less';

const RoomShare = (props) => {
  const { visible } = props;

  const onClick = (item) => {
    console.log(item, 8474);
    
  };

  return (
    <AtActionSheet 
      className='u-room-share' 
      isOpened={visible} 
      cancelText='取消' 
    >
      <AtActionSheetItem onClick={onClick}>扫码分享</AtActionSheetItem>
      <AtActionSheetItem onClick={onClick}>海报分享</AtActionSheetItem>
      <AtActionSheetItem onClick={onClick}>链接分享</AtActionSheetItem>
      <AtActionSheetItem onClick={onClick}>短信分享</AtActionSheetItem>
    </AtActionSheet>
  );
};
export default RoomShare;
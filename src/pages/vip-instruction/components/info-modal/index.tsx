import { AtModal } from "taro-ui";
import './index.less';

const ModalPolicyCovid = (props) => {
  const { visible, onClose, data } = props;
  const { title, desc } = data || {};

  return (
    <AtModal
      className='u-modal-info'
      isOpened={visible}
      title={title}
      confirmText='ζη₯ιδΊ'
      onConfirm={onClose}
      content={desc}
    />
  );
};
export default ModalPolicyCovid;
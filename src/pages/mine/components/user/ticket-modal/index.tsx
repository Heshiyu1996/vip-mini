import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { AtModal } from "taro-ui";
import { getTicketList } from '@/service/api/book';
import './index.less';

const ModalTicket = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(true);
  useImperativeHandle(ref, () => ({ 
    show: () => {
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
    }
  })); // 将form对象暴露给父组件

  const [content, setContent] = useState('');
  const fetchTicketList = async () => {
    try {
      const res = await getTicketList();
      const data = res.map((item) => item.roomType).join('、');
      setContent(data);
    } catch (error) {
      
    }
  };
  useEffect(() => {
    fetchTicketList();
  }, []);

  return (
    <AtModal
      className='u-modal-ticket'
      isOpened={visible}
      title='住房券使用范围'
      confirmText='我知道了'
      onConfirm={() => setVisible(false)}
      content={content}
    />
  );
});
export default ModalTicket;
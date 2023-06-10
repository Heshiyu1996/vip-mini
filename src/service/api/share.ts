import { get, post } from '@/service/http';

// 获得分享链接
export const getShareRoomLink = () => get(`/api/room/share/url`);

// 发送短信分享房间
export const sendShareRoomMsg = (params) => post(`/api/room/share/sendMsg`, params);

import { get, post } from '@/service/http';

// 获取客房列表
export const getRoomList = (params) => get('/api/room/list', params);
// 提交预定
export const bookRoom = (params) => post(`/api/room/book/${params.id}`, params);
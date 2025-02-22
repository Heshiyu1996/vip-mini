import { get, post } from '@/service/http';

// 获取客房列表
export const getRoomList = (params) => get('/api/room/list', params);
// 提交预定
export const bookRoom = (params) => post(`/api/room/book/${params.id}`, params);
// 获得预订费用明细
export const getPriceDetail = (params, invitation) => get(`/api/room/book/priceDetail?invitation=${invitation}`, params);
// 查询住房券可用客房列表
export const getTicketList = () => get('/api/room/ticket/list');

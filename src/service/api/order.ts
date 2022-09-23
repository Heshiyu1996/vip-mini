import { get, deleteRequest } from '@/service/http';

// 获取订单列表
export const getOrderList = (params) => get('/api/order/list', params);
// 删除订单
export const deleteOrder = (params) => deleteRequest(`/api/order/${params.id}`, params);
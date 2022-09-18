import { get, post } from '@/service/http';

// 提交反馈
export const addFeedback = (params) => get('/api/user/feedback/add', params);

// 获取订单列表
export const getOrderList = (params) => get('/api/order/list', params);
// 获取订单详情
export const getOrderDetail = (params) => get(`/api/order/detail/${params.orderId}`, params);
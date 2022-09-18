import { get, post } from '@/service/http';

// 取消订单
export const cancelOrder = (params?) => get(`/api/order/cancel/${params.orderId}`, params);
// 获取司机/乘客是否有正在进行的订单
export const checkProcessing = (params?) => get(`/api/order/check/processing`, params);
// 获取订单详情
export const getOrderDetail = (params) => get(`/api/order/detail/${params.orderId}`, params);

// 开始听单
export const startToListen = (params?) => get(`/api/order/search`, params);
// 接单
export const pickOrder = (params?) => get(`/api/order/pick/${params.orderId}`, params);
// 开始行程
export const startOrder = (params?) => get(`/api/order/start/${params.orderId}`, params);
// 到达目的地
export const finishOrder = (params?) => get(`/api/order/reach/${params.orderId}`, params);

// 线下报单 - 司机开单
export const createOfflineOrder = (params?) => post(`/api/order/place/offline`, params);
// 线下报单 - 确认到乘客身边
export const getOrderStatus = (params?) => get(`/api/order/pick/${params.orderId}`, params);


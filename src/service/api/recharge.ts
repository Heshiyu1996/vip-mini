import { get, post } from '@/service/http';

// 查询会员卡配置列表
export const getVipList = () => get(`/api/config/vip/list`);

// 查询充值记录
export const getRechargeList = (params) => get(`/api/payment/recharge/list`, params);

// 查询消费记录
export const getConsumptionList = (params) => get(`/api/payment/consumption/list`, params);

// 充值
export const recharge = (params) => post(`/api/payment/recharge/add`, params);

import { get, post } from '@/service/http';

// 获得当前积分余额
export const getPointBalance = () => get(`/api/point/balance`);

// 获取积分商城签到状态
export const getCheckInStatus = () => get(`/api/point/mall/checkIn/status`);

// 积分收入明细
export const getPointIncomeList = (params) => get(`/api/point/income/list`, params);

// 积分支出明细
export const getPointConsumptionList = (params) => get(`/api/point/consumption/list`, params);

// 商城签到
export const pointCheckIn = () => post(`/api/point/mall/checkIn`);
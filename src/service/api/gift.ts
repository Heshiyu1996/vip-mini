import { get } from '@/service/http';


// 积分收入明细
export const getPointIncomeList = (params) => get(`/api/point/income/list`, params);

// 积分支出明细
export const getPointConsumptionList = (params) => get(`/api/point/consumption/list`, params);
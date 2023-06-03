import { get, post } from '@/service/http';

// 查询当前用户的奖励金余额
export const getRewardBalance = () => get(`/api/user/reward/balance`);

// 提现奖励金
export const withdrawReward = (params) => post(`/api/user/reward/withdraw`, params);

// 获得奖励金收入明细
export const getRewardIncomeList = (params) => get(`/api/user/reward/income/list`, params);

// 获得奖励金提现明细
export const getRewardWithdrawList = (params) => get(`/api/user/reward/withdraw/list`, params);
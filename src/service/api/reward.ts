import { get, post } from '@/service/http';

// 查询当前用户的奖励金余额
export const getRewardBalance = () => get(`/api/user/reward/balance`);

// 提现奖励金
export const withdrawReward = (params) => post(`/api/user/reward/withdraw`, params);

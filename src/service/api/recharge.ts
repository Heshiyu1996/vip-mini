import { get } from '@/service/http';

// 查询会员卡配置列表
export const getVipList = () => get(`/api/config/vip/list`);

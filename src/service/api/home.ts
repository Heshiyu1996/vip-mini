import { get } from '@/service/http';

// 获取热门活动列表
export const getActivityList = (params) => get('/api/config/store/activity/list', params);

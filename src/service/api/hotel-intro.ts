import { get } from '@/service/http';

// 获取店铺配置
export const getStoreList = () => get(`/api/config/store/list`);

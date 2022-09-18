import { get, post } from '@/service/http';

// 检测用户是否注册
export const checkIfRegistered = () => get('/api/user/isRegistered');

// 获取验证码
export const getVerifyCode = (params) => get(`/api/user/${params.mobileNumber}/smsCode`, params);

// 获取userSession
export const getUserSession = (params) => get(`/api/user/session/${params.code}`, params);

// 登录（服务端）
export const login = (params?) => get(`/api/user/login`, params);

// 注册（服务端）
export const regist = (params?) => post(`/api/user/register`, params);

// 获取当前用户信息
export const getUserInfo = () => get(`/api/user/info`);

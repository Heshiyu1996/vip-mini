import Taro from '@tarojs/taro';

import { IHttpMethod } from './interface';
import { BASE_API, HTTP_STATUS, ERROR_TYPE_CODE } from './const';
import { logError } from './utils';

const token = '123';

// 参考：https://segmentfault.com/a/1190000016533592
const baseOptions = (params, method: keyof IHttpMethod = 'GET') => {
  let { url, data } = params;

  // let token = getApp().globalData.token
  // if (!token) login()

  // let contentType = 'application/x-www-form-urlencoded'
  let contentType = 'application/json';
  contentType = params.contentType || contentType;

  const option = {
    isShowLoading: false,
    url: BASE_API + url,
    data: data,
    method: method,
    header: { 
      'content-type': contentType,
      'token': token,
      userSession: Taro.getStorageSync('userSession'),
      'yuheng-application-via': 'driver'
    },
    success(res) {
      console.log(res, 66);
      
      // TODO: 后期需增加：登录态判断
      if (res.data?.code === HTTP_STATUS.NOT_FOUND) {
        return logError('api', '请求资源不存在');
      } else if (res.data?.code === HTTP_STATUS.BAD_GATEWAY) {
        return logError('api', '服务端出现了问题');
      } else if (res.data?.code === HTTP_STATUS.FORBIDDEN) {
        return logError('api', '没有权限访问');
      } else if (res.data?.code === HTTP_STATUS.SUCCESS) {
        return res.data;
      }
    },
    error(e) {
      logError('api', '请求接口出现问题', e);
    }
  };
  // 直接返回res.data
  return Taro.request(option)
    .then(res => {
      if (res?.data?.code === HTTP_STATUS.CLIENT_ERROR) {
        setTimeout(() => {
          Taro.showToast({
            title: res.data?.data?.errorMsg || res.data?.message,
            icon: 'none',
            duration: 2000
          });
        });
        if ([
          ERROR_TYPE_CODE.NOT_LOGIN,
          ERROR_TYPE_CODE.EXPIRED_SESSION,
          ERROR_TYPE_CODE.USER_UNAUTHORIZED_MOBILE_NUMBER
        ].includes(res.data?.data?.errorType)) {
          Taro.redirectTo({
            url: '/pages/login/index'
          });
        }
        throw res?.data;
      }
      return res?.data;
    });
};

export const get = (url, data = '') => {
  let option = { url, data };
  return baseOptions(option);
};

export const post = (url, data = '', contentType?) => {
  let params = { url, data, contentType };
  return baseOptions(params, 'POST');
};


export default {
  get,
  post
};

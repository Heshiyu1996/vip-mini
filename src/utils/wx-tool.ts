import Taro from '@tarojs/taro';

export const wxGetLoginCode = () => new Promise((resolve, reject) => {
  Taro.login({
    success: (res) => resolve(res.code),
    fail: (err) => reject(err)
  });
});

// 检查登录态
export function wxCheckLoginStatus () {
  return new Promise((resolve, reject) => {
    try {
          
      // 1. 检查前端是否存有userInfo
      const userInfo = Taro.getStorageSync('userInfo');
      if (!userInfo) return reject('【登录检查】无userInfo');

      // 2. 检查前端缓存userSession
      const userSession = Taro.getStorageSync('userSession');
      console.log('【登录检查】前端缓存', userSession);

      if (!userSession) return reject('【登录检查】登录态已过期');

      // 3. 检查session_key
      Taro.checkSession({
        // session_key 未过期，并且在本生命周期一直有效
        success: function () {
          console.log('【登录检查】session_key 未过期');

          return resolve(true);
        },
        // session_key 已经失效，需要重新执行登录流程
        fail: function () {
          // Taro.login() //重新登录
          return reject('【登录检查】session_key 已过期');
        }
      });
    } catch (e) {
      return reject('【登录检查】登录态已过期');
      // Do something when catch error
    }
  });
}
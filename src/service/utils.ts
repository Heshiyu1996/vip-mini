import Taro from '@tarojs/taro';

export const logError = (name, action, info = 'empty') => {
  Taro.showToast({
    title: action || '系统异常',
    icon: 'error',
    duration: 2000
  });

  try {
    let deviceInfo = Taro.getSystemInfoSync(); // 这替换成 taro的
    var device = JSON.stringify(deviceInfo);
  } catch (err) {
    console.error('not support getSystemInfoSync api', err.message);
  }
  // let time = formatTime(new Date())
  let time = new Date();
  console.error(time, name, action, info, device);
  // 如果使用了 第三方日志自动上报
  // if (typeof action !== 'object') {
  // fundebug.notify(name, action, info)
  // }
  // fundebug.notifyError(info, { name, action, device, time })
  if (typeof info === 'object') {
    info = JSON.stringify(info);
  }
};

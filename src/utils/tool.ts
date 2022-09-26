export function debounce(fn, delay = 500) {
  let timer;
  return function() {
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export function throttle(fn, delay = 500) {
  let startTime = Date.now();
  return function() {
    let args = arguments;
    let currentTime = Date.now();
    if (currentTime - startTime > delay) {
      fn.apply(this, args);
      startTime = currentTime; // 刷新旧的startTime
    }
  };
}

export function isName (name) {
  const reg = /^[\u4E00-\u9FA5]{2,4}$/;
  return reg.test(name);
}

/**
 * 身份证15位编码规则：dddddd yymmdd xx p dddddd：6位地区编码 yymmdd: 出生年(两位年)月日，如：910215 xx:
 * 顺序编码，系统产生，无法确定 p: 性别，奇数为男，偶数为女
 * 
 * 身份证18位编码规则：dddddd yyyymmdd xxx y dddddd：6位地区编码 yyyymmdd:
 * 出生年(四位年)月日，如：19910215 xxx：顺序编码，系统产生，无法确定，奇数为男，偶数为女 y: 校验码，该位数值可通过前17位计算获得
 * 
 * 前17位号码加权因子为 Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ] 验证位
 * Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ] 如果验证码恰好是10，为了保证身份证是十八位，那么第十八位将用X来代替
 * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 ) i为身份证号码1...17 位; Y_P为校验码Y所在校验码数组位置
 */
export function isIdCard(idCard) {
  // 15位和18位身份证号码的正则表达式
  var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

  // 如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdCard.test(idCard)) {
    if (idCard.length == 18) {
      var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10,
        5, 8, 4, 2]; // 将前17位加权因子保存在数组里
      var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
      var idCardWiSum = 0; // 用来保存前17位各自乖以加权因子后的总和
      for (var i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
      }

      var idCardMod = idCardWiSum % 11;// 计算出校验码所在数组的位置
      var idCardLast = idCard.substring(17);// 得到最后一位身份证号码

      // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod == 2) {
        if (idCardLast == "X" || idCardLast == "x") {
          //alert("恭喜通过验证啦！");
          return true;
        } else {
          //alert("身份证号码错误！");
          return false;
        }
      } else {
        // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == idCardY[idCardMod]) {
          //alert("恭喜通过验证啦！");
          return true;
        } else {
          //alert("身份证号码错误！");
          return false;
        }
      }
    }else{
      return true;
    }
  } else {
    //alert("身份证格式不正确!");
    return false;
  }
}

export function formatPrice (price) {
  return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 根据日期（格式：YYYY-MM-DD）获取当天星期几
export function getDay (date) {
  const list = ['日', '一', '二', '三', '四', '五', '六'];
  return list[new Date(date).getDay()];
}

// 根据两日期（格式：YYYY-MM-DD）获取相差几天
export function getDateGap (dateStart, dateEnd) {
  return ((new Date(dateEnd) - new Date(dateStart)) / (1000 * 60 * 60 * 24)).toFixed(0);
}

// 根据日期（格式：YYYY-MM-DD）获取当天后一天
export function getTomorrow (date) {
  if (!date) return '1970-01-01';
  const newDate = new Date(date);
  const tomorrow = newDate.setDate(newDate.getDate() + 1);
  const year = new Date(tomorrow).getFullYear();
  const month = new Date(tomorrow).getMonth() + 1;
  const day = new Date(tomorrow).getDate();
  return `${year}-${month}-${day}`;
}

// 根据日期（格式：YYYY-MM-DD）获取当天前一天
export function getYesterday (date) {
  if (!date) return '2999-01-01';
  const newDate = new Date(date);
  const tomorrow = newDate.setDate(newDate.getDate() + 1);
  const year = new Date(tomorrow).getFullYear();
  const month = new Date(tomorrow).getMonth() + 1;
  const day = new Date(tomorrow).getDate();
  return `${year}-${month}-${day}`;
}
export function getToday () {
  const datetime = new Date();
  return `${datetime.getFullYear()}-${datetime.getMonth() + 1}-${datetime.getDate()}`;
}
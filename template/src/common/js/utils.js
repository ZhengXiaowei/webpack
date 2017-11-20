import _ from 'lodash'
/**
 * 设置倒计时
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} target 目标元素
 */
let seconds = 60
export function countDown (target) {
  if (seconds === 0) {
    target.removeAttribute('disabled')
    target.innerText = '获取验证码'
    seconds = 60
  } else {
    target.setAttribute('disabled', true)
    target.innerText = seconds + '秒后重新发送'
    seconds--
    setTimeout(function () {
      countDown(target)
    }, 1000)
  }
}

/**
 * 寻找键值
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} arr 目标数组
 * @param {any} val 索引值
 * @param {boolean} [isObj=false] 是否对象
 * @returns
 */
export function findIndex (arr, val, isObj = false) {
  if (isObj) {
    return _.findIndex(arr, item => {
      return val === item.name
    })
  } else {
    return _.findIndex(arr, item => {
      return val === item
    })
  }
}

/**
 * 防抖
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} func 需要防抖的函数
 * @param {any} delay 延迟
 * @returns
 */
export function debounce (func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 将手机号中间四位隐藏
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} phoneNum 手机号
 * @returns
 */
export function hidePhone (phoneNum) {
  // 截取手机中间四位
  let midllePhone = phoneNum.substr(3, 4)
  return phoneNum.replace(midllePhone, '****')
}

/**
 * 获取cookie
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} name cookie名称
 * @returns
 */
export function getCookie (name) {
  var arr = document.cookie.replace(/\s/g, "").split(';')
  for (var i = 0; i < arr.length; i++) {
      var tempArr = arr[i].split('=')
      if (tempArr[0] == name) {
          return decodeURIComponent(tempArr[1])
      }
  }
  return ''
}

/**
 * 设置cookie
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} name cookie名称
 * @param {any} value cookie值
 * @param {any} days 过期时间
 */
export function setCookie (name, value, days) {
  var date = new Date()
  date.setDate(date.getDate() + days)
  document.cookie = name + '=' + value + ';expires=' + date
}

/**
 * 移除cookie
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} name 要移除的cookie
 */
export function removeCookie (name) {
  // 设置已过期，系统会立刻删除cookie
  setCookie(name, '1', -1)
}

/**
 * 获取随机数
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} min 最小值
 * @param {any} max 最大值
 * @returns
 */
export function randomNum (min, max) {
  return Math.floor(min + Math.random() * (max - min))
}

/**
 * 正则判断是否为email
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} str 邮箱
 * @returns
 */
export function isEmail (str) {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str)
}

/**
 * 判断是否为正确的手机号
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} str 手机号字符串
 * @returns
 */
export function isPhoneNum (str) {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}

/**
 * 获取starttime距离现在过去多久的时间差
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} startTime 起始时间
 * @returns
 */
export function formatPassTime (startTime) {
  var currentTime = Date.parse(new Date()),
      time = currentTime - startTime,
      day = parseInt(time / (1000 * 60 * 60 * 24)),
      hour = parseInt(time / (1000 * 60 * 60)),
      min = parseInt(time / (1000 * 60)),
      month = parseInt(day / 30),
      year = parseInt(month / 12);
  if (year) return year + "年前"
  if (month) return month + "个月前"
  if (day) return day + "天前"
  if (hour) return hour + "小时前"
  if (min) return min + "分钟前"
  else return '刚刚'
}

/**
 * 倒计时 距离endTime还有多久
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} endTime 目标时间
 * @returns
 */
export function formatRemainTime (endTime) {
  var startDate = new Date() //开始时间
  var endDate = new Date(endTime) //结束时间
  var t = endDate.getTime() - startDate.getTime() //时间差
  var d = 0,
      h = 0,
      m = 0,
      s = 0;
  if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24)
      h = Math.floor(t / 1000 / 60 / 60 % 24)
      m = Math.floor(t / 1000 / 60 % 60)
      s = Math.floor(t / 1000 % 60)
  }
  return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒"
}

/**
 * 将url的参数转成对象
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} url url
 * @returns
 */
export function parseQueryString (url) {
  url = url == null ? window.location.href : url
  var search = url.substring(url.lastIndexOf('?') + 1)
  if (!search) {
      return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

/**
 * 将对象序列化
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} obj 要序列化的对象
 * @returns 
 */
export function stringfyQueryString (obj) {
  if (!obj) return ''
  var pairs = []

  for (var key in obj) {
      var value = obj[key]
      if (value instanceof Array) {
          for (var i = 0; i < value.length; ++i) {
              pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
          }
          continue
      }
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
  }
  return pairs.join('&')
}
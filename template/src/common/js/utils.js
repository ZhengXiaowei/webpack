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
 * 字符串复制
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} str 要复制的字符串
 * @param {any} count 复制的次数
 * @returns
 */
export function repeatStr (str, count) {
  let text = ''
  for (let i = 0; i < count; i++) {
    text += str
  }
  return text
}

/**
 * 字符串替换
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} str 要替换的字符串
 * @param {any} regArr 字符串替换规则
 * @param {any} type 类型 0-将数组中间位或者数组里的数字长度的字符进行替换 1-和0相反
 * @param {any} ARepText 要替换成什么字符 默认*
 * @returns
 */
export function replaceStr (str, regArr, type, ARepText) {
  let regtext = ''
  let Reg = null
  let replaceText = ARepText || '*'
  // replaceStr('18819322663',[3,5,3],0)
  // 188*****663
  if (regArr.length === 3 && type === 0) {
    regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
    Reg = new RegExp(regtext)
    let replaceCount = repeatStr(replaceText, regArr[1])
    return str.replace(Reg, '$1' + replaceCount + '$2')
  } else if (regArr.length === 3 && type === 1) {
    // replaceStr('asdasdasdaa',[3,5,3],1)
    // ***asdas***
    regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
    Reg = new RegExp(regtext)
    let replaceCount1 = repeatStr(replaceText, regArr[0])
    let replaceCount2 = repeatStr(replaceText, regArr[2])
    return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
  } else if (regArr.length === 1 && type === 0) {
    // replaceStr('1asd88465asdwqe3',[5],0)
    // *****8465asdwqe3
    regtext = '(^\\w{' + regArr[0] + '})'
    Reg = new RegExp(regtext)
    let replaceCount = repeatStr(replaceText, regArr[0])
    return str.replace(Reg, replaceCount)
  } else if (regArr.length === 1 && type === 1) {
    // replaceStr('1asd88465asdwqe3',[5],1,'+')
    // "1asd88465as+++++"
    regtext = '(\\w{' + regArr[0] + '}$)'
    Reg = new RegExp(regtext)
    let replaceCount = repeatStr(replaceText, regArr[0])
    return str.replace(Reg, replaceCount)
  }
}

/**
 * 检测用户输入的密码强度
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} str 密码
 * @returns
 */
export function checkPwd (str) {
  var nowLv = 0
  if (str.length < 6) {
    return nowLv
  }
  if (/[0-9]/.test(str)) {
    nowLv++
  }
  if (/[a-z]/.test(str)) {
    nowLv++
  }
  if (/[A-Z]/.test(str)) {
    nowLv++
  }
  if (/[\\.|-|_]/.test(str)) {
    nowLv++
  }
  return nowLv
}

/**
 * 数组去重
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} arr 数组
 * @returns
 */
export function removeRepeatArray (arr) {
  return Array.from(new Set(arr))
}

/**
 * 重置数组顺序(打乱)
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} arr 数组
 * @returns
 */
export function upsetArr (arr) {
  return arr.sort(() => {
    return Math.random() - 0.5
  })
}

/**
 * 获取cookie
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} name cookie名称
 * @returns
 */
export function getCookie (name) {
  var arr = document.cookie.replace(/\s/g, '').split(';')
  for (var i = 0; i < arr.length; i++) {
    var tempArr = arr[i].split('=')
    if (tempArr[0] === name) {
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
  return /^1[3|4|5|7|8]\d{9}/.test(str)
}

/**
 * 获取starttime距离现在过去多久的时间差
 * @author ZhengXiaowei(503325017@qq.com)
 * @export
 * @param {any} startTime 起始时间
 * @returns
 */
export function formatPassTime (startTime) {
  let currentTime = Date.parse(new Date())
  let time = currentTime - startTime
  let day = parseInt(time / (1000 * 60 * 60 * 24))
  let hour = parseInt(time / (1000 * 60 * 60))
  let min = parseInt(time / (1000 * 60))
  let month = parseInt(day / 30)
  let year = parseInt(month / 12)
  if (year) return year + '年前'
  if (month) return month + '个月前'
  if (day) return day + '天前'
  if (hour) return hour + '小时前'
  if (min) return min + '分钟前'
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
  let startDate = new Date() // 开始时间
  let endDate = new Date(endTime) // 结束时间
  let t = endDate.getTime() - startDate.getTime() // 时间差
  let d = 0
  let h = 0
  let m = 0
  let s = 0
  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24)
    h = Math.floor(t / 1000 / 60 / 60 % 24)
    m = Math.floor(t / 1000 / 60 % 60)
    s = Math.floor(t / 1000 % 60)
  }
  return d + '天 ' + h + '小时 ' + m + '分钟 ' + s + '秒'
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
        pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]))
      }
      continue
    }
    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
  }
  return pairs.join('&')
}

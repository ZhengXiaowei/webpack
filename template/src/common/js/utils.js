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

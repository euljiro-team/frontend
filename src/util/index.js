import {common_util} from "@/utils/common_util";
import {common_date} from "@/utils/common_date";

const util = {
  common_util,
  common_date,

  /**
   * @param {string} url
   * @returns {Object}
   */
  getQueryObject(url) {
    url = url == null ? window.location.href : url
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
      const name = decodeURIComponent($1)
      let val = decodeURIComponent($2)
      val = String(val)
      obj[name] = val
      return rs
    })
    return obj
  },

  /**
   * @param {string} input value
   * @returns {number} output value
   */
  byteLength(str) {
    // returns the byte length of an utf8 string
    let s = str.length
    for (var i = str.length - 1; i >= 0; i--) {
      const code = str.charCodeAt(i)
      if (code > 0x7f && code <= 0x7ff) s++
      else if (code > 0x7ff && code <= 0xffff) s += 2
      if (code >= 0xDC00 && code <= 0xDFFF) i--
    }
    return s
  },
  /**
   * @param {Object} json
   * @returns {Array}
   */
  param(json) {
    if (!json) return ''
    return this.cleanArray(
      Object.keys(json).map(key => {
        if (json[key] === undefined) return ''
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
      })
    ).join('&')
  },

  /**
   * @param {string} url
   * @returns {Object}
   */
  param2Obj(url) {
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
    if (!search) {
      return {}
    }
    const obj = {}
    const searchArr = search.split('&')
    searchArr.forEach(v => {
      const index = v.indexOf('=')
      if (index !== -1) {
        const name = v.substring(0, index)
        const val = v.substring(index + 1, v.length)
        obj[name] = val
      }
    })
    return obj
  },
  /**
   * @param {string} val
   * @returns {string}
   */
  html2Text(val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
  },

  /**
   * @param {HTMLElement} element
   * @param {string} className
   */
  toggleClass(element, className) {
    if (!element || !className) {
      return
    }
    let classString = element.className
    const nameIndex = classString.indexOf(className)
    if (nameIndex === -1) {
      classString += '' + className
    } else {
      classString =
        classString.substr(0, nameIndex) +
        classString.substr(nameIndex + className.length)
    }
    element.className = classString
  },
  /**
   * @param {string} type
   * @returns {Date}
   */
  getTime(type) {
    if (type === 'start') {
      return new Date().getTime() - 3600 * 1000 * 24 * 90
    } else {
      return new Date(new Date().toDateString())
    }
  },

  /**
   * @param {Function} func
   * @param {number} wait
   * @param {boolean} immediate
   * @return {*}
   */
  debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp

      // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }

    return function (...args) {
      context = this
      timestamp = +new Date()
      const callNow = immediate && !timeout
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }

      return result
    }
  },
  /**
   * @param {Array} arr
   * @returns {Array}
   */
  uniqueArr(arr) {
    return Array.from(new Set(arr))
  },

  /**
   * @returns {string}
   */
  createUniqueString() {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(randomNum + timestamp)).toString(32)
  },

}

export default util

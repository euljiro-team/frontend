import Vue from 'vue'
import crypto from 'crypto'

export const common_util = {
  onInit: (masterCode) => {
    console.log(masterCode)
  },
  lpad: (str, padLength, padString) => {
    while (str.length < padLength) {
      str = padString + str
    }
    return str
  },
  rpad: (str, padLength, padString) => {
    while (str.length < padLength) {
      str += padString
    }
    return str
  },
  isNull: (val) => {
    try {
      if (typeof val === 'number' && val === 0) {
        return false
      }
      if (typeof val === 'object') {
        if (val === null || Object.keys(val).length < 1) {
          return true
        }
      }
      if (val === null || val === '' || val === undefined || val === 'undefined' || val === 'null') {
        return true
      }
      return false
    } catch {
      return true
    }
  },
  getCommonCode: (code) => {
    const codeList = JSON.parse(window.sessionStorage.getItem('Code'))

    if (codeList === null || codeList.length < 1) {
      return null
    }
    var codeData = codeList.filter(v => { return v.mainCd === code })
    var rtnDs = []
    // rtnDs.push({
    //   value: null,
    //   label: ''
    // })
    for (var i = 0; i < codeData.length; i++) {
      rtnDs.push(codeData[i])
    }
    return rtnDs
  },
  inputScale (scale) {
    if (scale === '1') {
      return 'col-lg-1 col-md-2 col-sm-6 col-xs-12'
    } else if (scale === '2') {
      return 'col-lg-2 col-md-4 col-sm-6 col-xs-12'
    } else if (scale === '3') {
      return 'col-lg-3 col-md-6 col-sm-12 col-xs-12'
    } else if (scale === '4') {
      return 'col-lg-4 col-md-8 col-sm-12 col-xs-12'
    } else if (scale === '5') {
      return 'col-lg-5 col-md-10 col-sm-12 col-xs-12'
    } else if (scale === '6') { // TODO 여기서부터 계산점 필요
      return 'col-lg-6 col-md-7 col-sm-8 col-xs-12'
    } else if (scale === '7') {
      return 'col-lg-7 col-md-8 col-sm-9 col-xs-12'
    } else if (scale === '8') {
      return 'col-lg-8 col-md-9 col-sm-10 col-xs-12'
    } else if (scale === '9') {
      return 'col-lg-9 col-md-10 col-sm-11 col-xs-12'
    } else if (scale === '10') {
      return 'col-lg-10 col-md-11 col-sm-12 col-xs-12'
    } else if (scale === '11') {
      return 'col-lg-11 col-md-12 col-sm-12 col-xs-12'
    } else if (scale === '12') {
      return 'col-lg-12 col-md-12 col-sm-12 col-xs-12'
    } else {
      return 'col-lg-1 col-md-2 col-sm-3 col-xs-12'
    }
  },
  blockEvent (e) {
    e.stopImmediatePropagation()
    e.preventDefault()
  },
  hasOwn (obj, key) {
    var hasOwnProperty = Object.prototype.hasOwnProperty
    return hasOwnProperty.call(obj, key)
  },
  nullConvert (value, str) {
    if ((typeof value === 'number') && value === 0) value = String(value)
    if (value === null || value === '' || value === undefined || value === 'null' || String(value) === 'NaN') {
      return common_util.isNull(str) ? '' : str
    }
    return value
  },
  getHash (value) {
    return crypto.createHash('sha512').update(value, 'utf8').digest('hex')
  },
  toUTF8Array (str) {
    var utf8 = []
    for (var i = 0; i < str.length; i++) {
      var charcode = str.charCodeAt(i)
      if (charcode < 0x80) utf8.push(charcode)
      else if (charcode < 0x800) utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f))
      else if (charcode < 0xd800 || charcode >= 0xe000) utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f))
      else utf8.push(0xef, 0xbf, 0xbd)
    }
    return utf8
  },
  openWindow(url, title, w, h) {
    // Fixes dual-screen position                            Most browsers       Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top
  
    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height
  
    const left = ((width / 2) - (w / 2)) + dualScreenLeft
    const top = ((height / 2) - (h / 2)) + dualScreenTop
    const newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)
  
    // Puts focus on the newWindow
    if (window.focus) {
      newWindow.focus()
    }
  }
}
Vue.prototype.$scrollToTop = () => window.scrollTo(0,0)
Vue.prototype.$isNull = common_util.isNull
Vue.prototype.$onInit = common_util.onInit
Vue.prototype.$getCommonCode = common_util.getCommonCode
Vue.prototype.$inputScale = common_util.inputScale
Vue.prototype.$blockEvent = common_util.blockEvent
Vue.prototype.$hasOwn = common_util.hasOwn
Vue.prototype.$nullConvert = common_util.nullConvert
Vue.prototype.$getHash = common_util.getHash
Vue.prototype.$lpad = common_util.lpad
Vue.prototype.$rpad = common_util.rpad
Vue.prototype.$openWindow = common_util.openWindow
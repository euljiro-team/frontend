import Vue from 'vue'
import store from '@/store/index'
import {common_util} from "@/utils/common_util";


export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}


export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function parseDate(date, cFormat) {
  if (arguments.length === 0 || !date) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  if ((typeof date === 'string')) {
    date = new Date(date)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

export const common_date = {
  async toDay (format) {
    return new Promise(resolve => {
      let rtnDate = ''
      Vue.prototype.$getVoyagerss('/common/server/date')
        .then(async (res) => {
          rtnDate = res.data.date
          const yyyy = rtnDate.substring(0, 4)
          const mm = rtnDate.substring(4, 6)
          const dd = rtnDate.substring(6, 8)
          const hh = rtnDate.substring(8, 10)
          const mi = rtnDate.substring(10, 12)
          const ss = rtnDate.substring(12, 14)
          if (format === 'YYYY/MM/DD') {
            resolve(`${yyyy}/${mm}/${dd}`)
          } else if (format === 'MM/DD/YYYY') {
            resolve(`${mm}/${dd}/${yyyy}`)
          } else if (format === 'DD/MM/YYYY') {
            resolve(`${dd}/${mm}/${yyyy}`)
          } else if (format === 'YYYY/MM/DD HH:MI:SS') {
            resolve(`${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`)
          } else if (format === 'MM/DD/YYYY HH:MI:SS') {
            resolve(`${mm}/${dd}/${yyyy} ${hh}:${mi}:${ss}`)
          } else if (format === 'DD/MM/YYYY HH:MI:SS') {
            resolve(`${dd}/${mm}/${yyyy} ${hh}:${mi}:${ss}`)
          } else if (format === 'YYYY/MM') {
            resolve(`${yyyy}/${mm}`)
          } else {
            resolve(`${yyyy}-${mm}-${dd}`)
          }
        })
        .catch(() => {
          resolve('')
        })
    })
  },
  getDateFromString (value) {
    if (Vue.prototype.$isNull(value)) return ''

    value = value.replace(/-/g, '').replace(/\//g, '').replace(/:/g, '').replace(/ /g, '')

    const userDateFormat = store.getters.getDateFormat
    const formatDate = Vue.prototype.$changeFormatDate(value, 'YYYY-MM-DD', userDateFormat)
    return formatDate
  },
  userDateFormat (value) {
    if (common_util.isNull(value)) return value

    return common_util.getDateFromString(value)
  },
  changeFormatDate (value, fromFormat, toFormat) {
    const param = value.replace(/-/g, '').replace(/\//g, '')
    var yyyy = 0
    var mm = 0
    var dd = 0

    if (fromFormat === 'DD/MM/YYYY') {
      yyyy = param.substring(4, 8)
      mm = param.substring(2, 4)
      dd = param.substring(0, 2)
    } else if (fromFormat === 'MM/DD/YYYY') {
      yyyy = param.substring(4, 8)
      mm = param.substring(0, 2)
      dd = param.substring(2, 4)
    } else {
      yyyy = param.substring(0, 4)
      mm = param.substring(4, 6)
      dd = param.substring(6, 8)
    }
    let formatVal = ``

    if (toFormat === 'DD/MM/YYYY') {
      formatVal = `${dd}/${mm}/${yyyy}`
    } else if (toFormat === 'MM/DD/YYYY') {
      formatVal = `${mm}/${dd}/${yyyy}`
    } else if (toFormat === 'YYYY/MM/DD') {
      formatVal = `${yyyy}/${mm}/${dd}`
    } else {
      formatVal = `${yyyy}-${mm}-${dd}`
    }

    return formatVal
  },
  dateLocale () {
    const userLang = window.sessionStorage.getItem('$userLangType')

    if (userLang === 'KO') {
      return {
        /* starting with Sunday */
        days: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
        daysShort: '일_월_화_수_목_금_토'.split('_'),
        months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
        monthsShort: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
        firstDayOfWeek: 1
      }
    } else {
      return {
        /* starting with Sunday */
        days: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        daysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        firstDayOfWeek: 0, // 0-6, 0 - Sunday, 1 Monday, ...
        pluralDay: 'days'
      }
    }
  },


  translations: {
    'ar': {
      'language': 'Arabic',
      'rtl': true,
      'months': {
        'original': ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوڤمبر', 'ديسمبر'],
        'abbr': ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوڤمبر', 'ديسمبر']
      },
      'days': ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']
    },
    'bg': {
      'language': 'Bulgarian',
      'months': {
        'original': ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'],
        'abbr': ['Ян', 'Фев', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'Окт', 'Ное', 'Дек']
      },
      'days': ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    },
    'bs': {
      'language': 'Bosnian',
      'months': {
        'original': ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Juni', 'Juli', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'],
        'abbr': ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec']
      },
      'days': ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub']
    },
    'cs': {
      'language': 'Czech',
      'months': {
        'original': ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],
        'abbr': ['led', 'úno', 'bře', 'dub', 'kvě', 'čer', 'čec', 'srp', 'zář', 'říj', 'lis', 'pro']
      },
      'days': ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so']
    },
    'da': {
      'language': 'Danish',
      'months': {
        'original': ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'],
        'abbr': ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
      },
      'days': ['Sø', 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø']
    },
    'de': {
      'language': 'German',
      'months': {
        'original': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        'abbr': ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
      },
      'days': ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.']
    },
    'ee': {
      'language': 'Estonian',
      'months': {
        'original': ['Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni', 'Juuli', 'August', 'September', 'Oktoober', 'November', 'Detsember'],
        'abbr': ['Jaan', 'Veebr', 'Märts', 'Apr', 'Mai', 'Juuni', 'Juuli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dets']
      },
      'days': ['P', 'E', 'T', 'K', 'N', 'R', 'L']
    },
    'el': {
      'language': 'Greek',
      'months': {
        'original': ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάϊος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
        'abbr': ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαι', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ']
      },
      'days': ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σατ']
    },
    'en': {
      'language': 'English',
      'months': {
        'original': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        'abbr': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      'days': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    'es': {
      'language': 'Spanish',
      'months': {
        'original': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        'abbr': ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      },
      'days': ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab']
    },
    'ca': {
      'language': 'Catalan',
      'months': {
        'original': ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'],
        'abbr': ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des']
      },
      'days': ['Diu', 'Dil', 'Dmr', 'Dmc', 'Dij', 'Div', 'Dis']
    },
    'fi': {
      'language': 'Finish',
      'months': {
        'original': ['tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu'],
        'abbr': ['tammi', 'helmi', 'maalis', 'huhti', 'touko', 'kesä', 'heinä', 'elo', 'syys', 'loka', 'marras', 'joulu']
      },
      'days': ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la']
    },
    'fr': {
      'language': 'French',
      'months': {
        'original': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        'abbr': ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
      },
      'days': ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    },
    'ge': {
      'language': 'Georgia',
      'months': {
        'original': ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'],
        'abbr': ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ']
      },
      'days': ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ']
    },
    'ja': {
      'language': 'Japanese',
      'months': {
        'original': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        'abbr': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      'days': ['日', '月', '火', '水', '木', '金', '土']
    },
    'he': {
      'language': 'Hebrew',
      'rtl': true,
      'months': {
        'original': ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
        'abbr': ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יונ', 'יול', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ']
      },
      'days': ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש']
    },
    'hu': {
      'language': 'Hungarian',
      'months': {
        'original': ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
        'abbr': ['Jan', 'Febr', 'Márc', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szept', 'Okt', 'Nov', 'Dec']
      },
      'days': ['Vas', 'Hét', 'Ke', 'Sze', 'Csü', 'Pén', 'Szo']
    },
    'hr': {
      'language': 'Croatian',
      'months': {
        'original': ['Siječanj', 'Veljača', 'Ožujak', 'Travanj', 'Svibanj', 'Lipanj', 'Srpanj', 'Kolovoz', 'Rujan', 'Listopad', 'Studeni', 'Prosinac'],
        'abbr': ['Sij', 'Velj', 'Ožu', 'Tra', 'Svi', 'Lip', 'Srp', 'Kol', 'Ruj', 'Lis', 'Stu', 'Pro']
      },
      'days': ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub']
    },
    'id': {
      'language': 'Indonesian',
      'months': {
        'original': ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        'abbr': ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
      },
      'days': ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
    },
    'it': {
      'language': 'Italian',
      'months': {
        'original': ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
        'abbr': ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic']
      },
      'days': ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
    },
    'is': {
      'language': 'Icelandic',
      'months': {
        'original': ['Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maí', 'Júní', 'Júlí', 'Ágúst', 'September', 'Október', 'Nóvember', 'Desember'],
        'abbr': ['Jan', 'Feb', 'Mars', 'Apr', 'Maí', 'Jún', 'Júl', 'Ágú', 'Sep', 'Okt', 'Nóv', 'Des']
      },
      'days': ['Sun', 'Mán', 'Þri', 'Mið', 'Fim', 'Fös', 'Lau']
    },
    'fa': {
      'language': 'Persian',
      'months': {
        'original': ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
        'abbr': ['فرو', 'ارد', 'خرد', 'تیر', 'مرد', 'شهر', 'مهر', 'آبا', 'آذر', 'دی', 'بهم', 'اسف']
      },
      'days': ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه']
    },
    'ko': {
      'language': 'Korean',
      'months': {
        'original': ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        'abbr': ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
      },
      'days': ['일', '월', '화', '수', '목', '금', '토']
    },
    'lt': {
      'language': 'Lithuanian',
      'months': {
        'original': ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'],
        'abbr': ['Sau', 'Vas', 'Kov', 'Bal', 'Geg', 'Bir', 'Lie', 'Rugp', 'Rugs', 'Spa', 'Lap', 'Gru']
      },
      'days': ['Sek', 'Pir', 'Ant', 'Tre', 'Ket', 'Pen', 'Šeš']
    },
    'lv': {
      'language': 'Latvian',
      'months': {
        'original': ['Janvāris', 'Februāris', 'Marts', 'Aprīlis', 'Maijs', 'Jūnijs', 'Jūlijs', 'Augusts', 'Septembris', 'Oktobris', 'Novembris', 'Decembris'],
        'abbr': ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jūn', 'Jūl', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
      },
      'days': ['Sv', 'Pr', 'Ot', 'Tr', 'Ce', 'Pk', 'Se']
    },
    'mn': {
      'language': 'Mongolia',
      'months': {
        'original': ['1 дүгээр сар', '2 дугаар сар', '3 дугаар сар', '4 дүгээр сар', '5 дугаар сар', '6 дугаар сар', '7 дугаар сар', '8 дугаар сар', '9 дүгээр сар', '10 дугаар сар', '11 дүгээр сар', '12 дугаар сар'],
        'abbr': ['1-р сар', '2-р сар', '3-р сар', '4-р сар', '5-р сар', '6-р сар', '7-р сар', '8-р сар', '9-р сар', '10-р сар', '11-р сар', '12-р сар']
      },
      'days': ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя']
    },
    'nl': {
      'language': 'Dutch',
      'months': {
        'original': ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
        'abbr': ['jan', 'feb', 'maa', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
      },
      'days': ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za']
    },
    'nb-no': {
      'language': 'Norwegian Bokmål',
      'months': {
        'original': ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'],
        'abbr': ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des']
      },
      'days': ['Sø', 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø']
    },
    'pl': {
      'language': 'Polish',
      'months': {
        'original': ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
        'abbr': ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru']
      },
      'days': ['Nd', 'Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob']
    },
    'pt-br': {
      'language': 'Brazilian',
      'months': {
        'original': ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        'abbr': ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      },
      'days': ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
    },
    'ro': {
      'language': 'Romanian',
      'months': {
        'original': ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
        'abbr': ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec']
      },
      'days': ['D', 'L', 'Ma', 'Mi', 'J', 'V', 'S']
    },
    'ru': {
      'language': 'Russian',
      'months': {
        'original': ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        'abbr': ['Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек']
      },
      'days': ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    },
    'sv': {
      'language': 'Swedish',
      'months': {
        'original': ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
        'abbr': ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
      },
      'days': ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör']
    },
    'sk': {
      'language': 'Slovakian',
      'months': {
        'original': ['január', 'február', 'marec', 'apríl', 'máj', 'jún', 'júl', 'august', 'september', 'október', 'november', 'december'],
        'abbr': ['jan', 'feb', 'mar', 'apr', 'máj', 'jún', 'júl', 'aug', 'sep', 'okt', 'nov', 'dec']
      },
      'days': ['ne', 'po', 'ut', 'st', 'št', 'pi', 'so']
    },
    'sl-si': {
      'language': 'Sloveian',
      'months': {
        'original': ['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December'],
        'abbr': ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec']
      },
      'days': ['Ned', 'Pon', 'Tor', 'Sre', 'Čet', 'Pet', 'Sob']
    },
    'sr': {
      'language': 'Serbian',
      'months': {
        'original': ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'],
        'abbr': ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec']
      },
      'days': ['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub']
    },
    'sr-Cyrl': {
      'language': 'Serbian in Cyrillic script',
      'months': {
        'original': ['Јануар', 'Фебруар', 'Март', 'Април', 'Мај', 'Јун', 'Јул', 'Август', 'Септембар', 'Октобар', 'Новембар', 'Децембар'],
        'abbr': ['Јан', 'Феб', 'Мар', 'Апр', 'Мај', 'Јун', 'Јул', 'Авг', 'Сеп', 'Окт', 'Нов', 'Дец']
      },
      'days': ['Нед', 'Пон', 'Уто', 'Сре', 'Чет', 'Пет', 'Суб']
    },
    'th': {
      'language': 'Thai',
      'months': {
        'original': ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
        'abbr': ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
      },
      'days': ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
    },
    'tr': {
      'language': 'Turkish',
      'months': {
        'original': ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
        'abbr': ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
      },

      'days': ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']
    },
    'uk': {
      'language': 'Ukraine',
      'months': {
        'original': ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
        'abbr': ['Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Чер', 'Лип', 'Серп', 'Вер', 'Жовт', 'Лист', 'Груд']
      },
      'days': ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    },
    'vi': {
      'language': 'Vientnamese',
      'months': {
        'original': ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        'abbr': ['T 01', 'T 02', 'T 03', 'T 04', 'T 05', 'T 06', 'T 07', 'T 08', 'T 09', 'T 10', 'T 11', 'T 12']
      },
      'days': ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
    },
    'zh': {
      'language': 'Chinese',
      'months': {
        'original': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        'abbr': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      },
      'days': ['日', '一', '二', '三', '四', '五', '六']
    }
  }
}
Vue.prototype.$toDay = common_date.toDay
Vue.prototype.$getDateFromString = common_date.getDateFromString
Vue.prototype.$userDateFormat = common_date.userDateFormat
Vue.prototype.$changeFormatDate = common_date.changeFormatDate
Vue.prototype.$dateLocale = common_date.dateLocale

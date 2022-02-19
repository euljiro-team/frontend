import {methods} from '@/api/axios-voyagerss'

const VUE_APP_API = process.env.VUE_APP_API === null ? '' : `${process.env.VUE_APP_API}`
const VUE_APP_WEB = process.env.VUE_APP_WEB === null ? '' : `${process.env.VUE_APP_WEB}`
const REDIRECT_URI = `${VUE_APP_WEB}/oauth/redirect`

const apiNotice = {
  getList (query) {
    return methods.get('/manager/notice', query)
  },
  update(row) {
    return methods.put('/manager/notice', row)
  }
}

export default apiNotice

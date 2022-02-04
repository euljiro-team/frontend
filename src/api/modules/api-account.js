import {methods} from '@/api/axios-voyagerss'

const VUE_APP_API = process.env.VUE_APP_API === null ? '' : `${process.env.VUE_APP_API}`
const VUE_APP_WEB = process.env.VUE_APP_WEB === null ? '' : `${process.env.VUE_APP_WEB}`
const REDIRECT_URI = `${VUE_APP_WEB}/oauth/redirect`

const apiAccount = {
  getSocialLoginUrl (socialType) {
    return `${VUE_APP_API}/oauth2/authorization/${socialType}?redirect_uri=${REDIRECT_URI}`
  },
  getUser () {
    return methods.get('/account')
  },
  putUser(account) {
    return methods.put('/account', account)
  }
}

export default apiAccount

import router from './router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = [
  '/',
  '/login',
  '/oauth/redirect',
  '/enrolclasses',
  '/membership',
  '/userInfo',
  '/notice',
  '/meta',
  '/company/company_info',
  '/company/privacy_policy',
  '/company/use_term',
] // no redirect whitelist

router.beforeEach(async(to, from, next) => {

  NProgress.start()
  document.title = '운동센터 회원권 관리 시스템 - Euljiro'

  if( window.sessionStorage.getItem('accessToken') === 'null')
    window.sessionStorage.removeItem('accessToken')

  let accessToken = store.getters.token
      ? store.getters.token
      : window.sessionStorage.getItem('accessToken')

  let user = store.getters.user
  if (!user.accountId && accessToken) {
    await store.commit('SET_TOKEN', accessToken)
    await store.dispatch('fetchUser')
    user = store.getters.user
    NProgress.done()
  }

  if (accessToken) {
    if (to.path === '/login') {
      next({ path: '/' })      // if is logged in, redirect to the home page
      NProgress.done()
    } else {
      let roles = user.role && user.role.length > 0

      if (roles) {
        next()
      } else {
        try {
          // next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('logout')
          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  }
  else {
    /* has no token*/
    let isBypass = false
    if(whiteList.includes(to.path)){
      isBypass = true
    }
    if (isBypass) {      // in the free login whitelist, go directly
      next()
    } else {      // other pages that do not have permission to access are redirected to the login page.
      await store.dispatch('logout')
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

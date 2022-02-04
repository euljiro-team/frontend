import Vue from 'vue'
import Router from 'vue-router'

import EnrolClasses from '../components/EnrolClasses.vue'
import Mmbrship from '../components/Mmbrship.vue'
import UserInfo from '../components/UserInfo.vue'
import Notice from '../components/Notice.vue'
import Meta from '../components/meta/Meta.vue'


Vue.use(Router)

// import commonRouter from "@/router/modules/common";

const createRouter = () => new Router({
  mode: 'history',
  routes: [
    { path: '/', component: () => import('@/views/layout/sideLayout'), name: 'Layout',
      children: [
        // {path: '/', component: () => import(/* webpackChunkName: "common" */'@/views/euljiro/main/main'), name: 'Main', meta: {title: 'Euljiro'}},
        {path: '/login', component: () => import(/* webpackChunkName: "common" */'@/views/auth/index'), hidden: true},    
      ]
    },
    {path: '/oauth/redirect', component: () => import('@/views/auth/redirect'), hidden: true},
    {path: '/logout', component: () => import('@/views/auth/logout'), hidden: true},    
    {
      path : '/membership',
      name : 'membership',
      component : Mmbrship
    },
    {
      path : '/enrolclasses',
      name : 'enrolclasses',
      component : EnrolClasses
    } ,
    {
      path : '/userInfo',
      name : 'userInfo',
      component : UserInfo

    },
    {
      path : '/notice' ,
      name : 'notice',
      component : Notice
    },
    {
      path : '/meta',
      name : 'meta',
      component : Meta
    },
// {path: '*', redirect: '/404', hidden: true}
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

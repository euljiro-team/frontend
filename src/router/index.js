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
    //   // children: [
    //   //   {path: '/', component: () => import(/* webpackChunkName: "common" */'@/views/en9door/main/main'), name: 'Main', meta: {title: 'English Door'}},
    //   //   {path: '/login', component: () => import(/* webpackChunkName: "common" */'@/views/login/index'), hidden: true},
    //   //   ...commonRouter,
    //   // ]
    // },
    // {path: '/oauth/redirect', component: () => import('@/views/login/redirect'), hidden: true},
    // {path: '/logout', component: () => import('@/views/login/logout'), hidden: true},
    // {path: '*', redirect: '/404', hidden: true}
    {
      path : '/',
      name : 'index',
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
    }

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

import Vue from 'vue'
import Router from 'vue-router'
 
import commonRouter from "@/router/modules/common"; 

Vue.use(Router)
 

const createRouter = () => new Router({
  mode: 'history',
  routes: [
    { path: '/', component: () => import('@/views/layout/sideLayout'), name: 'Layout',
      children: [
        // {path: '/', component: () => import(/* webpackChunkName: "common" */'@/views/euljiro/main/main'), name: 'Main', meta: {title: 'Euljiro'}},
        {path: '/login', component: () => import(/* webpackChunkName: "common" */'@/views/auth/index'), hidden: true},    
        ...commonRouter,
        {path: '/oauth/redirect', component: () => import('@/views/auth/redirect'), hidden: true},
        {path: '/logout', component: () => import('@/views/auth/logout'), hidden: true},   
        {path : '/enrolclasses',name : 'enrolclasses',component: () => import('@/components/EnrolClasses.vue')},
        {path : '/membership',name : 'membership',component: () => import('@/components/Mmbrship.vue')},
        {path : '/userInfo',name : 'userInfo',component: () => import('@/components/UserInfo.vue')},
        {path : '/notice' ,name : 'notice',component: () => import('@/components/Notice.vue')},
        {path : '/meta',name : 'meta',component: () => import('@/components/meta/Meta.vue')},
      ]
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

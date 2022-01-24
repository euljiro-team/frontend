import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import commonRouter from "@/router/modules/common";

const createRouter = () => new Router({
  mode: 'history',
  routes: [
    { path: '/hello', component: () => import('@/components/HelloWorld'), name: 'HelloWorld',
      // children: [
      //   {path: '/', component: () => import(/* webpackChunkName: "common" */'@/views/en9door/main/main'), name: 'Main', meta: {title: 'English Door'}},
      //   {path: '/login', component: () => import(/* webpackChunkName: "common" */'@/views/login/index'), hidden: true},
      //   ...commonRouter,
      // ]
    },
    // {path: '/oauth/redirect', component: () => import('@/views/login/redirect'), hidden: true},
    // {path: '/logout', component: () => import('@/views/login/logout'), hidden: true},
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
